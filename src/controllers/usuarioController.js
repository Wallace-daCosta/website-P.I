var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.status(200).json({
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            primeiroNome: resultadoAutenticar[0].primeiroNome,
                            segundoNome: resultadoAutenticar[0].segundoNome,
                            email: resultadoAutenticar[0].email,
                            temDevocao: resultadoAutenticar[0].temDevocao
                        });

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var primeiroNome = req.body.primeiroNomeServer;
    var segundoNome = req.body.segundoNomeServer
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var temDevocao = req.body.temDevocaoServer;
    var santos = req.body.santosServer;

    var temNumero = false;
    var temEspecial = false;

    if (senha != undefined) {
        for (var i = 0; i < senha.length; i++) {
            if ('0123456789'.includes(senha[i])) {
                temNumero = true;
            }
            if ('!@#$%&'.includes(senha[i])) {
                temEspecial = true;
            }
        }
    }

    // Faça as validações dos valores
    if (primeiroNome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (primeiroNome.trim() == "") {
        res.status(400).send("Seu nome está vazio!");
    } else if (segundoNome == undefined) {
        res.status(400).send("Seu sobrenome está undefined!");
    } else if (segundoNome.trim() == "") {
        res.status(400).send("Seu sobrenome está vazio!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (temDevocao == undefined) {
        res.status(400).send("Sua seleção de devoção está undefined!");
    } else if (temDevocao == 1 && santos == undefined) {
        res.status(400).send("Seus santos estão undefined!");
    } else if (temDevocao != 0 && temDevocao != 1) {
        res.status(400).send("Sua seleção de devoção deve ser 0 ou 1!");
    } else if (temDevocao == 1 && santos.length != 3) {
        res.status(400).send("Você deve escolher exatamente 3 santos de devoção!");
    } else if (temDevocao == 1 && ((santos[0] == santos[1] && santos[0] != 8) || (santos[0] == santos[2]  && santos[0] != 8) || (santos[1] == santos[2] && santos[1] != 8))) {
        res.status(400).send("Os 3 santos de devoção devem ser diferentes entre si, com exceção de 'outros'");
    } else if (!email.includes('@') || !email.includes('.')) {
        res.status(400).send("Seu email está incorreto. Precisa ter @ e .");
    } else if (senha.length < 8 || senha.length > 16) {
        res.status(400).send("Sua senha deve ter entre 8 e 16 caracteres!");
    } else if (senha.toLowerCase() == senha) {
        res.status(400).send("Sua senha precisa ter pelo menos uma letra maiúscula!");
    } else if (senha.toUpperCase() == senha) {
        res.status(400).send("Sua senha precisa ter pelo menos uma letra minúscula!");
    } else if (!temNumero) {
        res.status(400).send("Sua senha precisa ter pelo menos um número!");
    } else if (!temEspecial) {
        res.status(400).send("Sua senha precisa ter pelo menos um caracter especial!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(primeiroNome, segundoNome, email, senha, temDevocao)
            .then(
                function (resultado) {
                    // Ideia 1: pega o ID que o MySQL acabou de gerar para o usuário
                    var idUsuario = resultado.insertId;

                    // Ideia 2: dois caminhos dependendo de temDevocao
                    if (temDevocao == 0) {
                        res.status(201).json(resultado);
                    } else {
                        usuarioModel.gravarDevocoes(idUsuario, santos[0], santos[1], santos[2])
                            .then(
                                function (resultadoDevocao) {
                                    res.status(201).json(resultadoDevocao);
                                }
                            ).catch(
                                function (erroDevocao) {
                                    console.log(erroDevocao);
                                    console.log(
                                        "\nHouve um erro ao gravar as devoções! Erro: ",
                                        erroDevocao.sqlMessage
                                    );
                                    res.status(500).json(erroDevocao.sqlMessage);
                                }
                            );
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );

                    if (erro.code == 'ER_DUP_ENTRY') {
                        res.status(409).send("e-mail já cadastrado");
                    } else {
                        res.status(500).json(erro.sqlMessage);
                    }
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}