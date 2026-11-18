var grafico1Instancia = null;
var grafico2Instancia = null;
var grafico3Instancia = null;

function verificarSessaoECarregarDashboard() {
    var idUsuario = sessionStorage.getItem("ID_USUARIO") || sessionStorage.getItem("idUsuario");
    var nomeUsuario = sessionStorage.getItem("NOME_USUARIO") || sessionStorage.getItem("primeiroNome");

    var layoutVisitante = document.getElementById("layoutVisitante");
    var layoutDashboard = document.getElementById("layoutDashboard");

    if (!idUsuario) {
        layoutVisitante.hidden = false;
        layoutDashboard.hidden = true;
        return;
    }

    layoutVisitante.hidden = true;
    layoutDashboard.hidden = false;

    if (nomeUsuario) {
        document.getElementById("nomeUsuarioDash").textContent = nomeUsuario;
    }

    carregarDadosDashboard(idUsuario);
}

function exibirStatus(mensagem, tipo) {
    var boxStatus = document.getElementById("statusDashboard");
    if (!boxStatus) return;

    boxStatus.textContent = mensagem;
    boxStatus.className = "status-dashboard" + (tipo === "erro" ? " erro" : "");
    boxStatus.hidden = false;
}

function ocultarStatus() {
    var boxStatus = document.getElementById("statusDashboard");
    if (!boxStatus) return;

    boxStatus.hidden = true;
}

function carregarDadosDashboard(idUsuario) {
    exibirStatus("Carregando métricas da comunidade e seus resultados...", "info");

    fetch(`/dashboard/dados/${idUsuario}`)
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error("Falha ao buscar dados (" + resposta.status + ")");
            }
            return resposta.json();
        })
        .then(function (dados) {
            ocultarStatus();
            preencherKPIs(dados);
            renderizarGraficoColunas("canvasGrafico1", "Aproveitamento por Pergunta - Quiz 1", dados.grafico1, 1);
            renderizarGraficoColunas("canvasGrafico2", "Aproveitamento por Pergunta - Quiz 2", dados.grafico2, 2);
            renderizarGraficoRadar("canvasGrafico3", dados.radar);
        })
        .catch(function (erro) {
            console.error("Erro na dashboard:", erro);
            exibirStatus("Não foi possível carregar os dados da dashboard. Verifique se o servidor está ativo.", "erro");
        });
}

function preencherKPIs(dados) {
    var quizzesPendentes = [];

    // --- KPI 1: Afinidade com Wallace ---
    var kpi1Valor = document.getElementById("kpi1Valor");
    var kpi1Ancora = document.getElementById("kpi1Ancora");
    var media1 = dados.kpi1.mediaComunidade !== null ? `${dados.kpi1.mediaComunidade}%` : "--";

    if (dados.kpi1.percentualUsuario === null) {
        kpi1Valor.textContent = "Não jogado";
        kpi1Ancora.textContent = `Média da comunidade: ${media1}`;
        quizzesPendentes.push("Afinidade");
    } else {
        var u1 = dados.kpi1.percentualUsuario;
        var m1 = dados.kpi1.mediaComunidade;
        var status1 = u1 > m1 ? "Acima da média" : (u1 === m1 ? "Na média" : "Abaixo da média");
        kpi1Valor.textContent = `${u1}%`;
        kpi1Ancora.textContent = `Média: ${media1} (${status1})`;
    }

    // --- KPI 2: Conhecimento da Fé Católica ---
    var kpi2Valor = document.getElementById("kpi2Valor");
    var kpi2Ancora = document.getElementById("kpi2Ancora");
    var media2 = dados.kpi2.mediaComunidade !== null ? `${dados.kpi2.mediaComunidade}%` : "--";

    if (dados.kpi2.percentualUsuario === null) {
        kpi2Valor.textContent = "Não jogado";
        kpi2Ancora.textContent = `Média da comunidade: ${media2}`;
        quizzesPendentes.push("Conhecimento Católico");
    } else {
        var u2 = dados.kpi2.percentualUsuario;
        var m2 = dados.kpi2.mediaComunidade;
        var status2 = u2 > m2 ? "Acima da média" : (u2 === m2 ? "Na média" : "Abaixo da média");
        kpi2Valor.textContent = `${u2}%`;
        kpi2Ancora.textContent = `Média: ${media2} (${status2})`;
    }

    // --- KPI 3: Santo de Afinidade ---
    var kpi3Valor = document.getElementById("kpi3Valor");
    var kpi3Ancora = document.getElementById("kpi3Ancora");
    var popular = dados.kpi3.santoMaisPopular || "--";

    if (dados.kpi3.santoUsuario === null) {
        kpi3Valor.textContent = "Não jogado";
        kpi3Ancora.textContent = `Mais popular: ${popular}`;
        quizzesPendentes.push("Santos");
    } else {
        kpi3Valor.textContent = dados.kpi3.santoUsuario;
        kpi3Ancora.textContent = `Mais popular: ${popular}`;
    }

    if (quizzesPendentes.length > 0) {
        exibirStatus(
            `Você ainda não completou o(s) quiz(zes): ${quizzesPendentes.join(", ")}. Jogue para ver seu comparativo completo!`,
            "info"
        );
    }
}

