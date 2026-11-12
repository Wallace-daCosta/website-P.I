let menuAberto = false;
let contadorFSAE = 1;
let textosFSAE = 4;

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

function botaoProximo() {

    contadorFSAE = contadorFSAE + 1
    if (contadorFSAE > textosFSAE) {
        contadorFSAE = 1
    }

    if (contadorFSAE == 1) {
        tituloTeste.innerHTML = 'Provas Estáticas'
        textoPainel.innerHTML = 'Texto 1'
    } else if (contadorFSAE == 2) {
        tituloTeste.innerHTML = 'Acceleration'
        textoPainel.innerHTML = 'Texto 2'
    } else if (contadorFSAE == 3) {
        tituloTeste.innerHTML = 'Skid-Pad'
        textoPainel.innerHTML = 'Texto 3'
    } else if (contadorFSAE == 4) {
        tituloTeste.innerHTML = 'Endurance'
        textoPainel.innerHTML = 'Texto 4'
    }
}

function botaoAnterior() {
    
    contadorFSAE = contadorFSAE - 1
    if (contadorFSAE < 1) {
        contadorFSAE = textosFSAE
    }
    
    if (contadorFSAE == 1) {
        tituloTeste.innerHTML = 'Provas Estáticas'
        textoPainel.innerHTML = 'Texto 1'
    } else if (contadorFSAE == 2) {
        tituloTeste.innerHTML = 'Acceleration'
        textoPainel.innerHTML = 'Texto 2'
    } else if (contadorFSAE == 3) {
        tituloTeste.innerHTML = 'Skid-Pad'
        textoPainel.innerHTML = 'Texto 3'
    }  else if (contadorFSAE == 4) {
        tituloTeste.innerHTML = 'Endurance'
        textoPainel.innerHTML = 'Texto 4'
    }
}