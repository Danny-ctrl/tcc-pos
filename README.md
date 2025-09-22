# 📊 TCC - Monitoramento de Desempenho com ELK Stack

Este projeto faz parte do meu TCC de MBA em Engenharia de Software, com foco em **monitoramento de desempenho de APIs utilizando a stack ELK (Elasticsearch, Logstash, Kibana)**.  

A base do projeto foi o repositório [docker-elk](https://github.com/deviantony/docker-elk), adaptado e customizado para meu estudo de caso.

---

## 🚀 Funcionalidades

- Envio de logs de aplicação para o Elasticsearch.  
- Visualização e análise no Kibana (Discover e Dashboards).  
- Integração com API em Node.js para simulação de erros e gargalos.  
- Testes exploratórios de carga e monitoramento de performance com APM.  
- Configurações customizadas de Logstash e APM Server.

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
- Node.js e npm (para rodar autocannon)  

---

## 🛠️ Comandos úteis

### ▶️ Subir os containers

```bash
docker-compose up -d

Sobe Elasticsearch, Logstash, Kibana, APM Server e a API.

 ⏹️ Derrubar os containers

```bash
docker-compose down


Derruba todos os serviços.

 🧼 Limpar volumes e cache
docker-compose down -v
docker system prune -af --volumes


Remove volumes, cache e containers parados. Cuidado: isso limpa tudo.

| 🔁 Rebuild forçado (útil após mudanças em Dockerfile)
docker-compose up -d --build

 📥 Inserir manualmente um log no Elasticsearch (Bash)
curl -X POST "localhost:9200/tcc-test/_doc" -H 'Content-Type: application/json' -d'
{
  "mensagem": "log manual via curl",
  "@timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
}'


Útil para testar a visualização no Kibana > Discover (índice: tcc-test*)

 🔎 Acessos

Kibana: http://localhost:5601

API (caso esteja configurada): http://localhost:3000

 🧪 Testes Exploratórios e de Carga

Foram definidos quatro cenários de teste para validar a performance da API e o monitoramento via Elastic APM:

Cenário	Rota	Latência Média (ms)	Throughput (req/s)	Taxa de Erro (%)
Fluxo Normal	/	6,65	1.397,5	0
Erro 500	/erro	9,31	508,2	100
Lentidão	/lento	3.016,4	1	0
Erro 404	/nao-encontrado	2,55	1.638,2	100

Fluxo Normal: Teste de carga com alta concorrência, latência baixa e throughput elevado.

Erro 500: Simulação de falha interna, 100% de erros capturados pelo APM com stack trace.

Lentidão: Teste proposital de gargalo, latência alta e throughput mínimo.

Erro 404: Requisições a endpoints inexistentes, monitoramento correto pelo APM.

Esses testes demonstram a capacidade da infraestrutura em lidar com diferentes tipos de carga e identificar falhas e gargalos de performance.

 ⚡ Rodando Testes de Carga com Autocannon

Autocannon é utilizado para gerar requisições simultâneas à API e medir latência, throughput e erros.

1. Instalação global
npm install -g autocannon

2. Teste de carga em fluxo normal
autocannon -c 100 -d 30 http://localhost:3000/


-c 100 = 100 conexões concorrentes
-d 30 = duração de 30 segundos

3. Teste de lentidão
autocannon -c 30 -d 30 http://localhost:3000/lento

4. Teste de erro 500
autocannon -c 20 -d 30 http://localhost:3000/erro

5. Teste de erro 404
autocannon -c 10 -d 30 http://localhost:3000/nao-encontrado


Os resultados podem ser visualizados no console ou no Kibana via APM.

 📁 Estrutura do projeto
.
├── api/                  # API em Node.js
├── elasticsearch/        # Configuração do Elasticsearch
├── kibana/               # Configuração do Kibana
├── logstash/             # Configuração do Logstash
├── apm-server/           # APM Server opcional
├── setup/                # Scripts de inicialização
├── docker-compose.yml    # Arquitetura dos containers
└── .env                  # Variáveis de ambiente

 🎓 Sobre o TCC

Tema: Monitoramento de Desempenho em APIs: Análise com Logs e Elastic Observability

💡 Foco em identificar erros e gargalos com base em logs como NullPointerException, timeout, 5xx, etc.

🔍 Utilização de Discover, Dashboards e alertas.

📖 Tecnologias como APM Server, Logstash pipelines e Elasticsearch queries foram exploradas.

📄 Licença

Este projeto é livre para fins educacionais. Adaptações e sugestões são bem-vindas.