// Quebra enunciados longos em linhas curtas para caber no tooltip do Chart.js
function quebrarTextoTooltip(texto, limitePorLinha) {
    var palavras = texto.split(" ");
    var linhas = [];
    var linhaAtual = "";

    for (var i = 0; i < palavras.length; i++) {
        var palavra = palavras[i];
        if ((linhaAtual + " " + palavra).trim().length > limitePorLinha) {
            linhas.push(linhaAtual.trim());
            linhaAtual = palavra;
        } else {
            linhaAtual += " " + palavra;
        }
    }
    if (linhaAtual.trim()) {
        linhas.push(linhaAtual.trim());
    }
    return linhas;
}

function renderizarGraficoColunas(idCanvas, tituloGrafico, listaPerguntas, numeroGrafico) {
    var canvas = document.getElementById(idCanvas);
    if (!canvas) return;

    if (numeroGrafico === 1 && grafico1Instancia) grafico1Instancia.destroy();
    if (numeroGrafico === 2 && grafico2Instancia) grafico2Instancia.destroy();

    var labels = listaPerguntas.map(function (item, idx) {
        return `P${idx + 1}`;
    });
    var dadosAcertos = listaPerguntas.map(function (item) {
        return Number(item.percentualAcertos);
    });
    var dadosErros = listaPerguntas.map(function (item) {
        return Number(item.percentualErros);
    });

    var novaInstancia = new Chart(canvas, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Acertos (%)",
                    data: dadosAcertos,
                    backgroundColor: "#2E8B57",
                    borderColor: "#1E5E3A",
                    borderWidth: 1
                },
                {
                    label: "Erros (%)",
                    data: dadosErros,
                    backgroundColor: "#C0392B",
                    borderColor: "#922B21",
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: tituloGrafico,
                    color: "#EFE6D4",
                    font: { size: 13, weight: "bold" }
                },
                legend: {
                    labels: { color: "#EFE6D4", font: { size: 11 } }
                },
                tooltip: {
                    callbacks: {
                        title: function (itensTooltip) {
                            var idx = itensTooltip[0].dataIndex;
                            var item = listaPerguntas[idx];
                            return quebrarTextoTooltip(`Q${item.idPergunta}: ${item.enunciado}`, 38);
                        },
                        label: function (contexto) {
                            var idx = contexto.dataIndex;
                            var item = listaPerguntas[idx];
                            var valor = contexto.parsed.y;
                            var qtd = contexto.datasetIndex === 0 ? item.qtdAcertos : item.qtdErros;
                            return ` ${contexto.dataset.label}: ${valor}% (${qtd} de ${item.totalRespostas})`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: "#EFE6D4", font: { size: 11 } },
                    grid: { color: "rgba(239, 230, 212, 0.1)" }
                },
                y: {
                    stacked: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        color: "#EFE6D4",
                        font: { size: 11 },
                        callback: function (valor) { return valor + "%"; }
                    },
                    grid: { color: "rgba(239, 230, 212, 0.15)" }
                }
            }
        }
    });

    if (numeroGrafico === 1) grafico1Instancia = novaInstancia;
    if (numeroGrafico === 2) grafico2Instancia = novaInstancia;
}

