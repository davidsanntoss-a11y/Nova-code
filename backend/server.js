const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

app.post('/chat', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: req.body.messages,
    });
    res.json(completion.choices[0].message);
  } catch (error) {
    console.error("Erro na OpenAI:", error.message);
    res.status(500).send("Erro ao processar a mensagem");
  }
});

// ESTA PARTE É A MAIS IMPORTANTE:
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});