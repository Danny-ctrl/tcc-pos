const apm = require('elastic-apm-node').start({
  serviceName: 'tcc-api',
  serverUrl: 'http://apm-server:8200',
  environment: 'development',
  verifyServerCert: false,
  logLevel: 'trace'
});

const express = require('express');
const app = express();

// Rota principal
app.get('/', (req, res) => {
  res.send('API rodando e enviando dados para o Elastic APM!');
});

// Rota para simular erro
app.get('/erro', (req, res, next) => {
  try {
    throw new Error('Simulando erro!');
  } catch (err) {
    next(err);
  }
});

// Rota para simular lentidão
app.get('/lento', (req, res) => {
  setTimeout(() => {
    res.send('Resposta após uma lentidão proposital.');
  }, 3000); // 3 segundos de atraso
});

// Rota que retorna erro 404 propositalmente
app.get('/nao-encontrado', (req, res) => {
  res.status(404).send('Página não encontrada!');
});

// Middleware de erro
app.use((err, req, res, next) => {
  apm.captureError(err);
  res.status(500).send('Erro interno do servidor!');
});

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
