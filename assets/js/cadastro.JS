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

    for (i = 0; i < senhaUsuario.length; i++) {
        if('0123456789'.includes(senhaUsuario[i])) {
            temNumero = true
        }
    }

    if (temNumero == true) {
        numeroRegra.innerHTML = '<span style="color: #1E8E3E;">✓ Pelo menos um algarismo (0-9).</span>'
    } else {
        numeroRegra.innerHTML = '<span style="color: #D93025;">x Pelo menos um algarismo (0-9).</span>'
        }

    for (i = 0; i < senhaUsuario.length; i++) {
        if('!@#$%&'.includes(senhaUsuario[i])) {
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

function mostrarCargo() {

    let membroEquipe = sel_membroEquipe.value
    
    if (membroEquipe == 'Sim') {
        div_cargoEquipe.innerHTML = `
            <p>Cargo na Equipe*</p>
            <select id='sel_cargoEquipe' class='camposCadastro'>
                <option value="n/a" selected disabled>Selecione uma Opção</option>
                <option value="Trainee">Trainee</option>
                <option value="Projetista">Projetista</option>
                <option value="Coordenador">Coordenador</option>
                <option value="Capitao">Capitão</option>
            </select>`
    } else {
        div_cargoEquipe.innerHTML = ''
    }
}

function registrar() {

    let emailUsuario = ipt_emailUsuario.value
    let nomeUsuario = ipt_nomeUsuario.value
    let sobrenomeUsuario = ipt_sobrenomeUsuario.value
    let membroEquipe = sel_membroEquipe.value
    let emailValido = false


        if (nomeUsuario.length <= 0) {
            alert('Insira um nome')
            ipt_nomeUsuario.value = '';
            ipt_nomeUsuario.focus();
        
        } else if (sobrenomeUsuario.length <= 0) {
            alert('Insira um sobrenome')
            ipt_sobrenomeUsuario.value = '';
            ipt_sobrenomeUsuario.focus();  

        } else if (membroEquipe == 'n/a') {
            alert('Escolha uma opção para membro da equipe')
            sel_membroEquipe.focus()
        } else if (membroEquipe == 'Sim' && sel_cargoEquipe.value == 'n/a') {
            alert('Escolha o seu cargo na equipe')
            sel_cargoEquipe.focus() 
        } else if (emailUsuario.includes('@') && emailUsuario.includes('.')) {
            emailValido = true;
        } else {
            alert('E-mail inválido')
            emailUsuario.focus();
        
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
        }
    }
}