-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE IF NOT EXISTS projeto_catolico;
USE projeto_catolico;

-- =========================================================
-- 1. BLOCO DE USUÁRIOS E DEVOÇÃO
-- =========================================================

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    primeiroNome VARCHAR(45) NOT NULL,
    segundoNome VARCHAR(45) NOT NULL,
    email VARCHAR(90) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    temDevocao TINYINT NOT NULL
);

CREATE TABLE santo (
    idSanto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(90) NOT NULL
);

CREATE TABLE devocao (
    idDevocao INT NOT NULL AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    fkSanto INT NOT NULL,
    PRIMARY KEY (idDevocao),
    CONSTRAINT fk_devocao_usuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    CONSTRAINT fk_devocao_santo FOREIGN KEY (fkSanto) REFERENCES santo(idSanto)
);

-- =========================================================
-- 2. BLOCO DE QUIZZES
-- =========================================================

CREATE TABLE quiz (
    idQuiz INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    ativo TINYINT NOT NULL DEFAULT 1
);

CREATE TABLE pergunta (
    idPergunta INT PRIMARY KEY AUTO_INCREMENT,
    enunciado VARCHAR(150) NOT NULL,
    ativa TINYINT NOT NULL DEFAULT 1,
    dificuldade VARCHAR(45) NOT NULL,
    fkQuiz INT NOT NULL,
    CONSTRAINT fk_pergunta_quiz FOREIGN KEY (fkQuiz) REFERENCES quiz(idQuiz)
);

CREATE TABLE opcao (
    idOpcao INT PRIMARY KEY AUTO_INCREMENT,
    texto VARCHAR(120) NOT NULL,
    respostaCorreta TINYINT NULL, -- NULL no Quiz 3 (Santos)
    fkPergunta INT NOT NULL,
    fkSanto INT NULL,             -- NULL nos Quizzes 1 e 2
    CONSTRAINT fk_opcao_pergunta FOREIGN KEY (fkPergunta) REFERENCES pergunta(idPergunta),
    CONSTRAINT fk_opcao_santo FOREIGN KEY (fkSanto) REFERENCES santo(idSanto)
);

CREATE TABLE tentativa (
    idTentativa INT PRIMARY KEY AUTO_INCREMENT,
    dtTentativa DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fkUsuario INT NOT NULL,
    fkQuiz INT NOT NULL,
    CONSTRAINT fk_tentativa_usuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    CONSTRAINT fk_tentativa_quiz FOREIGN KEY (fkQuiz) REFERENCES quiz(idQuiz)
);

CREATE TABLE resposta (
    idResposta INT PRIMARY KEY AUTO_INCREMENT,
    dtResposta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fkTentativa INT NOT NULL,
    fkPergunta INT NOT NULL,
    fkOpcao INT NOT NULL,
    CONSTRAINT fk_resposta_tentativa FOREIGN KEY (fkTentativa) REFERENCES tentativa(idTentativa),
    CONSTRAINT fk_resposta_pergunta FOREIGN KEY (fkPergunta) REFERENCES pergunta(idPergunta),
    CONSTRAINT fk_resposta_opcao FOREIGN KEY (fkOpcao) REFERENCES opcao(idOpcao)
);

-- =========================================================
-- 3. BLOCO DE MÚSICAS E CONFISSÕES (Lado Esquerdo do DER)
-- =========================================================

CREATE TABLE musicas (
    idMusicas INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    categoria VARCHAR(45) NOT NULL,
    
    CONSTRAINT chkCategoria CHECK (categoria IN('secular', 'religiosa'))
);

CREATE TABLE escuta (
    idEscuta INT PRIMARY KEY AUTO_INCREMENT,
    dtEscuta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fkMusica INT NOT NULL,
    CONSTRAINT fk_escuta_musica FOREIGN KEY (fkMusica) REFERENCES musicas(idMusicas)
);

CREATE TABLE confissoes (
    idConfissoes INT PRIMARY KEY AUTO_INCREMENT,
    dtConfissao DATE NOT NULL
);

-- =========================================================
-- INSERTS INICIAIS
-- =========================================================

