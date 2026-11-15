let tamanhoSenha = 0
let tamanhoVerificado = false
let temMinuscula = false
let temMaiuscula = false
let temNumero = false
let temEspecial = false


function validarSenha() {

    temNumero = false
    temEspecial = false


    let tamanho = tamanhoRegra
    let minuscula = minusculaRegra
    let maiuscula = maiusculaRegra
    let numero = numeroRegra
    let especial = especialRegra

    let senhaUsuario = ipt_senhaUsuario.value

    if (senhaUsuario.length >= 8 && senhaUsuario.length <= 16) {
        tamanhoRegra.innerHTML = '<span style="color: #1E8E3E;">✓ Conter 8 a 16 caracteres.</span>'
        tamanhoVerificado = true
    } else {
        tamanhoRegra.innerHTML = '<span style="color: #D93025;">x Conter 8 a 16 caracteres.</span>'
        tamanhoVerificado = false
    }

    if (senhaUsuario != senhaUsuario.toUpperCase()) {
        minusculaRegra.innerHTML = '<span style="color: #1E8E3E;">✓ Pelo menos uma letra minúscula (a-z).</span>'
        temMinuscula = true
    } else {
        minusculaRegra.innerHTML = '<span style="color: #D93025;">x Pelo menos uma letra minúscula (a-z).</span>'
        temMinuscula = false
    }

    if (senhaUsuario != senhaUsuario.toLowerCase()) {
        maiusculaRegra.innerHTML = '<span style="color: #1E8E3E;">✓ Pelo menos uma letra maiúscula (A-Z).</span>'
        temMaiuscula = true
    } else {
        maiusculaRegra.innerHTML = '<span style="color: #D93025;">x Pelo menos uma letra maiúscula (A-Z).</span>'
        temMaiuscula = false
    }

    for (let i = 0; i < senhaUsuario.length; i++) {
        if ('0123456789'.includes(senhaUsuario[i])) {
            temNumero = true
        }
    }

    if (temNumero == true) {
        numeroRegra.innerHTML = '<span style="color: #1E8E3E;">✓ Pelo menos um algarismo (0-9).</span>'
    } else {
        numeroRegra.innerHTML = '<span style="color: #D93025;">x Pelo menos um algarismo (0-9).</span>'
    }

    for (let i = 0; i < senhaUsuario.length; i++) {
        if ('!@#$%&'.includes(senhaUsuario[i])) {
            temEspecial = true
        }


        if (temEspecial == true) {
            especialRegra.innerHTML = '<span style="color: #1E8E3E;">✓ Pelo menos um caractere especial do tipo: !@#$%&.</span>'
        } else {
            especialRegra.innerHTML = '<span style="color: #D93025;">x Pelo menos um caractere especial do tipo: !@#$%&.</span>'
        }
    }

    tamanhoSenha = senhaUsuario.length

}

function mostrarSantos() {

    let temDevocao = Number(sel_temDevocao.value)

    if (temDevocao == 1) {
        div_santosExibir.innerHTML = `
            <p>Lista de Santos | 1*</p>
            <select id='sel_santo1' class='camposCadastro'>
                <option value="n/a" selected disabled>Selecione uma Opção</option>
                <option value="1">São Tomás de Aquino</option>
                <option value="2">São Miguel</option>
                <option value="3">Virgem Maria</option>
                <option value="4">São João Paulo II</option>
                <option value="5">Santo Agostinho</option>
                <option value="6">São Bento</option>
                <option value="7">São José</option>
                <option value="8">Outros</option>                
            </select>
            
            <p>Lista de Santos | 2*</p>
            <select id='sel_santo2' class='camposCadastro'>
                <option value="n/a" selected disabled>Selecione uma Opção</option>
                <option value="1">São Tomás de Aquino</option>
                <option value="2">São Miguel</option>
                <option value="3">Virgem Maria</option>
                <option value="4">São João Paulo II</option>
                <option value="5">Santo Agostinho</option>
                <option value="6">São Bento</option>
                <option value="7">São José</option>
                <option value="8">Outros</option>                
            </select>
            
            <p>Lista de Santos | 3*</p>
            <select id='sel_santo3' class='camposCadastro'>
                <option value="n/a" selected disabled>Selecione uma Opção</option>
                <option value="1">São Tomás de Aquino</option>
                <option value="2">São Miguel</option>
                <option value="3">Virgem Maria</option>
                <option value="4">São João Paulo II</option>
                <option value="5">Santo Agostinho</option>
                <option value="6">São Bento</option>
                <option value="7">São José</option>
                <option value="8">Outros</option>         
            </select>`
    } else {
        div_santosExibir.innerHTML = ''
    }
}

