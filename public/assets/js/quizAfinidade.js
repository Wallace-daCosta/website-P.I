let menuAberto = false;

function alternarMenu() {
    if (menuAberto) {
        menuEntrar.style.transform = 'translateY(-100%)';
        menuEntrar.style.visibility = 'hidden';
        menuAberto = false;
    } else {
        menuEntrar.style.transform = 'translateY(0)';
        menuEntrar.style.visibility = 'visible';
        menuAberto = true;
    }
}

/* =========================================================
   BANCO DE QUIZZES (Quiz → Dificuldade → Perguntas)
   Quizzes 1 e 2: perguntas com resposta certa/errada (inalterados).
   Quiz 3 (Santos): perguntas SEM certo/errado. Cada alternativa soma
   ponto para um santo. Veja o bloco "BANCO DO QUIZ DE SANTOS" mais abaixo.
   ========================================================= */
const quizzes = {
    1: {
        facil: [
            {
                pergunta: "Qual principal Santo de Devoção de Wallace?",
                alternativaA: "Santo Tomás de Aquino",
                alternativaB: "São Miguel",
                alternativaC: "Virgem Maria",
                alternativaD: "São Bento",
                alternativaCorreta: "alternativaA"
            },
            {
                pergunta: "Qual fraternidade Wallace costuma frequentar?",
                alternativaA: "Fraternidade São Pio X",
                alternativaB: "Fraternidade O Caminho",
                alternativaC: "Fraternidade Sem Fronteiras",
                alternativaD: "Fraternidade São João Paulo II",
                alternativaCorreta: "alternativaD"
            },
            {
                pergunta: "Há quantos dias consecutivos Wallace reza o terço?",
                alternativaA: "45 dias",
                alternativaB: "90 dias",
                alternativaC: "270 dias",
                alternativaD: "365 dias",
                alternativaCorreta: "alternativaC"
            },
            {
                pergunta: "Em que ano Wallace iniciou sua caminha de conversão?",
                alternativaA: "2010",
                alternativaB: "2020",
                alternativaC: "2025",
                alternativaD: "2026",
                alternativaCorreta: "alternativaD"
            },
            {
                pergunta: "Qual foi o primeiro contato de Wallace com a Igreja?",
                alternativaA: "Pelo Anjo da Guarda e orações em família",
                alternativaB: "Em retiro, num convento",
                alternativaC: "Na catequese infantil",
                alternativaD: "Na fraternidade São João Paulo II",
                alternativaCorreta: "alternativaC"
            },
           {
                pergunta: "Que tipo de serviço Wallace deseja um dia prestar em uma paróquia?",
                alternativaA: "Acólito",
                alternativaB: "Catequista",
                alternativaC: "Sacerdote",
                alternativaD: "Frade",
                alternativaCorreta: "alternativaB"
            }
        ],
        medio: [
            {
                pergunta: "Qual a maior dificuldade de Wallace hoje no catolicismo?",
                alternativaA: "Entender os dogmas marianos",
                alternativaB: "Entender o corpo e sangue de Cristo na Eucaristia",
                alternativaC: "Viver a Castidade",
                alternativaD: "Viver a Fé Católica",
                alternativaCorreta: "alternativaC"
            },
            {
                pergunta: "Qual livro (da bíblia) favorito de Wallace?",
                alternativaA: "Eclesiastes",
                alternativaB: "Eclesiástico",
                alternativaC: "Apocalipse",
                alternativaD: "Gênesis",
                alternativaCorreta: "alternativaA"
            },
            {
                pergunta: "Que horário do dia Wallace costuma rezar o terço?",
                alternativaA: "Manhã",
                alternativaB: "Tarde",
                alternativaC: "Noite",
                alternativaD: "Ao longo do dia",
                alternativaCorreta: "alternativaA"
            },
           {
                pergunta: "Qual música católica favorita de Wallace?",
                alternativaA: "Romanos 12",
                alternativaB: "Estar em tuas mãos",
                alternativaC: "Jardim",
                alternativaD: "Dias de Glória (Muralhas Cairão)",
                alternativaCorreta: "alternativaB"
            }
        ],
        dificil: [
            {
                pergunta: "Quais orações Wallace costuma fazer ao longo do dia (fora do terço)?",
                alternativaA: "Ato de Fé, Ato de Esperança, Ato de Caridade",
                alternativaB: "Pai Nosso, Ave Maria, Comunhão Espiritual",
                alternativaC: "Laudes, Vésperas, Completas",
                alternativaD: "Credo Nicênico, Credo Apostólico, Magnificat",
                alternativaCorreta: "alternativaC"
            },
            {
                pergunta: "Por que Wallace se autointitula como um 'dominicano leigo'?",
                alternativaA: "Por gostar de domingos e participar de todas Santas Missas dominicais",
                alternativaB: "Por se identificar com Santo Tomás de Aquino e ser estudioso como ele",
                alternativaC: "Por ter conhecido pessoas e familiares da ordem, a quem admira muito",
                alternativaD: "Por compartilhar da mesma busca pela Verdade e pregação que a ordem",
                alternativaCorreta: "alternativaD"
            }
        ]
    },

    2: {
        facil: [
            {
                pergunta: "Quem é a Santíssima Trindade?",
                alternativaA: "O Pai, O Filho e o Espírito Santo",
                alternativaB: "Virgem Maria, Jesus Cristo, São José",
                alternativaC: "Belchior, Melquior, Gaspar",
                alternativaD: "Pão, Vinho, Cordeiro",
                alternativaCorreta: "alternativaA"
            },
            {
                pergunta: "Quais os quatro Evangelistas?",
                alternativaA: "Moisés, Elias, Paulo, Lucas",
                alternativaB: "Elias, Mateus, João, Thiago",
                alternativaC: "Mateus, Marcos, Lucas, João",
                alternativaD: "Marcos, Lucas, Moisés, Thiago",
                alternativaCorreta: "alternativaC"
            },
            {
                pergunta: "Qual a principal oração ensinada por Jesus Cristo?",
                alternativaA: "Ave Maria",
                alternativaB: "Magnificat",
                alternativaC: "Pai Nosso",
                alternativaD: "Credo",
                alternativaCorreta: "alternativaC"
            },
            {
                pergunta: "Qual é o último livro da bíblia?",
                alternativaA: "Gênesis",
                alternativaB: "Apocalipse",
                alternativaC: "Ato dos Apóstolos",
                alternativaD: "Encerramento",
                alternativaCorreta: "alternativaB"
            },
            {
                pergunta: "O que é narrado em Gênesis?",
                alternativaA: "O fim dos tempos",
                alternativaB: "O êxodo de Moisés",
                alternativaC: "As histórias do Rei Salomão",
                alternativaD: "A criação",
                alternativaCorreta: "alternativaD"
            },
            {
                pergunta: "Quem traiu Jesus por 30 moedas de prata?",
                alternativaA: "Judas Iscariotes",
                alternativaB: "Judas Tadeu",
                alternativaC: "Saulo Iscariotes",
                alternativaD: "Bento de Núrsia",
                alternativaCorreta: "alternativaA"
            }
        ],
        medio: [
            {
                pergunta: "Quem é o atual Papa da Igreja Católica?",
                alternativaA: "Papa Francisco",
                alternativaB: "Papa Leão XIV",
                alternativaC: "Papa João Paulo II",
                alternativaD: "Papa Leão XIII",
                alternativaCorreta: "alternativaB"
            },
            {
                pergunta: "Quais as três mais importantes orações católicas?",
                alternativaA: "Ave Maria, Pai Nosso, Credo",
                alternativaB: "Ave Maria, Pai Nosso, Magnificat",
                alternativaC: "Pai Nosso, Ave Maria, Alma de Cristo",
                alternativaD: "Pai Nosso, Ave Maria, Cordeiro de Deus",
                alternativaCorreta: "alternativaA"
            },
            {
                pergunta: "Quantas leituras + salmos temos nas Eucaristias de Domingo?",
                alternativaA: "1",
                alternativaB: "2",
                alternativaC: "3",
                alternativaD: "4",
                alternativaCorreta: "alternativaD"
            },
            {
                pergunta: "Qual o nome da oração de Nossa Senhora na sua visita à Santa Isabel?",
                alternativaA: "Credo",
                alternativaB: "Ato dos Apóstolos",
                alternativaC: "Comunhão Espiritual",
                alternativaD: "Magnificat",
                alternativaCorreta: "alternativaD"
            }
        ],
        dificil: [
            {
                pergunta: "Quais os quatro dogmas Marianos?",
                alternativaA: "Imaculada Conceição, Maternidade Divina, Virgindade Perpétua, Assunção de Nossa Senhora",
                alternativaB: "Rainha do Céu, Primeiro Sacrário, Mãe de Deus, Virgindade Perpétua ",
                alternativaC: "Maternidade Divina, Assunção de Nossa Senhora, Gloriosa Coroação, Rainha do Céu",
                alternativaD: "Senhora das Graças, Mãe dos Aflitos, Desatadora de Nós, Senhora do Rosário",
                alternativaCorreta: "alternativaA"
            },
            {
                pergunta: "Como pão e vinho se tornam Corpo e Sangue de Cristo, na consagração da Eucaristia?",
                alternativaA: "Jesus Cristo se encarna no pão e no vinho, tornando-os o próprio Corpo e Sangue de Deus",
                alternativaB: "Pela oferta, o próprio Deus abençoa as espécies Eucarísticas (pão e vinho) para fazer parte da sua essência",
                alternativaC: "O Espírito Santo de Deus paira sobre a Igreja, abençoando as espécies Eucarísticas (pão e vinho), e os fiéis que o consomem",
                alternativaD: "O pão e o vinho deixam de ter substâncias naturais e se tornam, substancialmente, o Corpo e o Sangue de Cristo",
                alternativaCorreta: "alternativaD"
            }
        ]
    }

    // O quiz 3 (Santos) é montado logo abaixo, a partir do banco "bancoSantos".
};

