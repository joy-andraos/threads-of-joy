export default {
    id: 1,
    title: 'Attention is all you need... but why?',
    date: 'May 14, 2025',
    imageUrl: '/blogs/blog2.png',
    slug: 'attention-need',
    category: 'Tech',
    content: `
      <p>A paper published in 2017, titled <a href="https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf" target="_blank" style="text-decoration: underline;"><em>"Attention is All You Need"</em></a>, introduced a key idea that changed everything: the Transformer model. Let's break it down.</p>

      <p><span class="section-title">What is the problem?</span></p>
      <p>Before Transformers, most models relied on Recurrent Neural Networks (RNNs) and their variations such as LSTMs (Long Short-Term Memory networks). While effective, these models had two significant limitations:</p>
      <ol>
        <li><strong>Sequential Processing</strong>: RNNs process words one by one in order, which is slow and doesn't scale well for long sentences.</li>
        <li><strong>Forgetting Context</strong>: Even with memory mechanisms, they struggle to capture relationships between words that are far apart in a sentence.</li>
      </ol>
      <p>For example, in the sentence "The cat, which was sitting on the mat, looked at the bird," RNNs might have trouble connecting "cat" to "looked" because of the intervening phrase.</p>

      <p><span class="section-title">What did the paper propose?</span></p>
      <p>The <em>Attention is All You Need</em> paper introduced the <strong>Transformer</strong>, a model that ditches sequential processing entirely. Instead, it uses a mechanism called self-attention, allowing the model to focus on different parts of a sentence simultaneously instead of one by one. This results in catching extended dependencies in long text sequences efficiently.</p>

      <p><span class="section-title">What is Attention, and why is it important?</span></p>
      <p>Let's take this sentence for example: "She placed the glass on the table because it was wet." What does "it" refer to? Your brain automatically focuses on the word "glass" to understand the sentence. This ability to selectively focus on the most relevant parts of information is attention.</p>
      <p>Transformers use self-attention to do the same. Each word in a sentence gets to "look at" every other word and decide which ones are most important for understanding its meaning.</p>

      <p><span class="section-title">How does the transformer work?</span></p>
      <p>At its core, the Transformer has two main blocks: an Encoder and a Decoder.</p>
      <ol>
        <li><strong>Encoder</strong>: It reads the input (e.g., a sentence in English) and creates a meaningful internal representation.</li>
        <li><strong>Decoder</strong>: It takes this representation and generates the output (e.g., a sentence in French).</li>
      </ol>
      <p>Here's a quick overview of how self-attention fits into the Encoder:</p>
      <ul>
        <li>Each word in a sentence is compared to every other word.</li>
        <li>Scores are calculated to determine how much focus each word should get.</li>
        <li>The words are then combined based on these scores to create a new representation that emphasizes the important relationships.</li>
      </ul>
      <p>This process happens multiple times in layers, allowing the model to build a deep understanding of the input.</p>
      <img src="/blogs/blog1/transformer-architecture.png" alt="Transformer Architecture" style="max-width:100%; margin: 2rem 0;" />

      <p><span class="section-title">Technical Overview</span></p>
      <p>Self-attention computes how much attention each token in a sequence should pay to every other token. It begins by transforming the token embeddings (which are numerical representations of tokens in a sequence) into three matrices: queries (Q), keys (K), and values (V). Each matrix captures different aspects of the token's relationship with others. The model then calculates attention scores by measuring the similarity between queries and keys using a dot-product, followed by normalization through softmax. Finally, the scores are applied to the value matrix to update the token embeddings, allowing each token to capture relevant context from other tokens in the sequence.</p>
      <img src="/blogs/blog1/self-attention-overview.png" alt="Self-Attention Overview" style="max-width:100%; margin: 2rem 0;" />

      <p><span class="section-title">Multi-head Attention</span></p>
      <p>Many transformer applications take this even further by implementing multi-head attention which builds on self-attention by using several attention heads simultaneously. Each head learns a different aspect of the sequence, such as context or syntax. The outputs of these heads are combined and projected back into the original embedding space. This allows the model to capture multiple linguistic patterns at once which improves its understanding of the sequence and allows efficient modeling of complex relationships.</p>
      <img src="/blogs/blog1/multi-head-attention.png" alt="Multi-Head Attention" style="max-width:100%; margin: 2rem 0;" />

      <p><span class="section-title">Why is the transformer better?</span></p>
      <ol>
        <li><strong>Parallel Processing</strong>: Unlike RNNs, Transformers process the entire sentence at once, making them much faster.</li>
        <li><strong>Better Long-Term Relationships</strong>: Self-attention captures dependencies between all words, no matter how far apart they are.</li>
        <li><strong>Scalability</strong>: Transformers scale well to large datasets and long sentences, which is why they power models like GPT and BERT.</li>
      </ol>

      <p><span class="section-title">So, why "Attention is All You Need"?</span></p>
      <p>The authors showed that by relying entirely on attention mechanisms (and some other tricks like positional encodings), they could outperform traditional models on tasks like language translation without the need for RNNs or convolutions.</p>
      <p>This simplicity is the foundation of modern AI language models that power ChatGPT, Google Translate and many more. So the next time you're using an AI tool, you now know that it works well because it's powered by a model that knows where to focus its attention!</p>
    `
}; 