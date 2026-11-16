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

// 3.2: Insere a tentativa sem enviar dtTentativa (usa CURRENT_TIMESTAMP do banco)
function registrarTentativa(fkUsuario, fkQuiz, dificuldade) {
    var instrucaoSql = `
        INSERT INTO tentativa (fkUsuario, fkQuiz, dificuldade)
        VALUES (?, ?, ?);
    `;

    return database.executar(instrucaoSql, [fkUsuario, fkQuiz, dificuldade]);
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

// 3.5: Exporta as 4 funções
module.exports = {
    buscarOpcoes,
    registrarTentativa,
    gravarRespostas,
    apagarTentativa
};