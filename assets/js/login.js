function acessar() {
    let emailUsuario = ipt_emailUsuario.value
    let senhaUsuario = ipt_senhaUsuario.value

    if ((emailUsuario != 'wallace.costa@epr.poli') || (senhaUsuario != 'FSAEB21')) {
        msg.innerHTML = `<p style='color: red;'> <br>Credenciais incorretas! Tente novamente.</p>`
    } else {
        msg.innerHTML = `<p style='color: green;'> <br>Iniciando Sessão!</p>`
        window.location.href = '../website/index.html'
    }
}