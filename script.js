// Função para mudar as opções e controlar o histórico
function navigate(buttonText, id) {
    // Ocultar todos os menus
    document.querySelectorAll('main').forEach(function(main) {
        main.classList.add('hidden');
    });

    /* 
    
        O método querySelectorAll é usado para selecionar todos os elementos <main> do documento HTML.
    
        O método forEach é utilizado para iterar sobre cada elemento (neste caso, cada <main> da NodeList).
        Para cada elemento <main>, a função anônima passada como argumento para o forEach é executada, recebendo o elemento como o parâmetro main.
    
        Dentro da função, o método classList.add('hidden') adiciona a classe hidden a cada elemento <main> para ocultar.  
    
    */

    // Exibir o menu clicado
    if (id) {
        document.getElementById(id).classList.remove('hidden');
    }

    /* 
    
        Essa parte usa o método getElementById para encontrar o elemento no documento que tenha o id correspondente ao valor passado para a função.
        O id é o identificador único do elemento <main> que você quer mostrar.

        .classList.remove('hidden'): Essa linha remove a classe hidden do elemento que foi encontrado com getElementById.
        Remover a classe hidden faz com que o elemento volte a ser exibido, já que ele não terá mais a classe que estava ocultando-o (display: none)
    
    */

    // Alterar o texto do cabeçalho
    document.getElementById('header').innerText = buttonText;

    // Adicionar o estado ao histórico
    history.pushState({section: id, header: buttonText}, buttonText, '');
    
    /* 

        A sintaxe do pushState é:

        history.pushState(stateObject, title, url);

        ----------------------------------------------------
    
        {section: id, header: buttonText} (stateObject):

        Esse é o objeto de estado que você quer salvar no histórico. No seu caso, ele contém:

        section: id: Armazena o id da seção que foi clicada. Isso permitirá saber qual seção estava visível no momento em que o estado foi salvo.

        header: buttonText: Armazena o texto do botão que foi clicado, para que o cabeçalho da página possa ser restaurado corretamente se o usuário voltar para esse estado.

        Esse objeto será útil quando o usuário utilizar o botão "voltar" do navegador, permitindo que a página saiba em qual seção e com qual texto ela deve ser exibida.

        ------------------------------------------------------

        buttonText (title):

        Esse argumento é para o título da página (geralmente exibido na aba do navegador). No seu código, ele é o texto do botão clicado.

        Embora a maioria dos navegadores modernos ignorem esse argumento, ele ainda está lá como parte da sintaxe.

        ------------------------------------------------------

        '' (url):

        Esse argumento é para o URL que aparece na barra de endereços. No seu código, o valor é uma string vazia (''), o que significa que o URL não será alterado  visivelmente na barra de endereços. Se quisesse, você poderia alterar esse argumento para atualizar a URL, mas sem recarregar a página.

    */
}

// Quando o usuário clicar no botão de voltar do navegador
window.onpopstate = function(event) {

    /*
    
        window.onpopstate: Este evento é acionado quando o usuário navega pelo histórico do navegador (por exemplo, clicando no botão "Voltar"). A função definida aqui será chamada sempre que esse evento ocorrer.

        function(event): A função recebe um parâmetro event, que contém informações sobre o estado que foi restaurado.    
    */

    /* 
    
        Basicamente, daqui pra baixo ele reverte o que fez na parte de la de cima.
    
    */    
    if (event.state) {
        // Atualizar o conteúdo com base no histórico
        document.querySelectorAll('main').forEach(function(main) {
            main.classList.add('hidden');
        });
        if (event.state.section) {
            document.getElementById(event.state.section).classList.remove('hidden');
        }
        document.getElementById('header').innerText = event.state.header;
    } else {
        // Caso o estado seja nulo, mostrar o menu principal
        document.querySelectorAll('main').forEach(function(main) {
            main.classList.add('hidden');
        });
        document.getElementById('main-menu').classList.remove('hidden');
        document.getElementById('header').innerText = 'Menu de Opções';
    }
};

