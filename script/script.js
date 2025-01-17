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
    
    function salvarEstado() {
        const estado = {
            posicoes,
            jogador,
            jogando
        };
        localStorage.setItem('estadoJogo', JSON.stringify(estado));
    }
    
    function carregarEstado() {
        const estadoSalvo = localStorage.getItem('estadoJogo');
        if (estadoSalvo) {
            const { posicoes: posSalvas, jogador: jogadorSalvo, jogando: jogandoSalvo } = JSON.parse(estadoSalvo);
            posicoes = posSalvas;
            jogador = jogadorSalvo;
            jogando = jogandoSalvo;
    
            posicoes.forEach((valor, index) => {
                const button = document.querySelector(`button[data-pos="${index}"]`);
                if (valor) {
                    button.textContent = valor;
                    button.classList.add(valor === 'X' ? 'jogadorX' : 'jogadorO');
                }
            });
    
            vez.textContent = jogador;
        }
    }
    

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
                mensagemVitoria.style.visibility = 'visible';
                mensagemVitoria.style.opacity = '1';
                mensagemVitoria.style.transform = 'translate(-50%, -50%) scale(1)';
                vencedorSpan.textContent = `${vencedor} venceu! `; 
                document.querySelector("#imagem_clashroyale").src = "./image/heheheha-clash-royale.gif";
                jogando = false;
                salvarEstado()
                return;
            }
    
            if (verificarEmpate()) {
                mensagemVitoria.style.visibility = 'visible';
                mensagemVitoria.style.opacity = '1';
                mensagemVitoria.style.transform = 'translate(-50%, -50%) scale(1)';
                vencedorSpan.textContent = "Deu Velha"; 
                document.querySelector("#imagem_clashroyale").src = "./image/cry.gif";
                jogando = false;
                salvarEstado()
                return;
            }
    
            jogador = jogador === 'X' ? 'O' : 'X'; 
            vez.textContent = jogador;
            salvarEstado()
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
        mensagemVitoria.style.visibility = 'invisible';
        mensagemVitoria.style.opacity = '0';
        mensagemVitoria.style.transform = 'translate(0, 0) scale(1)';
        localStorage.removeItem('estadoJogo'); // apaga o estado salvo do jogo
    });
    
    carregarEstado();

});