/* =========================================================
   BANCO DO QUIZ DE SANTOS  (QUIZ 3)
   ---------------------------------------------------------
   Aqui NÃO existe "alternativaCorreta". Em vez disso, cada
   alternativa aponta para o santo que recebe +1 ponto:
       alternativaA: "texto que o usuário lê"
       santoA:       "São Tomás de Aquino"   <- quem ganha o ponto se escolher a A
   (o mesmo vale para B, C e D)

   COMO EDITAR:
   - Mudar texto de pergunta/alternativa: edite os textos.
   - Mudar quem ganha o ponto: troque o valor de santoA/B/C/D.
   - Adicionar um 5º santo: crie "santo5" no objeto "santos" abaixo
     e use "santo5" nas perguntas (o placar se ajusta sozinho).
   - Tamanho dos quizzes (curto/médio/longo): veja "quizzes[3]" mais
     abaixo. Curto = 5 primeiras perguntas, Médio = 10 primeiras,
     Longo = as 15. Então as PRIMEIRAS perguntas são as mais
     importantes (aparecem em todas as versões).
   ========================================================= */
const bancoSantos = [
    {
        pergunta: "O que você prefere fazer num domingo à noite?",
        alternativaA: "Ler, escrever ou organizar minhas ideias em silêncio", santoA: "São Tomás de Aquino",
        alternativaB: "Resolver pendências da semana e deixar tudo em ordem para os desafios", santoB: "São Miguel Arcanjo",
        alternativaC: "Cuidar de alguém da família ou preparar algo para a casa", santoC: "Nossa Senhora",
        alternativaD: "Reunir os amigos para conversar, rir e trocar experiências", santoD: "São João Paulo II"
    },
    {
        pergunta: "Diante de uma situação injusta ou difícil, qual é a sua reação?",
        alternativaA: "Tomo a frente e confronto o problema sem recuar", santoA: "São Miguel Arcanjo",
        alternativaB: "Busco o diálogo para unir os envolvidos e encontrar uma saída juntos", santoB: "São João Paulo II",
        alternativaC: "Analiso os fatos com calma e lógica antes de me posicionar", santoC: "São Tomás de Aquino",
        alternativaD: "Acolho quem foi prejudicado e ajudo discretamente no que for preciso", santoD: "Nossa Senhora"
    },
    {
        pergunta: "Qual ambiente mais combina com você?",
        alternativaA: "Uma biblioteca tranquila ou um escritório silencioso", santoA: "São Tomás de Aquino",
        alternativaB: "Uma praça movimentada ou um encontro cheio de gente", santoB: "São João Paulo II",
        alternativaC: "Uma casa acolhedora com café passado na hora", santoC: "Nossa Senhora",
        alternativaD: "O topo de uma montanha com vista ampla e vento no rosto", santoD: "São Miguel Arcanjo"
    },
    {
        pergunta: "Como seus amigos mais próximos descreveriam você?",
        alternativaA: "Firme, protetor(a) e decidido(a)", santoA: "São Miguel Arcanjo",
        alternativaB: "Atencioso(a), humilde e sempre disponível", santoB: "Nossa Senhora",
        alternativaC: "Carismático(a), comunicativo(a) e cheio(a) de energia", santoC: "São João Paulo II",
        alternativaD: "Profundo(a), observador(a) e ponderado(a)", santoD: "São Tomás de Aquino"
    },
    {
        pergunta: "Qual virtude você mais admira em uma pessoa?",
        alternativaA: "Sabedoria e clareza de pensamento", santoA: "São Tomás de Aquino",
        alternativaB: "Mansidão e cuidado silencioso com o próximo", santoB: "Nossa Senhora",
        alternativaC: "Coragem para defender o que é certo", santoC: "São Miguel Arcanjo",
        alternativaD: "Entusiasmo e capacidade de inspirar pessoas", santoD: "São João Paulo II"
    },
    {
        pergunta: "Você ganhou um dia totalmente livre. O que escolhe fazer?",
        alternativaA: "Visitar alguém que está precisando de companhia e escuta", santoA: "Nossa Senhora",
        alternativaB: "Organizar uma viagem, trilha ou passeio animado com a turma", santoB: "São João Paulo II",
        alternativaC: "Mergulhar em um livro denso ou estudar um assunto novo", santoC: "São Tomás de Aquino",
        alternativaD: "Praticar um esporte intenso que exija foco e superação", santoD: "São Miguel Arcanjo"
    },
    {
        pergunta: "Em um trabalho em grupo, qual papel você assume naturalmente?",
        alternativaA: "Quem estrutura os argumentos e aprofunda o conteúdo", santoA: "São Tomás de Aquino",
        alternativaB: "Quem motiva a equipe, apresenta as ideias e mantém o clima leve", santoB: "São João Paulo II",
        alternativaC: "Quem define a estratégia, cobra prazos e protege o time", santoC: "São Miguel Arcanjo",
        alternativaD: "Quem percebe o que está faltando e faz o trabalho de bastidores", santoD: "Nossa Senhora"
    },
    {
        pergunta: "O que mais te incomoda no comportamento das pessoas?",
        alternativaA: "Covardia e omissão diante de uma injustiça", santoA: "São Miguel Arcanjo",
        alternativaB: "Superficialidade e falta de reflexão antes de falar", santoB: "São Tomás de Aquino",
        alternativaC: "Frieza, isolamento e falta de abertura ao diálogo", santoC: "São João Paulo II",
        alternativaD: "Ingratidão e indiferença com quem precisa de ajuda", santoD: "Nossa Senhora"
    },
    {
        pergunta: "Que tipo de livro você levaria para uma viagem longa?",
        alternativaA: "Um clássico de filosofia, história ou pensamento profundo", santoA: "São Tomás de Aquino",
        alternativaB: "A biografia de um grande líder ou estrategista", santoB: "São Miguel Arcanjo",
        alternativaC: "Uma peça de teatro, poesia ou relatos de viagens pelo mundo", santoC: "São João Paulo II",
        alternativaD: "Uma história tocante sobre família, superação e humanidade", santoD: "Nossa Senhora"
    },
    {
        pergunta: "Como você reage quando alguém pisa na bola com você?",
        alternativaA: "Deixo claro onde está o limite, com firmeza e sem rodeios", santoA: "São Miguel Arcanjo",
        alternativaB: "Guardo no coração, perdoo em silêncio e continuo fazendo o bem", santoB: "Nossa Senhora",
        alternativaC: "Quebro o gelo com uma conversa franca e bem-humorada", santoC: "São João Paulo II",
        alternativaD: "Me afasto para refletir e entender os motivos antes de responder", santoD: "São Tomás de Aquino"
    },
    {
        pergunta: "Qual destes objetivos fala mais alto no seu coração?",
        alternativaA: "Compreender a fundo o sentido e a verdade das coisas", santoA: "São Tomás de Aquino",
        alternativaB: "Lutar pela justiça e proteger quem não pode se defender", santoB: "São Miguel Arcanjo",
        alternativaC: "Servir com simplicidade e ser porto seguro para quem amo", santoC: "Nossa Senhora",
        alternativaD: "Construir pontes entre pessoas diferentes e espalhar esperança", santoD: "São João Paulo II"
    },
    {
        pergunta: "Como você costuma lidar com a sua rotina?",
        alternativaA: "Valorizo horários fixos, método e silêncio para render bem", santoA: "São Tomás de Aquino",
        alternativaB: "Encaro as tarefas como missões que precisam ser cumpridas com rigor", santoB: "São Miguel Arcanjo",
        alternativaC: "Faço as coisas pequenas do dia a dia com carinho e constância", santoC: "Nossa Senhora",
        alternativaD: "Gosto de dinamismo, movimento e de conversar com gente nova no caminho", santoD: "São João Paulo II"
    },
    {
        pergunta: "Qual lema pessoal mais faz sentido para você?",
        alternativaA: "O amor se prova nos pequenos gestos de serviço.", santoA: "Nossa Senhora",
        alternativaB: "Não basta saber o que é certo; é preciso ter coragem para defendê-lo.", santoB: "São Miguel Arcanjo",
        alternativaC: "A vida ganha sentido quando é compartilhada com alegria.", santoC: "São João Paulo II",
        alternativaD: "Buscar a verdade é a forma mais alta de amar.", santoD: "São Tomás de Aquino"
    },
    {
        pergunta: "Você percebe que um evento ou festa está passando por um imprevisto sério. O que faz?",
        alternativaA: "Percebo o problema antes de todos e resolvo discretamente sem causar alarde", santoA: "Nossa Senhora",
        alternativaB: "Pego o microfone ou chamo o pessoal para manter o ânimo e reorganizar o grupo", santoB: "São João Paulo II",
        alternativaC: "Assumo o controle da situação e corto pela raiz o que está atrapalhando", santoC: "São Miguel Arcanjo",
        alternativaD: "Avalio rapidamente as causas do erro para aplicar a solução mais lógica", santoD: "São Tomás de Aquino"
    },
    {
        pergunta: "Como você gostaria de ser lembrado(a) pelas pessoas?",
        alternativaA: "Pela profundidade das ideias e pelos bons conselhos", santoA: "São Tomás de Aquino",
        alternativaB: "Pela lealdade, retidão e coragem nos momentos difíceis", santoB: "São Miguel Arcanjo",
        alternativaC: "Pela doçura, humildade e cuidado constante com todos", santoC: "Nossa Senhora",
        alternativaD: "Pela alegria contagiante e por unir as pessoas ao redor", santoD: "São João Paulo II"
    }
];