function renderizarGraficoRadar(idCanvas, radarDados) {
    var canvas = document.getElementById(idCanvas);
    if (!canvas) return;

    if (grafico3Instancia) grafico3Instancia.destroy();

    var labelsOriginais = radarDados.labels;
    var santoUsuario = radarDados.santoUsuario;

    // Rótulos curtos nos vértices + destaque "(Você)" no santo do usuário
    var nomesCurtos = {
        "São Tomás de Aquino": "S. Tomás",
        "São Miguel Arcanjo": "S. Miguel",
        "Nossa Senhora": "N. Senhora",
        "São João Paulo II": "S. João Paulo II"
    };

    var labelsEixos = labelsOriginais.map(function (nome) {
        var curto = nomesCurtos[nome] || nome;
        return nome === santoUsuario ? `${curto} ★` : curto;
    });

    // Destaque visual no vértice do santo do usuário logado
    var raiosPontos = labelsOriginais.map(function (nome) {
        return nome === santoUsuario ? 8 : 3.5;
    });

    var coresPontos = labelsOriginais.map(function (nome) {
        return nome === santoUsuario ? "#FFD700" : "#B8893B";
    });

    var bordasPontos = labelsOriginais.map(function (nome) {
        return nome === santoUsuario ? "#FFFFFF" : "#1F3A5F";
    });

    grafico3Instancia = new Chart(canvas, {
        type: "radar",
        data: {
            labels: labelsEixos,
            datasets: [
                {
                    label: "Perfis da Comunidade (%)",
                    data: radarDados.percentuais,
                    backgroundColor: "rgba(184, 137, 59, 0.30)",
                    borderColor: "#B8893B",
                    borderWidth: 2,
                    pointRadius: raiosPontos,
                    pointHoverRadius: 9,
                    pointBackgroundColor: coresPontos,
                    pointBorderColor: bordasPontos,
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "Afinidade com Santos na Comunidade",
                    color: "#EFE6D4",
                    font: { size: 13, weight: "bold" }
                },
                legend: {
                    labels: { color: "#EFE6D4", font: { size: 11 } }
                },
                tooltip: {
                    callbacks: {
                        title: function (itensTooltip) {
                            var idx = itensTooltip[0].dataIndex;
                            var nomeCompleto = labelsOriginais[idx];
                            return nomeCompleto === santoUsuario
                                ? `${nomeCompleto} (Seu Santo)`
                                : nomeCompleto;
                        },
                        label: function (contexto) {
                            var idx = contexto.dataIndex;
                            var pct = contexto.parsed.r;
                            var qtd = radarDados.contagens[idx];
                            return ` ${pct}% da comunidade (${qtd} de ${radarDados.totalPerfis} perfis)`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 25,
                        color: "#EFE6D4",
                        backdropColor: "transparent",
                        font: { size: 10 },
                        callback: function (valor) { return valor + "%"; }
                    },
                    grid: { color: "rgba(239, 230, 212, 0.2)" },
                    angleLines: { color: "rgba(239, 230, 212, 0.2)" },
                    pointLabels: {
                        color: function (ctx) {
                            var nomeOriginal = labelsOriginais[ctx.index];
                            return nomeOriginal === santoUsuario ? "#FFD700" : "#EFE6D4";
                        },
                        font: function (ctx) {
                            var nomeOriginal = labelsOriginais[ctx.index];
                            return {
                                size: 11,
                                weight: nomeOriginal === santoUsuario ? "bold" : "normal"
                            };
                        }
                    }
                }
            }
        }
    });
}

verificarSessaoECarregarDashboard();