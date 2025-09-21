// Inicializa o APM apenas uma vez
const apm = require('elastic-apm-node').start({
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME || 'tcc-api',
  serverUrl: process.env.ELASTIC_APM_SERVER_URL || 'http://apm-server:8200',
  secretToken: process.env.ELASTIC_APM_SECRET_TOKEN || '',
  environment: process.env.NODE_ENV || 'development',
  logLevel: process.env.ELASTIC_APM_LOG_LEVEL || 'info',
  verifyServerCert: false
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
