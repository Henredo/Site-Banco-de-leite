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

document.addEventListener("DOMContentLoaded", function () {
  
  // ── MÁGICA 1: CLICAR NO CARD E ABRIR A RESPOSTA (FAQ) ──
  const cards = document.querySelectorAll(".faq-card");
  
  cards.forEach(card => {
    card.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });

  // ── MÁGICA 2: SISTEMA DE PESQUISA EM TEMPO REAL (FAQ) ──
  const campoBusca = document.getElementById("campo-busca");
  const itensBuscaveis = document.querySelectorAll(".item-buscavel");
  const alertaSemResultado = document.getElementById("busca-sem-resultado");

  // O "if" garante que a busca só funcione se o usuário estiver na página do FAQ
  if (campoBusca) {
    campoBusca.addEventListener("input", function (e) {
      const termoPesquisa = e.target.value.toLowerCase().trim();
      let encontrouAlgo = false;

      itensBuscaveis.forEach(item => {
        const textoDoItem = item.textContent.toLowerCase();

        if (textoDoItem.includes(termoPesquisa)) {
          item.style.display = ""; 
          encontrouAlgo = true;
        } else {
          item.style.display = "none"; 
        }
      });

      if (!encontrouAlgo && termoPesquisa !== "") {
        alertaSemResultado.style.display = "block";
      } else {
        alertaSemResultado.style.display = "none";
      }
    });
  }

  // ── MÁGICA 3: COPIAR PARA A ÁREA DE TRANSFERÊNCIA (CONTATOS) ──
  const elementosCopiar = document.querySelectorAll('.copiar-texto');
  
  // O "if" garante que o script de copiar só rode se achar os telefones/emails na tela
  if (elementosCopiar.length > 0) {
    
    // Cria a caixinha preta de aviso (Toast)
    const toast = document.createElement("div");
    toast.id = "toast-aviso";
    document.body.appendChild(toast);

    elementosCopiar.forEach(elemento => {
        elemento.addEventListener('click', () => {
            const textoParaCopiar = elemento.getAttribute('data-copiar');
            
            // Joga o texto pro Ctrl+C do usuário
            navigator.clipboard.writeText(textoParaCopiar).then(() => {
                toast.textContent = `"${textoParaCopiar}" copiado!`;
                toast.classList.add("mostrar");
                
                // Faz a caixinha sumir sozinha depois de 3 segundos
                setTimeout(() => { 
                    toast.classList.remove("mostrar"); 
                }, 3000);
            }).catch(err => {
                console.error("Falha ao copiar texto: ", err);
            });
        });
    });
  }
    
    // ==========================================
    // 1. FUNCIONALIDADE DOS CARDS (SANFONA)
    // ==========================================
    const cardPerguntas = document.querySelectorAll('.card-pergunta');

    cardPerguntas.forEach(pergunta => {
        pergunta.addEventListener('click', () => {
            const card = pergunta.closest('.faq-card');
            
            // Alterna a classe 'active' no card clicado
            card.classList.toggle('active');
            
            // OPCIONAL: Se você quiser que apenas UM card fique aberto por vez, 
            // desinale as linhas abaixo tirando as duas barras "//"
            /*
            document.querySelectorAll('.faq-card').forEach(outroCard => {
                if (outroCard !== card) {
                    outroCard.classList.remove('active');
                }
            });
            */
        });
    });

    // ==========================================
    // 2. FUNCIONALIDADE DA BARRA DE BUSCA
    // ==========================================
    const campoBusca = document.getElementById('campo-busca');
    const alertaSemResultado = document.getElementById('busca-sem-resultado');
    const itensBuscaveis = document.querySelectorAll('.item-buscavel');
    const topicosGrupo = document.querySelectorAll('.faq-topico-grupo');

    // Função auxiliar para remover acentos e facilitar a busca
    function removerAcentos(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    campoBusca.addEventListener('input', function () {
        const termoBusca = removerAcentos(campoBusca.value.toLowerCase().trim());
        let totalVisiveis = 0;

        // 1º Passo: Filtrar os blocos de informações e cards individuais
        itensBuscaveis.forEach(item => {
            const textoItem = removerAcentos(item.textContent.toLowerCase());
            
            if (textoItem.includes(termoBusca)) {
                item.style.display = ''; // Restaura o padrão do CSS (block, flex, grid...)
                totalVisiveis++;
            } else {
                item.style.display = 'none'; // Esconde o item que não bate com a busca
            }
        });

        // 2º Passo: Otimizar os títulos dos tópicos criados
        // Se um tópico inteiro ficar sem nenhuma pergunta visível, esconde o título dele
        topicosGrupo.forEach(grupo => {
            const itensDoGrupo = grupo.querySelectorAll('.item-buscavel');
            let itensVisiveisNoGrupo = 0;
            
            itensDoGrupo.forEach(item => {
                if (item.style.display !== 'none') {
                    itensVisiveisNoGrupo++;
                }
            });

            // Se a busca não estiver vazia e não houver itens visíveis no grupo, esconde a seção
            if (itensVisiveisNoGrupo === 0 && termoBusca !== '') {
                grupo.style.display = 'none';
            } else {
                grupo.style.display = ''; // Mostra a seção normalmente
            }
        });

        // 3º Passo: Mostrar ou esconder o alerta de contato (WhatsApp/Telefone)
        if (totalVisiveis === 0 && termoBusca !== '') {
            alertaSemResultado.style.display = 'block';
        } else {
            alertaSemResultado.style.display = 'none';
        }
    });
});