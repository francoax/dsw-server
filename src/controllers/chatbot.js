/* eslint-disable max-len */
import dotenv from 'dotenv';

dotenv.config();

const getAnswer = async (req, res) => {
  const API_KEY = process.env.GOOGLE;
  const { question } = req.body;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Eres un asistente que contesta preguntas acerca de un servicio de alquiler de paquetes turísticos.\n\nQuestion: ${question}\nAnswer: `,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
        stopSequences: [],
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ],
    }),
  }).then((resp) => resp.json().then((data) => data.candidates[0].content.parts[0].text));

  return res.status(200).json({ answer: response });
};

export default { getAnswer };
