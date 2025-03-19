require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Criar tabela caso não exista
pool.query(`
    CREATE TABLE IF NOT EXISTS phishing_tracking (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP NOT NULL,
        key TEXT NOT NULL
    );
`);

// Rota para receber os dados do clique
app.post('/track', async (req, res) => {
    const { timestamp, key } = req.body;

    if (!timestamp || !key) {
        return res.status(400).json({ error: 'Dados inválidos' });
    }

    try {
        await pool.query('INSERT INTO phishing_tracking (timestamp, key) VALUES ($1, $2)', [timestamp, key]);
        res.status(201).json({ message: 'Dados registrados com sucesso' });
    } catch (err) {
        console.error('Erro ao inserir no banco:', err);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