// Monta o quiz 3 com as MESMAS chaves de tamanho (curto/medio/longo).
// slice(0, N) pega as N primeiras perguntas do banco acima.
quizzes[3] = {
    curto: bancoSantos.slice(0, 5),    // 5 questões
    medio: bancoSantos.slice(0, 10),   // 10 questões
    longo: bancoSantos.slice(0, 15)    // 15 questões
};

/* =========================================================
   SANTOS (resultado do quiz 3)
   ---------------------------------------------------------
   Cada chave (São Tomás de Aquino, São Miguel Arcanjo...) é a mesma usada em santoA/B/C/D
   nas perguntas. Futuramente isso pode vir de uma tabela "santos"
   no banco de dados via API.
   ========================================================= */
const santos = {
    "São Tomás de Aquino": {
        nome: "São Tomás de Aquino",
        imagem: "../assets/media/santos/São Tomás de Aquino.png",
        texto: "Texto de exemplo explicando por que o São Tomás de Aquino é o mais compatível com você. Edite aqui."
    },
    "São Miguel Arcanjo": {
        nome: "São Miguel Arcanjo",
        imagem: "../assets/media/santos/São Miguel Arcanjo.png",
        texto: "Texto de exemplo explicando por que o São Miguel Arcanjo é o mais compatível com você. Edite aqui."
    },
    "Nossa Senhora": {
        nome: "Nossa Senhora",
        imagem: "../assets/media/santos/Nossa Senhora.png",
        texto: "Texto de exemplo explicando por que o Nossa Senhora é o mais compatível com você. Edite aqui."
    },
    "São João Paulo II": {
        nome: "São João Paulo II",
        imagem: "../assets/media/santos/São João Paulo II.png",
        texto: "Texto de exemplo explicando por que o São João Paulo II é o mais compatível com você. Edite aqui."
    }
};

