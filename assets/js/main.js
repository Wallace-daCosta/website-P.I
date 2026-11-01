function testar() {
    menuEntrar.innerHTML = 
    `
      <p style='margin-top: 500px;'> Registrar-se | Iniciar Sessão </p>
    `
}

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