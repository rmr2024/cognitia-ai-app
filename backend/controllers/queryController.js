import Groq from 'groq-sdk';
import Query from '../models/Query.js';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const processQuery = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ error: 'Question is required and must be a non-empty string' });
    }

    if (question.length > 1000) {
      return res.status(400).json({ error: 'Question must be less than 1000 characters' });
    }

    const trimmedQuestion = question.trim();

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: trimmedQuestion }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9
    });

    const answer = chatCompletion.choices[0]?.message?.content;

    if (!answer) {
      return res.status(502).json({ error: 'Invalid response from AI service' });
    }

    await Query.create({
      question: trimmedQuestion,
      response: answer
    });

    res.status(200).json({ response: answer });
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};