// true  = resultado MOCADO: sempre mostra "São Tomás de Aquino", mesmo com pontos diferentes.
// false = resultado REAL: mostra o santo que mais pontuou.
// (Os pontos são somados normalmente nos dois casos; veja o console do navegador.)
const MOCAR_RESULTADO = false;

/* =========================================================
   CONSTANTES DO QUIZ DE SANTOS
   ========================================================= */
const QUIZ_SANTOS = 3;

// Os botões de nível do HTML continuam com os valores 'facil', 'medio' e
// 'dificil'. No quiz de santos, esses valores são traduzidos para as
// chaves do quizzes[3] por este mapa.
const mapaNiveisSantos = { facil: "curto", medio: "medio", dificil: "longo" };

/* =========================================================
   VARIÁVEIS GLOBAIS
   ========================================================= */
let quizAtual = 1;
let dificuldadeAtual = "facil";
let listaDeQuestoes = quizzes[1].facil;
let numeroDaQuestaoAtual = 0;
let pontuacaoFinal = 0;
let certas = 0;
let erradas = 0;
let quantidadeDeQuestoes = listaDeQuestoes.length;

// Placar do quiz de santos: { São Tomás de Aquino: 0, São Miguel Arcanjo: 0, ... }
let pontosPorSanto = {};
// Histórico de respostas (útil para enviar a uma API no futuro)
let respostasDoUsuario = [];

