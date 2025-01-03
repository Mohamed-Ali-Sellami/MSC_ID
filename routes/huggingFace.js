// backend/routes/huggingFace.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/ocr', async (req, res) => {
  const { file } = req.body;
  const apiKey = process.env.HUGGING_FACE_API_KEY;

  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/trocr-base-handwritten',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: file,
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: await response.text() });
    }

    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
