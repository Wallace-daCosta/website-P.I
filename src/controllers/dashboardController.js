var dashboardModel = require("../models/dashboardModel")

function obterDadosDashboard(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        return res.status(400).json({ erro: "idUsuario inválido" });
    }

    Promise.all([
        dashboardModel.buscarAproveitamentoQuiz(idUsuario, 1),
        dashboardModel.buscarAproveitamentoQuiz(idUsuario, 2),
        dashboardModel.buscarAproveitamentoPorPergunta(1),
        dashboardModel.buscarAproveitamentoPorPergunta(2),
        dashboardModel.radarPontosPorSantos()
    ])
        .then(function (resultados) {
            var kpiQuiz1 = resultados[0][0] || { percentualUsuario: null, mediaComunidade: null };
            var kpiQuiz2 = resultados[1][0] || { percentualUsuario: null, mediaComunidade: null };
            var graficoQuiz1 = resultados[2];
            var graficoQuiz2 = resultados[3];
            var linhasSantos = resultados[4];

            // Contagem de perfis vencedores no Quiz 3 (apenas 1ª linha de cada usuário)
            var usuariosProcessados = {};
            var santoUsuario = null;
            var contagemPerfis = {
                "São Tomás de Aquino": 0,
                "São Miguel Arcanjo": 0,
                "Nossa Senhora": 0,
                "São João Paulo II": 0
            };

            for (var i = 0; i < linhasSantos.length; i++) {
                var linha = linhasSantos[i];

                if (!usuariosProcessados[linha.fkUsuario]) {
                    usuariosProcessados[linha.fkUsuario] = true;

                    if (contagemPerfis[linha.nomeSanto] !== undefined) {
                        contagemPerfis[linha.nomeSanto]++;
                    }

                    if (linha.fkUsuario === idUsuario) {
                        santoUsuario = linha.nomeSanto;
                    }
                }
            }

            // Descobrir o santo mais popular entre os perfis (respeitando a ordem de desempate)
            var nomesSantos = [
                "São Tomás de Aquino",
                "São Miguel Arcanjo",
                "Nossa Senhora",
                "São João Paulo II"
            ];
            var totalPerfis = Object.keys(usuariosProcessados).length;
            var santoMaisPopular = null;
            var maiorContagem = 0;

            var percentuaisRadar = nomesSantos.map(function (nome) {
                var qtd = contagemPerfis[nome];
                if (qtd > maiorContagem) {
                    maiorContagem = qtd;
                    santoMaisPopular = nome;
                }
                return totalPerfis > 0 ? Number(((qtd / totalPerfis) * 100).toFixed(1)) : 0;
            });

            res.status(200).json({
                kpi1: {
                    percentualUsuario: kpiQuiz1.percentualUsuario !== null ? Number(kpiQuiz1.percentualUsuario) : null,
                    mediaComunidade: kpiQuiz1.mediaComunidade !== null ? Number(kpiQuiz1.mediaComunidade) : null
                },
                kpi2: {
                    percentualUsuario: kpiQuiz2.percentualUsuario !== null ? Number(kpiQuiz2.percentualUsuario) : null,
                    mediaComunidade: kpiQuiz2.mediaComunidade !== null ? Number(kpiQuiz2.mediaComunidade) : null
                },
                kpi3: {
                    santoUsuario: santoUsuario,
                    santoMaisPopular: santoMaisPopular
                },
                grafico1: graficoQuiz1,
                grafico2: graficoQuiz2,
                radar: {
                    labels: nomesSantos,
                    percentuais: percentuaisRadar,
                    contagens: nomesSantos.map(function (nome) { return contagemPerfis[nome]; }),
                    totalPerfis: totalPerfis,
                    santoUsuario: santoUsuario
                }
            });
        })
        .catch(function (erro) {
            console.log("Erro ao buscar dados da dashboard:", erro.sqlMessage || erro);
            res.status(500).json({ erro: "Erro interno ao carregar dashboard" });
        });
}

module.exports = {
    obterDadosDashboard
};