/* =========================================================
   ELEMENTOS DO DOM (pega uma vez só)
   ========================================================= */
function getBotoes() {
    return {
        btnSubmeter: document.getElementById("btnSubmeter"),
        btnProx: document.getElementById("btnProx"),
        btnTentarNovamente: document.getElementById("btnTentarNovamente"),
        primeiraOpcao: document.getElementById("primeiraOpcao"),
        segundaOpcao: document.getElementById("segundaOpcao"),
        terceiraOpcao: document.getElementById("terceiraOpcao"),
        quartaOpcao: document.getElementById("quartaOpcao")
    };
}

/* =========================================================
   FUNÇÕES AUXILIARES (novas)
   ========================================================= */

// Diz se o quiz selecionado é o de santos (lógica de pontos por santo).
function ehQuizDeSantos() {
    return quizAtual === QUIZ_SANTOS;
}

// Busca a lista de perguntas de um quiz/nível.
// No quiz de santos, traduz facil/medio/dificil -> curto/medio/longo.
function obterListaDeQuestoes(quiz, nivel) {
    if (!quizzes[quiz]) return undefined;
    const chave = (quiz === QUIZ_SANTOS) ? mapaNiveisSantos[nivel] : nivel;
    return quizzes[quiz][chave];
}

// Troca o texto dos botões de nível conforme o quiz:
// quiz de santos -> Curto/Médio/Longo; demais -> Fácil/Médio/Difícil.
function atualizarRotulosDificuldade() {
    const textos = ehQuizDeSantos()
        ? { btnFacil: "Curto", btnMedio: "Médio", btnDificil: "Longo" }
        : { btnFacil: "Fácil", btnMedio: "Médio", btnDificil: "Difícil" };

    for (const id in textos) {
        document.getElementById(id).innerHTML = textos[id];
    }
}