INSERT INTO santo (nome) VALUES 
('São Tomás de Aquino'),
('São Miguel Arcanjo'),
('Nossa Senhora'),
('São João Paulo II'),
('Santo Agostinho'),
('São Bento'),
('São José'),
('Outros');

INSERT INTO quiz (nome, ativo) VALUES 
('Afinidade com Wallace', 1),
('Conhecimentos Católicos', 1),
('Qual Santo mais combina com você?', 1);

-- =========================================================
-- 1. PERGUNTAS E OPÇÕES - QUIZ 1 (IDs 1 a 12 | Opções 1 a 48)
-- =========================================================
INSERT INTO pergunta (enunciado, ativa, dificuldade, fkQuiz) VALUES
('Qual principal Santo de Devoção de Wallace?', 1, 'fácil', 1),
('Qual fraternidade Wallace costuma frequentar?', 1, 'fácil', 1),
('Há quantos dias consecutivos Wallace reza o terço?', 1, 'fácil', 1),
('Em que ano Wallace iniciou sua caminha de conversão?', 1, 'fácil', 1),
('Qual foi o primeiro contato de Wallace com a Igreja?', 1, 'fácil', 1),
('Que tipo de serviço Wallace deseja um dia prestar em uma paróquia?', 1, 'fácil', 1),
('Qual a maior dificuldade de Wallace hoje no catolicismo?', 1, 'médio', 1),
('Qual livro (da bíblia) favorito de Wallace?', 1, 'médio', 1),
('Que horário do dia Wallace costuma rezar o terço?', 1, 'médio', 1),
('Qual música católica favorita de Wallace?', 1, 'médio', 1),
('Quais orações Wallace costuma fazer ao longo do dia (fora do terço)?', 1, 'difícil', 1),
('Por que Wallace se autointitula como um ''dominicano leigo''?', 1, 'difícil', 1);

INSERT INTO opcao (texto, respostaCorreta, fkPergunta, fkSanto) VALUES
-- P1
('Santo Tomás de Aquino', 1, 1, NULL),
('São Miguel', 0, 1, NULL),
('Virgem Maria', 0, 1, NULL),
('São Bento', 0, 1, NULL),
-- P2
('Fraternidade São Pio X', 0, 2, NULL),
('Fraternidade O Caminho', 0, 2, NULL),
('Fraternidade Sem Fronteiras', 0, 2, NULL),
('Fraternidade São João Paulo II', 1, 2, NULL),
-- P3
('45 dias', 0, 3, NULL),
('90 dias', 0, 3, NULL),
('270 dias', 1, 3, NULL),
('365 dias', 0, 3, NULL),
-- P4
('2010', 0, 4, NULL),
('2020', 0, 4, NULL),
('2025', 0, 4, NULL),
('2026', 1, 4, NULL),
-- P5
('Pelo Anjo da Guarda e orações em família', 1, 5, NULL),
('Em retiro, num convento', 0, 5, NULL),
('Na catequese infantil', 0, 5, NULL),
('Na fraternidade São João Paulo II', 0, 5, NULL),
-- P6
('Acólito', 0, 6, NULL),
('Catequista', 1, 6, NULL),
('Sacerdote', 0, 6, NULL),
('Frade', 0, 6, NULL),
-- P7
('Entender os dogmas marianos', 0, 7, NULL),
('Entender o corpo e sangue de Cristo na Eucaristia', 0, 7, NULL),
('Viver a Castidade', 1, 7, NULL),
('Viver a Fé Católica', 0, 7, NULL),
-- P8
('Eclesiastes', 1, 8, NULL),
('Eclesiástico', 0, 8, NULL),
('Apocalipse', 0, 8, NULL),
('Gênesis', 0, 8, NULL),
-- P9
('Manhã', 1, 9, NULL),
('Tarde', 0, 9, NULL),
('Noite', 0, 9, NULL),
('Ao longo do dia', 0, 9, NULL),
-- P10
('Romanos 12', 0, 10, NULL),
('Estar em tuas mãos', 1, 10, NULL),
('Jardim', 0, 10, NULL),
('Dias de Glória (Muralhas Cairão)', 0, 10, NULL),
-- P11
('Ato de Fé, Ato de Esperança, Ato de Caridade', 0, 11, NULL),
('Pai Nosso, Ave Maria, Comunhão Espiritual', 0, 11, NULL),
('Laudes, Vésperas, Completas', 1, 11, NULL),
('Credo Nicênico, Credo Apostólico, Magnificat', 0, 11, NULL),
-- P12
('Por gostar de domingos e participar de todas Santas Missas dominicais', 0, 12, NULL),
('Por se identificar com Santo Tomás de Aquino e ser estudioso como ele', 0, 12, NULL),
('Por ter conhecido pessoas e familiares da ordem, a quem admira muito', 0, 12, NULL),
('Por compartilhar da mesma busca pela Verdade e pregação que a ordem', 1, 12, NULL);

