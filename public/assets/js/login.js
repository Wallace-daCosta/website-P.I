function acessar() {
    let emailUsuario = ipt_emailUsuario.value
    let senhaUsuario = ipt_senhaUsuario.value

if (emailUsuario == "" || senhaUsuario == "") {
        msg.innerHTML = `<p style='color: red;'> <br>Preencha e-mail e senha!</p>`;
        return;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailUsuario,
            senhaServer: senhaUsuario
        })
    })
        .then(function (resposta) {
            if (resposta.status == 200) {
                resposta.json().then(function (json) {
                    sessionStorage.setItem("ID_USUARIO", json.idUsuario);
                    sessionStorage.setItem("PRIMEIRO_NOME", json.primeiroNome);
                    sessionStorage.setItem("SEGUNDO_NOME", json.segundoNome);
                    sessionStorage.setItem("EMAIL_USUARIO", json.email);
                    sessionStorage.setItem("TEM_DEVOCAO", json.temDevocao);

                    msg.innerHTML = `<p style='color: green;'> <br>Iniciando Sessão!</p>`;
                    window.location.href = "../website/index.html";
                });
            } else if (resposta.status == 403) {
                msg.innerHTML = `<p style='color: red;'> <br>Credenciais incorretas!</p>`;
            } else {
                msg.innerHTML = `<p style='color: red;'> <br>Erro inesperado ao autenticar. Tente novamente.</p>`;
            }
        })
        .catch(function (erro) {
            console.error("Erro na requisição de login:", erro);
            msg.innerHTML = `<p style='color: red;'> <br>Servidor fora do ar!</p>`;
        });
}