// Zera o placar de todos os santos cadastrados em "santos".
function zerarPontosDosSantos() {
    pontosPorSanto = {};
    Object.keys(santos).forEach(chave => {
        pontosPorSanto[chave] = 0;
    });
    respostasDoUsuario = [];
}

// Mostra/esconde os contadores de Acertos/Erros (não fazem sentido no quiz de santos).
function atualizarPainelDePontuacao() {
    document.getElementById("pontuacao").style.display = ehQuizDeSantos() ? "none" : "flex";
}

/* =========================================================
   FUNÇÕES
   ========================================================= */

function onloadEsconder() {
    document.getElementById("pontuacao").style.display = "none";
    document.getElementById("jogo").style.display = "none";
}

function iniciarQuiz() {
    // Garante que está usando o quiz/dificuldade selecionados
    listaDeQuestoes = obterListaDeQuestoes(quizAtual, dificuldadeAtual);
    quantidadeDeQuestoes = listaDeQuestoes ? listaDeQuestoes.length : 0;

    console.log("Quiz atual:", quizAtual, "Dificuldade:", dificuldadeAtual);
    console.log("Quantidade de questões:", quantidadeDeQuestoes);
    console.log("Lista:", listaDeQuestoes);

    if (!listaDeQuestoes || quantidadeDeQuestoes === 0) {
        alert("Este quiz/dificuldade ainda não tem perguntas!");
        return;
    }

    atualizarPainelDePontuacao();
    document.getElementById("jogo").style.display = "flex";
    document.getElementById("btnIniciarQuiz").style.display = "none";

    document.getElementById("qtdQuestoes").innerHTML = quantidadeDeQuestoes;

    reiniciarEstado();
    preencherHTMLcomQuestaoAtual(0);

    const { btnSubmeter, btnProx, btnTentarNovamente } = getBotoes();
    if (btnSubmeter) btnSubmeter.disabled = false;
    if (btnProx) btnProx.disabled = true;
    if (btnTentarNovamente) btnTentarNovamente.disabled = true;
}

function selecionarQuiz(numero) {
    if (!obterListaDeQuestoes(numero, dificuldadeAtual)) {
        alert("Quiz não encontrado!");
        return;
    }

    quizAtual = numero;
    listaDeQuestoes = obterListaDeQuestoes(numero, dificuldadeAtual);
    quantidadeDeQuestoes = listaDeQuestoes.length;

    // Destaque visual dos botões de quiz
    document.querySelectorAll(".botaoQuiz").forEach(btn => btn.classList.remove("ativo"));
    const ids = { 1: "btnQuizUm", 2: "btnQuizDois", 3: "btnQuizTres", 4: "btnQuizQuatro" };
    const btn = document.getElementById(ids[numero]);
    if (btn) btn.classList.add("ativo");

    // Troca "Fácil/Médio/Difícil" por "Curto/Médio/Longo" (ou o contrário)
    atualizarRotulosDificuldade();

    reiniciarEstado();
    atualizarJogoAposTrocaDeConfiguracao();
}

function selecionarDificuldade(dificuldade) {
    if (!obterListaDeQuestoes(quizAtual, dificuldade)) {
        alert("Dificuldade não encontrada para este quiz!");
        return;
    }

    dificuldadeAtual = dificuldade;
    listaDeQuestoes = obterListaDeQuestoes(quizAtual, dificuldade);
    quantidadeDeQuestoes = listaDeQuestoes.length;

    // Destaque visual dos botões de dificuldade
    document.querySelectorAll(".botaoDificuldade").forEach(btn => btn.classList.remove("ativo"));
    const mapa = { facil: "btnFacil", medio: "btnMedio", dificil: "btnDificil" };
    const btn = document.getElementById(mapa[dificuldade]);
    if (btn) btn.classList.add("ativo");

    reiniciarEstado();
    atualizarJogoAposTrocaDeConfiguracao();
}

