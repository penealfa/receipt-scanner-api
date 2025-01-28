const express = require('express');
const multer = require('multer');
const { createWorker } = require('tesseract.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
//const worker = createWorker('eng');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configure CORS if needed
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/scan-receipt', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    // await worker.load();
    // await worker.loadLanguage('eng');
    // await worker.initialize('eng');
    const worker = await createWorker('eng');

    // Process image
    const { data: { text } } = await worker.recognize(
      req.file.buffer,  // Use buffer from multer
      // Optional logging
    );
    
    // Gemini AI Processing
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are a receipt parser AI. Extract data from this receipt text into JSON format:
      {
        "total": "number",
        "business": "string",
        "items": [{"title": "string", "quantity": "number", "price": "number"}],
        "tax": "number|null",
        "transaction_timestamp": "string"
      }
      Return only JSON, no other text. Here's the receipt text: ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonString = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    await worker.terminate();
    res.json(JSON.parse(jsonString));
  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ error: 'Failed to process receipt', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));