const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // O Ollama roda na porta 11434 por padrão
        const response = await axios.post('http://127.0.0.1:11434/api/generate', {
            model: 'phi3', 
            prompt: message,
            stream: false
        });

        res.json({ response: response.data.response });
    } catch (error) {
        console.error("Erro no Ollama:", error.message);
        res.status(500).json({ error: "A IA local não respondeu. Verifique se o Ollama está aberto." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT} com Phi-3 Local!`);
});