// Depois de trocar quiz ou nível, ajusta a tela conforme o estado atual.
// (Código que antes estava repetido dentro de selecionarQuiz/selecionarDificuldade.)
function atualizarJogoAposTrocaDeConfiguracao() {
    // Se o card de resultado estava na tela, volta para o menu inicial
    if (document.getElementById("cardResultado").style.display === "flex") {
        voltarAoMenuInicial();
        return;
    }

    // Se o jogo estava aberto, recarrega a primeira pergunta
    if (document.getElementById("jogo").style.display === "flex") {
        atualizarPainelDePontuacao();
        document.getElementById("qtdQuestoes").innerHTML = quantidadeDeQuestoes;
        preencherHTMLcomQuestaoAtual(0);
    }
}

function reiniciarEstado() {
    numeroDaQuestaoAtual = 0;
    pontuacaoFinal = 0;
    certas = 0;
    erradas = 0;
    zerarPontosDosSantos();

    document.getElementById("spanCertas").innerHTML = 0;
    document.getElementById("spanErradas").innerHTML = 0;
    document.getElementById("spanPercentual").innerHTML = "0%";
    document.getElementById("spanPontuacaoFinal").innerHTML = "***";
    document.getElementById("msgFinal").innerHTML = "***";
    document.getElementById("msgFinal").className = "";

    desmarcarRadioButtons();
    limparCoresBackgroundOpcoes();

    const { btnSubmeter, btnProx, btnTentarNovamente } = getBotoes();
    if (btnSubmeter) btnSubmeter.disabled = false;
    if (btnProx) btnProx.disabled = true;
    if (btnTentarNovamente) btnTentarNovamente.disabled = true;
}

function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true);

    const questaoAtual = listaDeQuestoes[index];
    numeroDaQuestaoAtual = index;

    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = index + 1;
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
}

function submeter() {
    const options = document.getElementsByName("option");
    let hasChecked = false;

    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            hasChecked = true;
            break;
        }
    }

    if (!hasChecked) {
        alert("Não há alternativas escolhidas. Escolha uma opção.");
        return;
    }

    const { btnSubmeter, btnProx } = getBotoes();
    if (btnSubmeter) btnSubmeter.disabled = true;
    if (btnProx) btnProx.disabled = false;

    habilitarAlternativas(false);
    checarResposta();
}

function habilitarAlternativas(habilitar) {
    const { primeiraOpcao, segundaOpcao, terceiraOpcao, quartaOpcao } = getBotoes();
    const desabilitar = !habilitar;
    if (primeiraOpcao) primeiraOpcao.disabled = desabilitar;
    if (segundaOpcao) segundaOpcao.disabled = desabilitar;
    if (terceiraOpcao) terceiraOpcao.disabled = desabilitar;
    if (quartaOpcao) quartaOpcao.disabled = desabilitar;
}

function avancar() {
    limparCoresBackgroundOpcoes();
    desmarcarRadioButtons();

    numeroDaQuestaoAtual++;

    const { btnSubmeter, btnProx } = getBotoes();

    if (numeroDaQuestaoAtual < quantidadeDeQuestoes) {
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual);
        if (btnSubmeter) btnSubmeter.disabled = false;
        if (btnProx) btnProx.disabled = true;
    } else {
        finalizarJogo();
    }
}

function tentarNovamente() {
    window.location.reload();
}

function checarResposta() {
    // Quiz de santos: não existe certo/errado, só soma pontos para um santo
    if (ehQuizDeSantos()) {
        somarPontosDoSanto();
        return;
    }

    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual];
    const respostaCorreta = questaoAtual.alternativaCorreta;
    const options = document.getElementsByName("option");

    let idLabelCorreta = null;

    options.forEach(option => {
        if (option.value === respostaCorreta) {
            idLabelCorreta = option.labels[0].id;
        }
    });

    options.forEach(option => {
        if (option.checked) {
            if (option.value === respostaCorreta) {
                document.getElementById(idLabelCorreta).classList.add("text-success-with-bg");
                pontuacaoFinal++;
                certas++;
                document.getElementById("spanCertas").innerHTML = certas;
            } else {
                const idLabelErrada = option.labels[0].id;
                document.getElementById(idLabelErrada).classList.add("text-danger-with-bg");
                document.getElementById(idLabelCorreta).classList.add("text-success-with-bg");
                erradas++;
                document.getElementById("spanErradas").innerHTML = erradas;
            }
        }
    });

    // Atualiza percentual
    const total = certas + erradas;
    const percentual = total > 0 ? Math.round((certas / total) * 100) : 0;
    document.getElementById("spanPercentual").innerHTML = percentual + "%";
}

/* ---------------------------------------------------------
   QUIZ DE SANTOS: soma de pontos
   Passo a passo:
   1) descobre qual alternativa o usuário marcou (ex.: "alternativaB")
   2) pega a letra final ("B") e monta a chave "santoB"
   3) lê na pergunta atual qual santo é dono dessa alternativa
   4) soma +1 no placar desse santo
   5) guarda a resposta no histórico e destaca a escolha em cinza
   --------------------------------------------------------- */