-- =========================================================
-- 2. PERGUNTAS E OPÇÕES - QUIZ 2 (IDs 13 a 24 | Opções 49 a 96)
-- =========================================================
INSERT INTO pergunta (enunciado, ativa, dificuldade, fkQuiz) VALUES
('Quem é a Santíssima Trindade?', 1, 'fácil', 2),
('Quais os quatro Evangelistas?', 1, 'fácil', 2),
('Qual a principal oração ensinada por Jesus Cristo?', 1, 'fácil', 2),
('Qual é o último livro da bíblia?', 1, 'fácil', 2),
('O que é narrado em Gênesis?', 1, 'fácil', 2),
('Quem traiu Jesus por 30 moedas de prata?', 1, 'fácil', 2),
('Quem é o atual Papa da Igreja Católica?', 1, 'médio', 2),
('Quais as três mais importantes orações católicas?', 1, 'médio', 2),
('Quantas leituras + salmos temos nas Eucaristias de Domingo?', 1, 'médio', 2),
('Qual o nome da oração de Nossa Senhora na sua visita à Santa Isabel?', 1, 'médio', 2),
('Quais os quatro dogmas Marianos?', 1, 'difícil', 2),
('Como pão e vinho se tornam Corpo e Sangue de Cristo, na consagração da Eucaristia?', 1, 'difícil', 2);

INSERT INTO opcao (texto, respostaCorreta, fkPergunta, fkSanto) VALUES
-- P13
('O Pai, O Filho e o Espírito Santo', 1, 13, NULL),
('Virgem Maria, Jesus Cristo, São José', 0, 13, NULL),
('Belchior, Melquior, Gaspar', 0, 13, NULL),
('Pão, Vinho, Cordeiro', 0, 13, NULL),
-- P14
('Moisés, Elias, Paulo, Lucas', 0, 14, NULL),
('Elias, Mateus, João, Thiago', 0, 14, NULL),
('Mateus, Marcos, Lucas, João', 1, 14, NULL),
('Marcos, Lucas, Moisés, Thiago', 0, 14, NULL),
-- P15
('Ave Maria', 0, 15, NULL),
('Magnificat', 0, 15, NULL),
('Pai Nosso', 1, 15, NULL),
('Credo', 0, 15, NULL),
-- P16
('Gênesis', 0, 16, NULL),
('Apocalipse', 1, 16, NULL),
('Ato dos Apóstolos', 0, 16, NULL),
('Encerramento', 0, 16, NULL),
-- P17
('O fim dos tempos', 0, 17, NULL),
('O êxodo de Moisés', 0, 17, NULL),
('As histórias do Rei Salomão', 0, 17, NULL),
('A criação', 1, 17, NULL),
-- P18
('Judas Iscariotes', 1, 18, NULL),
('Judas Tadeu', 0, 18, NULL),
('Saulo Iscariotes', 0, 18, NULL),
('Bento de Núrsia', 0, 18, NULL),
-- P19
('Papa Francisco', 0, 19, NULL),
('Papa Leão XIV', 1, 19, NULL),
('Papa João Paulo II', 0, 19, NULL),
('Papa Leão XIII', 0, 19, NULL),
-- P20
('Ave Maria, Pai Nosso, Credo', 1, 20, NULL),
('Ave Maria, Pai Nosso, Magnificat', 0, 20, NULL),
('Pai Nosso, Ave Maria, Alma de Cristo', 0, 20, NULL),
('Pai Nosso, Ave Maria, Cordeiro de Deus', 0, 20, NULL),
-- P21
('1', 0, 21, NULL),
('2', 0, 21, NULL),
('3', 0, 21, NULL),
('4', 1, 21, NULL),
-- P22
('Credo', 0, 22, NULL),
('Ato dos Apóstolos', 0, 22, NULL),
('Comunhão Espiritual', 0, 22, NULL),
('Magnificat', 1, 22, NULL),
-- P23
('Imaculada Conceição, Maternidade Divina, Virgindade Perpétua, Assunção de Nossa Senhora', 1, 23, NULL),
('Rainha do Céu, Primeiro Sacrário, Mãe de Deus, Virgindade Perpétua', 0, 23, NULL),
('Maternidade Divina, Assunção de Nossa Senhora, Gloriosa Coroação, Rainha do Céu', 0, 23, NULL),
('Senhora das Graças, Mãe dos Aflitos, Desatadora de Nós, Senhora do Rosário', 0, 23, NULL),
-- P24
('Jesus Cristo se encarna no pão e no vinho, tornando-os o próprio Corpo e Sangue de Deus', 0, 24, NULL),
('Pela oferta, o próprio Deus abençoa as espécies Eucarísticas (pão e vinho) para fazer parte da sua essência', 0, 24, NULL),
('O Espírito Santo de Deus paira sobre a Igreja, abençoando as espécies Eucarísticas (pão e vinho), e os fiéis que o consomem', 0, 24, NULL),
('O pão e o vinho deixam de ter substâncias naturais e se tornam, substancialmente, o Corpo e o Sangue de Cristo', 1, 24, NULL);

