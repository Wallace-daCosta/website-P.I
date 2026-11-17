var database = require("../database/config");

// 3.1: Busca as opções escolhidas e traz o fkQuiz da pergunta via JOIN
function buscarOpcoes(listaDeIds) {
    var instrucaoSql = `
        SELECT 
            opcao.idOpcao,
            opcao.fkPergunta,
            pergunta.fkQuiz
        FROM opcao
        INNER JOIN pergunta ON opcao.fkPergunta = pergunta.idPergunta
        WHERE opcao.idOpcao IN (?);
    `;

    return database.executar(instrucaoSql, [listaDeIds]);
}

// 6.3: Devolve a quantidade de perguntas ativas do quiz
function contarPerguntasAtivas(fkQuiz) {
    var instrucaoSql = `
        SELECT COUNT(*) AS total
        FROM pergunta
        WHERE fkQuiz = ? AND ativa = 1;
    `;

    return database.executar(instrucaoSql, [fkQuiz]);
}

// 6.3: Insere a tentativa gravando apenas usuário e quiz
function registrarTentativa(fkUsuario, fkQuiz) {
    var instrucaoSql = `
        INSERT INTO tentativa (fkUsuario, fkQuiz)
        VALUES (?, ?);
    `;

    return database.executar(instrucaoSql, [fkUsuario, fkQuiz]);
}

// 3.3: Insere todas as respostas da tentativa de uma só vez via VALUES ?
function gravarRespostas(linhas) {
    var instrucaoSql = `
        INSERT INTO resposta (fkTentativa, fkPergunta, fkOpcao)
        VALUES ?;
    `;

    return database.executar(instrucaoSql, [linhas]);
}

// 3.4: Rollback manual caso a gravação das respostas falhe
function apagarTentativa(idTentativa) {
    var instrucaoSql = `
        DELETE FROM tentativa
        WHERE idTentativa = ?;
    `;

    return database.executar(instrucaoSql, [idTentativa]);
}

module.exports = {
    buscarOpcoes,
    contarPerguntasAtivas,
    registrarTentativa,
    gravarRespostas,
    apagarTentativa
};