var quizModel = require("../models/quizModel");

function registrar(req, res) {
    // 3.8: Leitura dos 4 campos do contrato
    var idUsuario = req.body.idUsuario;
    var idQuiz = req.body.idQuiz;
    var dificuldade = req.body.dificuldade;
    var opcoes = req.body.opcoes;

    var dificuldadesQuiz1e2 = ["facil", "medio", "dificil"];
    var dificuldadesQuiz3 = ["curto", "medio", "longo"];

    // 3.9: Validações em cadeia (if / else if) com status 400
    if (idUsuario == undefined || idQuiz == undefined || dificuldade == undefined || opcoes == undefined) {
        return res.status(400).send("Campos obrigatórios ausentes (idUsuario, idQuiz, dificuldade ou opcoes).");
    } else if (isNaN(Number(idUsuario)) || Number(idUsuario) <= 0) {
        return res.status(400).send("O idUsuario deve ser um número válido.");
    } else if (Number(idQuiz) !== 1 && Number(idQuiz) !== 2 && Number(idQuiz) !== 3) {
        return res.status(400).send("O idQuiz deve ser 1, 2 ou 3.");
    } else if ((Number(idQuiz) === 1 || Number(idQuiz) === 2) && !dificuldadesQuiz1e2.includes(dificuldade)) {
        return res.status(400).send("Dificuldade inválida para este quiz (permitido: facil, medio ou dificil).");
    } else if (Number(idQuiz) === 3 && !dificuldadesQuiz3.includes(dificuldade)) {
        return res.status(400).send("Dificuldade inválida para o quiz 3 (permitido: curto, medio ou longo).");
    } else if (!Array.isArray(opcoes) || opcoes.length === 0 || opcoes.length > 15) {
        return res.status(400).send("O campo opcoes deve ser uma lista contendo de 1 a 15 itens.");
    }

    // Confere se todos os itens da lista opcoes são numéricos
    for (var i = 0; i < opcoes.length; i++) {
        if (opcoes[i] === null || opcoes[i] === "" || isNaN(Number(opcoes[i]))) {
            return res.status(400).send("Todos os itens da lista de opcoes devem ser numéricos.");
        }
    }

    var idUsuarioNum = Number(idUsuario);
    var idQuizNum = Number(idQuiz);

    // 3.10: Busca as opções no banco para validar existência, quiz e perguntas repetidas
    quizModel.buscarOpcoes(opcoes)
        .then(function (resultadoOpcoes) {
            // (a) Todas existem e nenhuma opção repetida
            if (resultadoOpcoes.length !== opcoes.length) {
                return res.status(400).send("Uma ou mais opções são inexistentes ou foram enviadas repetidas.");
            }

            // (b) Todas pertencem ao quiz informado
            for (var i = 0; i < resultadoOpcoes.length; i++) {
                if (Number(resultadoOpcoes[i].fkQuiz) !== idQuizNum) {
                    return res.status(400).send("Uma ou mais opções não pertencem ao quiz selecionado.");
                }
            }

            // (c) Nenhuma pergunta repetida (comparação de pares com dois for)
            for (var i = 0; i < resultadoOpcoes.length; i++) {
                for (var j = i + 1; j < resultadoOpcoes.length; j++) {
                    if (resultadoOpcoes[i].fkPergunta === resultadoOpcoes[j].fkPergunta) {
                        return res.status(400).send("Não é permitido enviar mais de uma opção para a mesma pergunta.");
                    }
                }
            }

            // 3.11: Registra a tentativa e recupera o insertId
            return quizModel.registrarTentativa(idUsuarioNum, idQuizNum, dificuldade)
                .then(function (resultadoTentativa) {
                    var idTentativa = resultadoTentativa.insertId;

                    // 3.12: Monta [[idTentativa, fkPergunta, idOpcao], ...] usando o retorno do banco
                    var linhas = [];
                    for (var i = 0; i < resultadoOpcoes.length; i++) {
                        linhas.push([
                            idTentativa,
                            resultadoOpcoes[i].fkPergunta,
                            resultadoOpcoes[i].idOpcao
                        ]);
                    }

                    return quizModel.gravarRespostas(linhas)
                        .then(function () {
                            return res.status(201).json({
                                idTentativa: idTentativa
                            });
                        })
                        .catch(function (erroRespostas) {
                            // 3.13: Se gravarRespostas falhar, desfaz a tentativa e responde 500
                            quizModel.apagarTentativa(idTentativa);
                            return res.status(500).json(erroRespostas.sqlMessage || erroRespostas);
                        });
                })
                .catch(function (erroTentativa) {
                    // 3.13: FK inválida (usuário ou quiz inexistente) vira 400; demais viram 500
                    if (erroTentativa.code === "ER_NO_REFERENCED_ROW_2") {
                        return res.status(400).send("Usuário ou quiz inexistente.");
                    }
                    return res.status(500).json(erroTentativa.sqlMessage || erroTentativa);
                });
        })
        .catch(function (erroBusca) {
            // 3.13: Erro na busca de opções responde 500
            return res.status(500).json(erroBusca.sqlMessage || erroBusca);
        });
}

module.exports = {
    registrar
};