-- =========================================================
-- 3. PERGUNTAS E OPÇÕES - QUIZ 3 (IDs 25 a 39 | Opções 97 a 156)
-- Santos: 1=Tomás, 2=Miguel, 3=Nossa Senhora, 4=João Paulo II
-- =========================================================
INSERT INTO pergunta (enunciado, ativa, dificuldade, fkQuiz) VALUES
('O que você prefere fazer num domingo à noite?', 1, 'todas', 3),
('Diante de uma situação injusta ou difícil, qual é a sua reação?', 1, 'todas', 3),
('Qual ambiente mais combina com você?', 1, 'todas', 3),
('Como seus amigos mais próximos descreveriam você?', 1, 'todas', 3),
('Qual virtude você mais admira em uma pessoa?', 1, 'todas', 3),
('Você ganhou um dia totalmente livre. O que escolhe fazer?', 1, 'todas', 3),
('Em um trabalho em grupo, qual papel você assume naturalmente?', 1, 'todas', 3),
('O que mais te incomoda no comportamento das pessoas?', 1, 'todas', 3),
('Que tipo de livro você levaria para uma viagem longa?', 1, 'todas', 3),
('Como você reage quando alguém pisa na bola com você?', 1, 'todas', 3),
('Qual destes objetivos fala mais alto no seu coração?', 1, 'todas', 3),
('Como você costuma lidar com a sua rotina?', 1, 'todas', 3),
('Qual lema pessoal mais faz sentido para você?', 1, 'todas', 3),
('Você percebe que um evento ou festa está passando por um imprevisto sério. O que faz?', 1, 'todas', 3),
('Como você gostaria de ser lembrado(a) pelas pessoas?', 1, 'todas', 3);

