document.addEventListener('DOMContentLoaded', () => {
    let jogador = "X"
    const vez = document.getElementById('vez')
    const tabuleiro = document.querySelector('.tabuleiro')
    const combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];


    tabuleiro.addEventListener('click', (event) => {
        const button = event.target; // Elemento clicado

    // confere se o elemento clicado é um botão e está vazio
        if (button.tagName === 'BUTTON' && button.textContent === '') {
            button.textContent = jogador; // preenche o botão com jogador

            jogador = jogador === 'X' ? 'O' : 'X'; // alterna o símbolo do jogador
            vez.textContent = jogador; // muda o sinalizador abaixo do tabuleiro
        }
    });
});