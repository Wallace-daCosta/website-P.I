var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email);
    var instrucaoSql = `
        SELECT idUsuario, primeiroNome, segundoNome, email, temDevocao FROM usuario WHERE email = ? AND senha = SHA2(?,256);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [email, senha]);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(primeiroNome, segundoNome, email, senha, temDevocao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", primeiroNome, segundoNome);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (primeiroNome, segundoNome, email, senha, temDevocao) VALUES (?, ?, ?, SHA2(?, 256), ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [primeiroNome, segundoNome, email, senha, temDevocao]);
}

function gravarDevocoes(fkUsuario, fkSanto1, fkSanto2, fkSanto3) {
    
    var instrucaoSql = `
        INSERT INTO devocao (fkUsuario, fkSanto) VALUES (?, ?), (?, ?), (?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [fkUsuario, fkSanto1, fkUsuario, fkSanto2, fkUsuario, fkSanto3]);
}

module.exports = {
    autenticar,
    cadastrar,
    gravarDevocoes
};