INSERT INTO opcao (texto, respostaCorreta, fkPergunta, fkSanto) VALUES
-- P25 (Q3.1)
('Ler, escrever ou organizar minhas ideias em silêncio', NULL, 25, 1),
('Resolver pendências da semana e deixar tudo em ordem para os desafios', NULL, 25, 2),
('Cuidar de alguém da família ou preparar algo para a casa', NULL, 25, 3),
('Reunir os amigos para conversar, rir e trocar experiências', NULL, 25, 4),
-- P26 (Q3.2)
('Tomo a frente e confronto o problema sem recuar', NULL, 26, 2),
('Busco o diálogo para unir os envolvidos e encontrar uma saída juntos', NULL, 26, 4),
('Analiso os fatos com calma e lógica antes de me posicionar', NULL, 26, 1),
('Acolho quem foi prejudicado e ajudo discretamente no que for preciso', NULL, 26, 3),
-- P27 (Q3.3)
('Uma biblioteca tranquila ou um escritório silencioso', NULL, 27, 1),
('Uma praça movimentada ou um encontro cheio de gente', NULL, 27, 4),
('Uma casa acolhedora com café passado na hora', NULL, 27, 3),
('O topo de uma montanha com vista ampla e vento no rosto', NULL, 27, 2),
-- P28 (Q3.4)
('Firme, protetor(a) e decidido(a)', NULL, 28, 2),
('Atencioso(a), humilde e sempre disponível', NULL, 28, 3),
('Carismático(a), comunicativo(a) e cheio(a) de energia', NULL, 28, 4),
('Profundo(a), observador(a) e ponderado(a)', NULL, 28, 1),
-- P29 (Q3.5)
('Sabedoria e clareza de pensamento', NULL, 29, 1),
('Mansidão e cuidado silencioso com o próximo', NULL, 29, 3),
('Coragem para defender o que é certo', NULL, 29, 2),
('Entusiasmo e capacidade de inspirar pessoas', NULL, 29, 4),
-- P30 (Q3.6)
('Visitar alguém que está precisando de companhia e escuta', NULL, 30, 3),
('Organizar uma viagem, trilha ou passeio animado com a turma', NULL, 30, 4),
('Mergulhar em um livro denso ou estudar um assunto novo', NULL, 30, 1),
('Praticar um esporte intenso que exija foco e superação', NULL, 30, 2),
-- P31 (Q3.7)
('Quem estrutura os argumentos e aprofunda o conteúdo', NULL, 31, 1),
('Quem motiva a equipe, apresenta as ideias e mantém o clima leve', NULL, 31, 4),
('Quem define a estratégia, cobra prazos e protege o time', NULL, 31, 2),
('Quem percebe o que está faltando e faz o trabalho de bastidores', NULL, 31, 3),
-- P32 (Q3.8)
('Covardia e omissão diante de uma injustiça', NULL, 32, 2),
('Superficialidade e falta de reflexão antes de falar', NULL, 32, 1),
('Frieza, isolamento e falta de abertura ao diálogo', NULL, 32, 4),
('Ingratidão e indiferença com quem precisa de ajuda', NULL, 32, 3),
-- P33 (Q3.9)
('Um clássico de filosofia, história ou pensamento profundo', NULL, 33, 1),
('A biografia de um grande líder ou estrategista', NULL, 33, 2),
('Uma peça de teatro, poesia ou relatos de viagens pelo mundo', NULL, 33, 4),
('Uma história tocante sobre família, superação e humanidade', NULL, 33, 3),
-- P34 (Q3.10)
('Deixo claro onde está o limite, com firmeza e sem rodeios', NULL, 34, 2),
('Guardo no coração, perdoo em silêncio e continuo fazendo o bem', NULL, 34, 3),
('Quebro o gelo com uma conversa franca e bem-humorada', NULL, 34, 4),
('Me afasto para refletir e entender os motivos antes de responder', NULL, 34, 1),
-- P35 (Q3.11)
('Compreender a fundo o sentido e a verdade das coisas', NULL, 35, 1),
('Lutar pela justiça e proteger quem não pode se defender', NULL, 35, 2),
('Servir com simplicidade e ser porto seguro para quem amo', NULL, 35, 3),
('Construir pontes entre pessoas diferentes e espalhar esperança', NULL, 35, 4),
-- P36 (Q3.12)
('Valorizo horários fixos, método e silêncio para render bem', NULL, 36, 1),
('Encaro as tarefas como missões que precisam ser cumpridas com rigor', NULL, 36, 2),
('Faço as coisas pequenas do dia a dia com carinho e constância', NULL, 36, 3),
('Gosto de dinamismo, movimento e de conversar com gente nova no caminho', NULL, 36, 4),
-- P37 (Q3.13)
('O amor se prova nos pequenos gestos de serviço.', NULL, 37, 3),
('Não basta saber o que é certo; é preciso ter coragem para defendê-lo.', NULL, 37, 2),
('A vida ganha sentido quando é compartilhada com alegria.', NULL, 37, 4),
('Buscar a verdade é a forma mais alta de amar.', NULL, 37, 1),
-- P38 (Q3.14)
('Percebo o problema antes de todos e resolvo discretamente sem causar alarde', NULL, 38, 3),
('Pego o microfone ou chamo o pessoal para manter o ânimo e reorganizar o grupo', NULL, 38, 4),
('Assumo o controle da situação e corto pela raiz o que está atrapalhando', NULL, 38, 2),
('Avalio rapidamente as causas do erro para aplicar a solução mais lógica', NULL, 38, 1),
-- P39 (Q3.15)
('Pela profundidade das ideias e pelos bons conselhos', NULL, 39, 1),
('Pela lealdade, retidão e coragem nos momentos difíceis', NULL, 39, 2),
('Pela doçura, humildade e cuidado constante com todos', NULL, 39, 3),
('Pela alegria contagiante e por unir as pessoas ao redor', NULL, 39, 4);