function somarPontosDoSanto() {
    const escolhida = document.querySelector('input[name="option"]:checked');
    const letra = escolhida.value.slice(-1);                 // "A", "B", "C" ou "D"
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual];
    const chaveSanto = questaoAtual["santo" + letra];        // ex.: "São Miguel Arcanjo"

    pontosPorSanto[chaveSanto] += 1;

    respostasDoUsuario.push({
        questao: numeroDaQuestaoAtual + 1,
        alternativa: escolhida.value,
        santo: chaveSanto
    });

    // Destaque neutro (sem verde/vermelho, pois não há certo/errado)
    escolhida.labels[0].classList.add("text-new-gray");
}

function limparCoresBackgroundOpcoes() {
    const options = document.getElementsByName("option");
    options.forEach(option => {
        const id = option.labels[0].id;
        document.getElementById(id).classList.remove("text-danger-with-bg");
        document.getElementById(id).classList.remove("text-success-with-bg");
        document.getElementById(id).classList.remove("text-new-gray");
    });
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function finalizarJogo() {
    // Quiz de santos: em vez da mensagem de acertos, mostra o card do santo
    if (ehQuizDeSantos()) {
        mostrarResultadoSanto();
        return;
    }

    const porcentagem = pontuacaoFinal / quantidadeDeQuestoes;
    let texto = "";
    let classe = "";

    if (porcentagem <= 0.3) {
        texto = "Parece que você não estudou...";
        classe = "text-danger-with-bg";
    } else if (porcentagem < 0.9) {
        texto = "Pode melhorar na próxima, hein!";
        classe = "text-warning-with-bg";
    } else {
        texto = "Uau, parabéns!";
        classe = "text-success-with-bg";
    }

    texto += "<br> Você acertou " + Math.round(porcentagem * 100) + "% das questões.";

    document.getElementById("msgFinal").innerHTML = texto;
    document.getElementById("msgFinal").classList.add(classe);
    document.getElementById("spanPontuacaoFinal").innerHTML = pontuacaoFinal;
    document.getElementById("jogo").classList.add("text-new-gray");

    const { btnSubmeter, btnProx, btnTentarNovamente } = getBotoes();
    if (btnProx) btnProx.disabled = true;
    if (btnSubmeter) btnSubmeter.disabled = true;
    if (btnTentarNovamente) btnTentarNovamente.disabled = false;
}

/* ---------------------------------------------------------
   QUIZ DE SANTOS: resultado final
   --------------------------------------------------------- */

// Descobre o santo com mais pontos. Em caso de empate, vence o que
// aparece primeiro em "santos" (São Tomás de Aquino, São Miguel Arcanjo...).
// Com MOCAR_RESULTADO = true, devolve sempre "São Tomás de Aquino".
function calcularSantoCompativel() {
    if (MOCAR_RESULTADO) return "São Tomás de Aquino";

    let vencedor = Object.keys(santos)[0];
    let maior = -1;

    for (const chave in pontosPorSanto) {
        if (pontosPorSanto[chave] > maior) {
            maior = pontosPorSanto[chave];
            vencedor = chave;
        }
    }
    return vencedor;
}

// Monta um objeto simples com tudo que aconteceu no quiz.
// Futuramente este objeto pode ser enviado (fetch/POST) a uma API.
function montarResultadoParaEnvio(chaveSanto) {
    return {
        quiz: quizAtual,
        tamanho: mapaNiveisSantos[dificuldadeAtual],   // curto | medio | longo
        respostas: respostasDoUsuario,
        pontos: pontosPorSanto,
        santoResultado: chaveSanto
    };
}

// Troca a tela do quiz pelo card do santo.
function mostrarResultadoSanto() {
    const chaveSanto = calcularSantoCompativel();
    const santo = santos[chaveSanto];

    console.log("Pontos por santo:", pontosPorSanto);
    console.log("Resultado (pronto p/ API):", montarResultadoParaEnvio(chaveSanto));

    // Preenche o card
    const img = document.getElementById("imgSanto");
    img.src = santo.imagem;
    img.alt = santo.nome;
    document.getElementById("tituloSanto").innerHTML = santo.nome;
    document.getElementById("textoSanto").innerHTML = santo.texto;

    // Esconde o jogo e exibe o card
    document.getElementById("jogo").style.display = "none";
    document.getElementById("cardResultado").style.display = "flex";
}

// Botão "Voltar ao menu inicial" do card: volta à tela com o botão INICIAR QUIZ.
function voltarAoMenuInicial() {
    document.getElementById("cardResultado").style.display = "none";
    document.getElementById("jogo").style.display = "none";
    document.getElementById("pontuacao").style.display = "none";
    document.getElementById("btnIniciarQuiz").style.display = "";

    reiniciarEstado();
}