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

function atualizarMenuSessao() {
    const idUsuario = sessionStorage.getItem("ID_USUARIO") || sessionStorage.getItem("idUsuario");
    const nomeUsuario = sessionStorage.getItem("NOME_USUARIO") || sessionStorage.getItem("primeiroNome");
    const menu = document.getElementById("menuEntrar");

    if (!menu || !idUsuario) return;

    const titulo = menu.querySelector(".menuTitulo");
    const texto = menu.querySelector(".menuTexto");
    const botoes = menu.querySelector(".menuBotoes");

    if (titulo) {
        titulo.textContent = nomeUsuario ? `Olá, ${nomeUsuario}!` : "Bem-vindo de volta!";
    }
    if (texto) {
        texto.textContent = "Você está conectado à comunidade.";
    }
    if (botoes) {
        botoes.innerHTML = `
            <a class="botaoCadastro" href="../Dashboards/dashboardPublica.html">Meu Painel</a>
            <button type="button" class="botaoLogin" onclick="sair()">Sair</button>
        `;
    }
}

function sair() {
    sessionStorage.clear();
    window.location.href = "../website/index.html";
}

window.addEventListener("DOMContentLoaded", atualizarMenuSessao);