-- =========================================================
-- VIEW BASE: Apenas as respostas da 1ª tentativa de cada usuário por quiz
-- =========================================================
CREATE OR REPLACE VIEW vw_primeira_tentativa AS
SELECT 
    t.idTentativa,
    t.fkUsuario,
    t.fkQuiz,
    r.idResposta,
    p.idPergunta,
    p.enunciado,
    p.ativa AS perguntaAtiva,
    o.idOpcao,
    o.respostaCorreta,
    o.fkSanto,
    s.nome AS nomeSanto
FROM tentativa t
JOIN resposta r ON r.fkTentativa = t.idTentativa
JOIN pergunta p ON r.fkPergunta = p.idPergunta
JOIN opcao o ON r.fkOpcao = o.idOpcao
LEFT JOIN santo s ON o.fkSanto = s.idSanto
WHERE t.idTentativa = (
    SELECT MIN(t2.idTentativa)
    FROM tentativa t2
    WHERE t2.fkUsuario = t.fkUsuario AND t2.fkQuiz = t.fkQuiz
);

-- =========================================================
-- VIEW 1: Aproveitamento individual por usuário e quiz (base para KPIs 1 e 2)
-- =========================================================
CREATE OR REPLACE VIEW vw_aproveitamento_usuario_quiz AS
SELECT 
    fkUsuario,
    fkQuiz,
    ROUND(AVG(respostaCorreta * 100), 1) AS percentualAcerto
FROM vw_primeira_tentativa
WHERE fkQuiz IN (1, 2)
GROUP BY fkUsuario, fkQuiz;

-- =========================================================
-- VIEW 2: Aproveitamento por pergunta (Gráficos 1 e 2)
-- =========================================================
CREATE OR REPLACE VIEW vw_aproveitamento_pergunta AS
SELECT 
    fkQuiz,
    idPergunta,
    enunciado,
    COUNT(idResposta) AS totalRespostas,
    SUM(respostaCorreta) AS qtdAcertos,
    SUM(CASE WHEN respostaCorreta = 0 THEN 1 ELSE 0 END) AS qtdErros,
    ROUND(AVG(respostaCorreta * 100), 1) AS percentualAcertos,
    ROUND(100 - AVG(respostaCorreta * 100), 1) AS percentualErros
FROM vw_primeira_tentativa
WHERE fkQuiz IN (1, 2) AND perguntaAtiva = 1
GROUP BY fkQuiz, idPergunta, enunciado;

-- =========================================================
-- VIEW 3: Pontos por santo por usuário no Quiz 3 (KPI 3 e Radar)
-- =========================================================
CREATE OR REPLACE VIEW vw_pontos_santo_usuario AS
SELECT 
    fkUsuario,
    fkSanto AS idSanto,
    nomeSanto,
    COUNT(idResposta) AS pontos
FROM vw_primeira_tentativa
WHERE fkQuiz = 3
GROUP BY fkUsuario, fkSanto, nomeSanto;