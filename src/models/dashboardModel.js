var database = require("../database/config")

function buscarAproveitamentoQuiz(idUsuario, idQuiz) {
    console.log("ACESSEI O DASHBOARD MODEL - buscarAproveitamentoQuiz:", idUsuario, idQuiz);

    var instrucaoSql = `
        SELECT 
            MAX(CASE WHEN fkUsuario = ? THEN percentualAcerto END) AS percentualUsuario,
            ROUND(AVG(percentualAcerto), 1) AS mediaComunidade
        FROM vw_aproveitamento_usuario_quiz
        WHERE fkQuiz = ?;
    `;

    return database.executar(instrucaoSql, [idUsuario, idQuiz]);
}

function buscarAproveitamentoPorPergunta(idQuiz) {
    console.log("ACESSEI O DASHBOARD MODEL - buscarAproveitamentoPorPergunta:", idQuiz)

    var instrucaoSql = `
        SELECT * 
        FROM vw_aproveitamento_pergunta 
        WHERE fkQuiz = ? 
        ORDER BY percentualAcertos DESC, idPergunta ASC;
        `

    return database.executar(instrucaoSql, [idQuiz])
}

function radarPontosPorSantos() {
    console.log("ACESSEI O DASHBOARD MODEL - radarPontosPorSantos:")

    var instrucaoSql = `
        SELECT * 
        FROM vw_pontos_santo_usuario 
        ORDER BY fkUsuario ASC, pontos DESC, idSanto ASC;
    `

    return database.executar(instrucaoSql)
}


module.exports = {
    buscarAproveitamentoPorPergunta,
    buscarAproveitamentoQuiz,
    radarPontosPorSantos
}