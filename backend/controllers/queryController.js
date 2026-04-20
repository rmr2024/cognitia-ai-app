import Query from '../models/Query.js';

export const processQuery = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ error: 'Question is required and must be a non-empty string' });
    }

    if (question.length > 1000) {
      return res.status(400).json({ error: 'Question must be less than 1000 characters' });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
    }

    const trimmedQuestion = question.trim();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: trimmedQuestion }],
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content;

    if (!answer) {
      return res.status(502).json({ error: 'Invalid response from AI service' });
    }

    // Try to save to DB, but don't fail if it doesn't work
    try {
      await Query.create({
        question: trimmedQuestion,
        response: answer
      });
    } catch (dbError) {
      console.error('DB save failed (non-critical):', dbError.message);
    }

    res.status(200).json({ response: answer });
  } catch (error) {
    console.error('Controller Error:', error.message, error.stack);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};