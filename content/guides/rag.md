---
title: "大厂高级 RAG 系统标准架构"
slug: "rag"
direction: 1
directionName: "应用层开发"
steps: 7
tags: ["HyDE", "Hybrid Search", "BM25", "Reranker", "RAGAS"]
summary: "大厂高级RAG系统的7步完整工程化方案，从数据深度解析到自动化评测闭环，覆盖 Modular RAG 完整范式"
---

本文档提炼了目前一线大厂（如字节、阿里、腾讯）在构建企业级检索增强生成（RAG）系统时的标准工程化步调。

传统的"Naive RAG"（简单文本切分 -> 向量搜索 -> 丢给大模型生成）在实际业务中通常会遭遇"召回率低"、"答非所问"、"格式错乱"等严重问题。因此，大厂普遍采用基于 **Modular RAG（模块化 RAG）** 的范式，将流程精细化为 **检索前 (Pre-retrieval)**、**检索中 (Retrieval)**、**检索后 (Post-retrieval)** 和 **生成 (Generation)** 四个核心阶段，共计 7 个核心步骤。

> 📚 **核心理论框架来源**：
> * **Gao, Y., et al. (2023). "Retrieval-Augmented Generation for Large Language Models: A Survey"**. (该论文首次系统性提出了 Naive RAG、Advanced RAG 与 Modular RAG 的演进路线与理论范式)。
> * **Lewis, P., et al. (2020). "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"**. (Meta/Facebook AI 团队发表的 RAG 概念奠基之作)。

---

## 第 1 步：数据接入与精细化解析 (Data Ingestion & Deep Parsing)

这是整个系统最脏、最累但**最决定上限**的一步。业界常说："Garbage in, garbage out（垃圾进，垃圾出）"。

*   **核心痛点**：企业数据通常是极度非结构化的（如带有复杂表格、多栏排版、页眉页脚的 PDF，或带有图表的 PPT）。如果直接用基础库读取，多栏文本会被杂糅在一起，表格会变成一堆毫无逻辑的乱码。
*   **大厂解决方案**：
    *   **版面分析 (Layout Analysis)**：使用专门的 CV（计算机视觉）模型（如 LayoutLM、PaddleOCR）先识别出哪里是标题、哪里是段落、哪里是表格。
    *   **多模态解析**：对于极其复杂的表格或图片，直接调用多模态大模型（如 GPT-4o / Qwen-VL），让模型"看图说话"，把表格转写成 Markdown 格式的纯文本，再存入系统。
*   **常用工具库**：`Unstructured`, `PDFPlumber`, `PaddleOCR`。

## 第 2 步：语义分块与索引构建 (Advanced Chunking & Indexing)

*   **核心痛点**：把文档无脑按"每 500 字切一刀"（Fixed-size Chunking）会生硬地切断句子的上下文，导致检索时大模型看不懂这半句话在说什么。
*   **大厂解决方案**：
    *   **语义切块 (Semantic Chunking)**：利用标点符号、段落换行符作为切分点，或者利用小模型判断两句话语义是否连贯来决定是否切断。
    *   **父子文档切块 (Parent-Child / Auto-merging Chunking)**：极度经典的做法。把一篇大文档切成非常小的块（子文档，例如 100 字）用于**精准检索匹配**；但一旦这个小块被命中，系统会把包含它的那个大块（父文档，例如 1000 字）完整提取出来丢给大模型。这样既保证了"搜得准"，又保证了"上下文全"。
    *   **元数据过滤 (Metadata Tagging)**：在切块时，强制打上 `author`, `date`, `category` 等标签。检索时先通过 SQL 过滤标签，再进行语义搜索。
> 📚 **技术溯源**：父子文档检索等高级切块技术，由顶级开源框架 LlamaIndex 提出，标准化为 `AutoMergingRetriever` 与 `HierarchicalNodeParser` 概念。

## 第 3 步：查询重写与意图理解 (检索前优化 Pre-retrieval)

*   **核心痛点**：用户的真实提问往往极度缺乏上下文。比如用户在多轮对话中问："那它的续航呢？"（此时直接拿这句话去向量库搜，什么都搜不到）。
*   **大厂解决方案**：在真正去查数据库之前，先经过一层意图处理。
    *   **查询重写 (Query Rewriting)**：让一个速度极快的小 LLM 结合历史对话，把"那它的续航呢？"重写补全为"小米 SU7 顶配版的电池续航里程是多少？"。
    *   **HyDE (假设性文档嵌入)**：面对生僻问题，先让 LLM 凭感觉"瞎编"一个答案，然后拿这个"瞎编的答案"去向量库里搜真实文档。事实证明，这比直接拿问题去搜，命中率高得多。