function registrar() {

    let emailUsuario = ipt_emailUsuario.value
    let nomeUsuario = ipt_nomeUsuario.value
    let sobrenomeUsuario = ipt_sobrenomeUsuario.value
    let emailValido = false
    let temDevocao = sel_temDevocao.value;
    let santos = [];

    if (temDevocao == 1) {
        santos = [
            Number(sel_santo1.value),
            Number(sel_santo2.value),
            Number(sel_santo3.value)
        ];
    }

    if (nomeUsuario.length <= 0) {
        alert('Insira um nome');
        ipt_nomeUsuario.value = '';
        ipt_nomeUsuario.focus();

    } else if (sobrenomeUsuario.length <= 0) {
        alert('Insira um sobrenome');
        ipt_sobrenomeUsuario.value = '';
        ipt_sobrenomeUsuario.focus();

    } else if (temDevocao == 'n/a') {
        alert('Escolha uma opção de Santos');
        sel_temDevocao.focus();

    } else if (temDevocao == 1 && isNaN(santos[0])) {
        alert('Escolha o 1º santo');
        sel_santo1.focus();

    } else if (temDevocao == 1 && isNaN(santos[1])) {
        alert('Escolha o 2º santo');
        sel_santo2.focus();

    } else if (temDevocao == 1 && isNaN(santos[2])) {
        alert('Escolha o 3º santo');
        sel_santo3.focus();

    } else if (
        temDevocao == 1 && (
            (santos[0] == santos[1] && santos[0] != 8) ||
            (santos[0] == santos[2] && santos[0] != 8) ||
            (santos[1] == santos[2] && santos[1] != 8)
        )
    ) {
        alert('Os santos de devoção devem ser diferentes entre si, exceto "Outros"');

    } else if (emailUsuario.includes('@') && emailUsuario.includes('.')) {
        emailValido = true;

    } else {
        alert('E-mail inválido');
        ipt_emailUsuario.focus();
    }

    if (emailValido == true) {

        validarSenha()

        if (tamanhoSenha < 8) {
            alert('Sua senha tem menos de 8 caracteres.')
        } else if (tamanhoSenha > 16) {
            alert('Sua senha tem mais de 16 caracteres.')
        } else if (temMinuscula == false) {
            alert('Falta uma letra minúscula na sua senha.')
        } else if (temMaiuscula == false) {
            alert('Falta uma letra maiúscula na sua senha.')
        } else if (temNumero == false) {
            alert('Falta um algarismo na sua senha.')
        } else if (temEspecial == false) {
            alert('Falta um caractere especial na sua senha.')
        } else {
            let senhaUsuario = ipt_senhaUsuario.value;

            let corpoRequisicao = {
                primeiroNomeServer: nomeUsuario,
                segundoNomeServer: sobrenomeUsuario,
                emailServer: emailUsuario,
                senhaServer: senhaUsuario,
                temDevocaoServer: Number(temDevocao)
            };

            if (temDevocao == 1) {
                corpoRequisicao.santosServer = santos;
            }

            fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(corpoRequisicao)
            })
                .then(function (resposta) {
                    if (resposta.status == 201) {
                        window.location.href = "../login/login.html";
                    } else if (resposta.status == 409) {
                        alert("E-mail já cadastrado");
                    } else if (resposta.status == 400) {
                        resposta.text().then(function (textoServidor) {
                            alert(textoServidor);
                        });
                    } else {
                        alert("Erro ao realizar cadastro. Tente novamente.");
                    }
                })
                .catch(function (erro) {
                    console.error("Falha na requisição:", erro);
                    alert("Servidor fora do ar");
                });
        }
    }
}