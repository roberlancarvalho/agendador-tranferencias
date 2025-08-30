# Agendador de Transferências

API e Front-end para agendamento de transferências bancárias com cálculo de taxas por faixa de dias.

## Stacks
- **Backend**: Java 11, Spring Boot 2.7.18 (Web, Data JPA, Validation)
- **Banco**: PostgreSQL (padrão) / H2 em memória
- **Frontend**: Angular 17 (standalone), Angular Material

## Regras de Taxa
- 0 dias: `3.00 + 2.5%`
- 1–10 dias: `12.00`
- 11–20 dias: `8.2%`
- 21–30 dias: `6.9%`
- 31–40 dias: `4.7%`
- 41–50 dias: `1.7%`
- **Fora dessa faixa** → rejeita (422) com mensagem “Não há taxa aplicável para esse intervalo.”

## Como rodar (Backend)
Pré-requisitos: JDK 11, Maven

```bash
# H2 (sem instalar nada) – recomendado para avaliação
mvn spring-boot:run -Dspring-boot.run.profiles=h2

# Postgres local
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

### Endpoints:

POST /api/transferencias – agenda transferência

GET /api/transferencias – lista/extrato

### Config:

application.yml (comum)

application-h2.yml (H2 memória)

application-postgres.yml (PostgreSQL)

## Como rodar (Frontend)

Pré-requisitos: Node 18+, Angular CLI

```
cd frontend/        # ajuste se o front estiver noutra pasta
npm install
ng serve -o
```

### Se usar CORS:

- Backend já libera http://localhost:4200 via WebConfig, ou

- Rode o front com proxy (opcional): ng serve -o --proxy-config proxy.conf.json

## Estrutura (Backend):
```
src/main/java/org/roberlan
 ├─ domain/                # Entidades e DTOs
 ├─ repository/            # JPA Repositories
 ├─ service/               # Regras de negócio (cálculo da taxa)
 ├─ web/                   # Controllers + ExceptionHandler
 └─ config/                # CORS/WebConfig
```

## Testes

Service: testes unitários do cálculo de taxas (faixas e bordas)

Como rodar: mvn test

## Decisões

- Spring Boot 2.7.x para compatibilidade com Java 11.

- PostgreSQL como padrão, configuração pronta para executar no H2 (execução sem dependências externas).

- Angular 17 standalone + Material para UX melhor e código enxuto.