> 📚 **学术来源**：HyDE 算法最初来自于卡内基梅隆大学与波士顿大学发表的论文 **Gao, L., et al. (2022). "Precise Zero-Shot Dense Retrieval without Relevance Labels"**。

## 第 4 步：混合检索 (检索中 Retrieval)

*   **核心痛点**：单纯的**向量检索 (Dense Retrieval)** 擅长理解"语义"（比如搜"苹果"，能懂这是水果还是手机），但极其容易漏掉精确的专有名词、产品 SKU、身份证号等。
*   **大厂解决方案**：双路召回（混合检索 Hybrid Search）。
    *   同时触发两路搜索：
        1.  **向量检索**：依靠 Embedding 模型提取语义。
        2.  **关键词检索 (BM25)**：依靠传统的词频统计算法，死磕精确匹配。
    *   系统会对这两路召回的结果进行合并去重与分数加权重组 (Alpha Tuning)。
*   **常用工具库**：`Milvus`, `Qdrant`, `ElasticSearch`。

## 第 5 步：重排与精排 (检索后优化 Post-retrieval)

*   **核心痛点**：混合检索阶段为了速度，使用的是双塔架构（检索粗糙），可能会捞回来几十篇文档，其中混杂着大量干扰项。
*   **大厂解决方案**：引入 **Reranker（重排序 / 交叉编码器 Cross-Encoder）** 模型。
    *   **原理**：让 Reranker 模型把"用户的具体问题"和"捞回来的 20 篇文档"进行一对一的、极其细致的对比打分（0-1分）。
    *   **截断 (Top-K)**：打分排序后，严格只取分数最高的前 3 篇（Top-3）文档。这极大缓解了大模型的"中间迷失效应"，同时大幅节省了 Token 成本。
> 📚 **学术来源**：
> * 交叉编码器高精度重排的原理，源自 **Reimers, N., & Gurevych, I. (2019). "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks"**。
> * 严格限制给大模型喂入文档数量的根本原因（中间迷失效应），源自 **Liu, N. F., et al. (2023). "Lost in the Middle: How Language Models Use Long Contexts"**。

## 第 6 步：组装生成与护栏 (Generation & Guardrails)

*   **大厂解决方案**：
    *   **精准溯源 (Citation)**：在 Prompt 中严格要求大模型必须标注引用来源，例如："必须在每句话句末使用 [文档1] 的格式标明出处。严禁自己编造"。
    *   **流式输出 (Streaming / SSE)**：无论背后检索花了多少秒，生成阶段必须使用流式输出技术，确保 **TTFT (首字响应时间)** 尽可能短，提升用户体验。

## 第 7 步：自动化评测闭环 (Evaluation & LLMOps)

*   **核心痛点**：系统修改了一个检索参数，怎么知道整体变聪明了还是变笨了？不能靠人工肉眼看。
*   **大厂解决方案**：接入自动化评测框架。
    *   使用框架对系统的三大核心指标进行量化打分（0-1分）：
        1.  **上下文相关性 (Context Relevance)**：搜回来的文档到底和问题相不相关？
        2.  **忠实度 (Faithfulness)**：大模型的回答是不是严格依据了搜回来的文档，有没有自己乱编？
        3.  **回答相关性 (Answer Relevance)**：大模型的回答有没有切中用户的要害？
> 📚 **学术来源**：上述评测指标和算法被标准化地定义在了开源框架的权威论文中：**Es, S., et al. (2023). "RAGAS: Automated Evaluation of Retrieval Augmented Generation"**。

---

## 💡 总结

个人开发者写 RAG 往往只做 第 2 步（简单切块） -> 第 4 步（单向向量检索） -> 第 6 步（直接生成）。

如果你能在简历的项目经历中，完整体现并跑通上述 **第 3（HyDE/重写）、第 4（BM25混合）、第 5（Cross-Encoder 重排）、第 7（Ragas 评测）** 步，你就具备了准一线大厂 AI 应用工程师的工程化水平。
