document.addEventListener('DOMContentLoaded', () => {
    const vez = document.getElementById('vez');
    const tabuleiro = document.querySelector('.tabuleiro');
    const mensagemVitoria = document.getElementById('mensagemVitoria');
    const vencedorSpan = document.getElementById('vencedor');
    const combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonaisasas
    ];
    
    let jogando = true;
    let jogador = "X";
    let posicoes = Array(9).fill(null); // Lista para salvar as posições ocupadas

    function condicaoVitoria() {
        for (let combinacao of combinacoes) {
            const [a, b, c] = combinacao;
            if (
                posicoes[a] &&
                posicoes[a] === posicoes[b] &&
                posicoes[a] === posicoes[c]
            ) {
                return posicoes[a]; 
            }
        }
        return null;
    }

    function verificarEmpate() {
        return posicoes.every(posicao => posicao !== null); // Retorna empate se todas as posições estiverem preenchidas
    }

    tabuleiro.addEventListener('click', (event) => {
        const button = event.target;
    
        
        if (button.tagName === 'BUTTON' && button.textContent === '' && jogando) {
            const pos = button.getAttribute('data-pos'); // Pega a posição clicada
            button.textContent = jogador; // Preenche o botão com o jogador
            button.classList.add(jogador === 'X' ? 'jogadorX' : 'jogadorO'); // Adiciona a classe com base no jogador
            posicoes[pos] = jogador; // Atualiza a lista de posições
            
            const vencedor = condicaoVitoria();
            if (vencedor) {
                mensagemVitoria.classList.add('mostrar');
                vencedorSpan.textContent = `${vencedor} venceu! `; 
                jogando = false;
                return;
            }
    
           
            if (verificarEmpate()) {
                mensagemVitoria.classList.add('mostrar');
                vencedorSpan.textContent = "Deu Velha"; 
                document.querySelector("#imagem_clashroyale").src = "./image/cry.gif";
                jogando = false;
                return;
            }
    
            jogador = jogador === 'X' ? 'O' : 'X'; 
            vez.textContent = jogador;
        }
    });
    
    
    reiniciar.addEventListener('click', () => {
        posicoes.fill(null); 
        document.querySelectorAll('.tabuleiro button').forEach(button => {
            button.textContent = ''; 
            button.classList.remove('jogadorX', 'jogadorO'); 
        });
        jogador = 'X';
        vez.textContent = jogador;
        jogando = true;
        mensagemVitoria.classList.remove('mostrar');
    });
    
});