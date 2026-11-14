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
    fkUsuario INT NOT NULL,
    fkSanto INT NOT NULL,
    PRIMARY KEY (fkUsuario, fkSanto),
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
    dificuldade VARCHAR(45) NOT NULL,
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