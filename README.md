
# 📊 TCC - Monitoramento de Desempenho com ELK Stack

Este projeto faz parte do meu TCC de MBA em Engenharia de Software, com foco em **monitoramento de desempenho de APIs utilizando a stack ELK (Elasticsearch, Logstash, Kibana)**. 

A base do projeto foi o repositório [docker-elk](https://github.com/deviantony/docker-elk), adaptado e customizado para meu estudo de caso.

---

## 🚀 Funcionalidades

- Envio de logs de aplicação para o Elasticsearch.
- Visualização e análise no Kibana (Discover).
- Integração com API em Node.js para simulação de erros.
- Configurações customizadas de Logstash e APM.

---

## 🧠 Stack Utilizada

- **Elasticsearch**
- **Logstash**
- **Kibana**
- **APM Server**
- **Node.js (API simulada)**

---

## 📦 Pré-requisitos

- Docker
- Docker Compose
- Git

---

## 🛠️ Comandos úteis

### ▶️ Subir os containers

```bash
docker-compose up -d
```

> Sobe Elasticsearch, Logstash, Kibana, APM Server e a API.

---

### ⏹️ Derrubar os containers

```bash
docker-compose down
```

> Derruba todos os serviços.

---

### 🧼 Limpar volumes e cache

```bash
docker-compose down -v
docker system prune -af --volumes
```

> Remove volumes, cache e containers parados. **Cuidado**: isso limpa tudo.

---

### 🔁 Rebuild forçado (útil após mudanças em Dockerfile)

```bash
docker-compose up -d --build
```

---

### 📥 Inserir manualmente um log no Elasticsearch (Bash)

```bash
curl -X POST "localhost:9200/tcc-test/_doc" -H 'Content-Type: application/json' -d'
{
  "mensagem": "log manual via curl",
  "@timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
}'
```

> Útil para testar a visualização no Kibana > Discover (índice: `tcc-test*`)

---

### 🔎 Acessos

- Kibana: [http://localhost:5601](http://localhost:5601)
- API (caso esteja configurada): [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do projeto

```
.
├── api/                  # API em Node.js
├── elasticsearch/        # Configuração do Elasticsearch
├── kibana/               # Configuração do Kibana
├── logstash/             # Configuração do Logstash
├── apm-server/           # APM Server opcional
├── setup/                # Scripts de inicialização
├── docker-compose.yml    # Arquitetura dos containers
└── .env                  # Variáveis de ambiente
```

---

## 🎓 Sobre o TCC

**Tema**: *Monitoramento de Desempenho em APIs: Análise com Logs e Elastic Observability*

- 💡 Foco em identificar erros e gargalos com base em logs como `NullPointerException`, `timeout`, `5xx`, etc.
- 🔍 Utilização de `Discover`, `Dashboards` e alertas.
- 📖 Tecnologias como APM Server, Logstash pipelines e Elasticsearch queries estão sendo exploradas.

---

## 📄 Licença

Este projeto é livre para fins educacionais. Adaptações e sugestões são bem-vindas.
