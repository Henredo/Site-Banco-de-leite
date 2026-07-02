document.addEventListener('DOMContentLoaded', function () {
    
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