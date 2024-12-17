const cells = document.querySelectorAll('.celula');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
    const position = cell.dataset.pos; // Obtém o valor do atributo data-pos
    console.log(`Você clicou na posição: ${position}`);
    });
});