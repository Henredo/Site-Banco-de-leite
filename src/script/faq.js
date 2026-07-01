document.addEventListener("DOMContentLoaded", function () {
  
  // ── MÁGICA 1: CLICAR NO CARD E ABRIR A RESPOSTA ──
  const cards = document.querySelectorAll(".faq-card");
  
  cards.forEach(card => {
    card.addEventListener("click", function () {
      // Alterna a classe active no card clicado
      this.classList.toggle("active");
    });
  });

  // ── MÁGICA 2: SISTEMA DE PESQUISA EM TEMPO REAL ──
  const campoBusca = document.getElementById("campo-busca");
  const itensBuscaveis = document.querySelectorAll(".item-buscavel");
  const alertaSemResultado = document.getElementById("busca-sem-resultado");

  campoBusca.addEventListener("input", function (e) {
    const termoPesquisa = e.target.value.toLowerCase().trim();
    let encontrouAlgo = false;

    itensBuscaveis.forEach(item => {
      // Pega todo o texto dentro do card ou do bloco de info
      const textoDoItem = item.textContent.toLowerCase();

      if (textoDoItem.includes(termoPesquisa)) {
        item.style.display = ""; // Mostra o item
        encontrouAlgo = true;
      } else {
        item.style.display = "none"; // Esconde o item
      }
    });

    // Se o usuário digitou algo e NÃO encontrou nada, exibe o bloco do WhatsApp
    if (!encontrouAlgo && termoPesquisa !== "") {
      alertaSemResultado.style.display = "block";
    } else {
      alertaSemResultado.style.display = "none";
    }
  });

});