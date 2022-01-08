const express = require('express');
const rotas = require('./rotas');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(rotas);

app.listen(PORT, () => console.log(`Server rodando na porta: ${PORT}`));