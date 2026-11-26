# Tarde te Amei

Website com tema católico, voltado para contar um pouco da história de minha conversão pessoal ao catolicismo, os impactos dessa transformação em minha vida e uma interatividade por meio de quizzes e dashboard, permitindo compreender melhor sobre minha vivência na fé, os conhecimentos sobre a fé e um jogo sobre identificação com santos importantes da fé católica.

Aplicação desenvolvida como entrega final de conclusão de semestre para disciplina de Pesquisa e Inovação, na instituição São Paulo Tech School (SPTech), no ano de 2026.

## Funcionalidades
- Cadastro e login de usuários
- Quizzes com envio de respostas
- Painel informativo (dashboard) com os resultados

## Tecnologias
- Front-end: HTML, CSS e JavaScript
- Back-end: Node.js + Express (API em arquitetura MVC)
- Banco de dados: MySQL, em máquina virtual Lubuntu

## Arquitetura


O Express serve o front-end e expõe a API. O front-end faz
requisições HTTP às rotas da API, e os Models acessam o MySQL
na máquina virtual. As setas do diagrama indicam quem inicia a
requisição; as respostas não são representadas.

## Pré-requisitos
- Node.js v22.22.1 ou superior
- MySQL v8.4.13 (na VM Lubuntu)
- Oracle VirtualBox com a VM configurada

## Como rodar
1. Clone o repositório e entre na pasta:
   ```bash
   git clone https://github.com/Wallace-daCosta/website-P.I.git
   cd website-P.I
   ```
2. Inicie a VM Lubuntu no VirtualBox e confirme que o MySQL está ativo:
   ```bash
   sudo systemctl status mysql
   ```
3. Prepare a conexão entre a sua máquina e o MySQL da VM:
   - **Rede da VM:** configure o adaptador de rede no VirtualBox em modo *Bridge* (ponte) ou *Host-only*, para que a sua máquina alcance a VM. Dentro da VM, descubra o IP com `hostname -I`; ele será o `DB_HOST`.
   - **MySQL aceitando conexões de fora:** se o MySQL estiver aceitando apenas conexões locais, ajuste o `bind-address` no arquivo de configuração do MySQL (em Ubuntu/Lubuntu, normalmente `/etc/mysql/mysql.conf.d/mysqld.cnf`) e reinicie o serviço (`sudo systemctl restart mysql`).
   - **Usuário liberado para o seu IP:** crie um usuário que possa conectar a partir da sua máquina (troque os valores entre `< >`):
     ```sql
     CREATE USER '<usuario>'@'<ip-da-sua-maquina>' IDENTIFIED BY '<senha>';
     GRANT SELECT, INSERT, UPDATE, DELETE ON projeto_catolico.* TO '<usuario>'@'<ip-da-sua-maquina>';
     ```
   Se necessário, libere também a porta 3306 no firewall da VM.
4. Crie o banco e os dados iniciais, executando os scripts **nesta ordem** e **uma única vez** (dentro da VM ou por um cliente MySQL conectado a ela). Rodar o segundo script de novo duplica ou recusa os dados dos quizzes:
   ```bash
   mysql -u <usuario> -p < src/database/script-tabelas.sql
   mysql -u <usuario> -p < src/database/popular-quizzes.sql
   ```
5. Copie o modelo de variáveis de ambiente e preencha o `.env.dev` com os dados da sua VM:
   ```bash
   cp .env.example .env.dev
   ```
   Variáveis principais:
   - `AMBIENTE_PROCESSO=desenvolvimento`
   - `APP_HOST` e `APP_PORT`: endereço e porta da aplicação
   - `DB_HOST` e `DB_PORT`: IP e porta do MySQL na VM
   - `DB_DATABASE`, `DB_USER` e `DB_PASSWORD`: banco e credenciais

   O `.env.dev` contém credenciais e não deve ser enviado ao repositório.
6. Instale as dependências e inicie a aplicação:
   ```bash
   npm install
   npm start
   ```
7. Acesse `http://localhost:3333` no navegador.

## Estrutura de pastas
```
website-P.I/
├── public/                  # front-end (servido pelo Express)
│   ├── assets/
│   │   ├── css/             # estilos de cada página
│   │   ├── js/              # scripts do front-end
│   │   └── media/           # imagens (devocoes, inicial, ordemDominicana)
│   ├── cadastro/            # página de cadastro
│   ├── Dashboards/          # dashboard pública
│   ├── login/               # página de login
│   ├── quiz/                # quiz de afinidade
│   └── website/             # index, devoções e Ordem Dominicana
├── src/                     # API (arquitetura MVC)
│   ├── routes/              # rotas: dashboard, index, quizzes, usuarios
│   ├── controllers/         # dashboard, quiz e usuário
│   ├── models/              # dashboard, quiz e usuário
│   └── database/
│       ├── config.js        # conexão com o MySQL
│       ├── script-tabelas.sql   # criação das tabelas
│       └── popular-quizzes.sql  # carga inicial dos quizzes
├── app.js                   # ponto de entrada (Express)
├── .env.example             # modelo das variáveis de ambiente
├── package.json
├── package-lock.json
├── LICENSE
└── README.md
```

## Créditos
A estrutura da API (Node.js + Express, arquitetura MVC) parte do projeto [Web-Data-Viz](https://github.com/BandTec/web-data-viz), da SPTech/BandTec, licenciado sob a licença MIT. O aviso de copyright original foi mantido no arquivo `LICENSE`, junto ao deste projeto. O banco de dados, as rotas, os controllers, os models e o front-end foram adaptados e desenvolvidos para este projeto.

## Autor
Wallace Costa, projeto individual da disciplina de Pesquisa e Inovação, curso de Ciência da Computação, São Paulo Tech School (SPTech), 2026.