document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. FUNCIONALIDADE DOS CARDS (SANFONA)
    // ==========================================
    // Suporta tanto o clique no cabeçalho (.card-pergunta) quanto o clique direto (.faq-card)
    const cardPerguntas = document.querySelectorAll('.card-pergunta');
    const faqCardsDiretos = document.querySelectorAll('.faq-card');

    if (cardPerguntas.length > 0) {
        cardPerguntas.forEach(pergunta => {
            pergunta.addEventListener('click', () => {
                const card = pergunta.closest('.faq-card');
                if (card) {
                    card.classList.toggle('active');
                }
            });
        });
    } else if (faqCardsDiretos.length > 0) {
        // Fallback de segurança para layouts que usam clique direto no card
        faqCardsDiretos.forEach(card => {
            card.addEventListener('click', function () {
                this.classList.toggle('active');
            });
        });
    }

    // ==========================================
    // 2. FUNCIONALIDADE DA BARRA DE BUSCA INTELIGENTE (FAQ / INFORMAÇÕES)
    // ==========================================
    const campoBusca = document.getElementById('campo-busca');
    
    // O "if" garante que a busca só execute se o elemento existir na página atual
    if (campoBusca) {
        const alertaSemResultado = document.getElementById('busca-sem-resultado');
        const itensBuscaveis = document.querySelectorAll('.item-buscavel');
        const topicosGrupo = document.querySelectorAll('.faq-topico-grupo');
        
        // Elementos estruturais para controle de limpeza visual da tela
        const secaoDoacao = document.querySelector('.secao-doacao');
        const infoSection = document.querySelector('.info-section');
        const perguntasSection = document.querySelector('.perguntas-section');

        // Função interna para ignorar acentos e aproximar a pesquisa do usuário
        function removerAcentos(texto) {
            return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }

        campoBusca.addEventListener('input', function () {
            const termoBusca = removerAcentos(campoBusca.value.toLowerCase().trim());
            const buscaVazia = (termoBusca === '');
            let totalVisiveis = 0;

            // 1º Passo: Filtrar os blocos individuais de informação (.item-buscavel)
            itensBuscaveis.forEach(item => {
                const textoItem = removerAcentos(item.textContent.toLowerCase());
                if (textoItem.includes(termoBusca)) {
                    item.style.display = '';
                    totalVisiveis++;
                } else {
                    item.style.display = 'none';
                }
            });

            // 2º Passo: Filtrar a seção de passos da coleta (.secao-doacao)
            if (secaoDoacao) {
                const textoDoacao = removerAcentos(secaoDoacao.textContent.toLowerCase());
                if (buscaVazia) {
                    secaoDoacao.style.display = '';
                } else if (textoDoacao.includes(termoBusca)) {
                    secaoDoacao.style.display = '';
                    totalVisiveis++; 
                } else {
                    secaoDoacao.style.display = 'none';
                }
            }

            // 3º Passo: Esconder subgrupos de tópicos do FAQ vazios
            topicosGrupo.forEach(grupo => {
                const itensDoGrupo = grupo.querySelectorAll('.item-buscavel');
                let itensVisiveisNoGrupo = 0;
                
                itensDoGrupo.forEach(item => {
                    if (item.style.display !== 'none') {
                        itensVisiveisNoGrupo++;
                    }
                });

                if (itensVisiveisNoGrupo === 0 && !buscaVazia) {
                    grupo.style.display = 'none';
                } else {
                    grupo.style.display = '';
                }
            });

            // 4º Passo: Ocultar títulos das grandes seções se ficarem totalmente vazias
            if (infoSection) {
                const blocosVisiveis = Array.from(infoSection.querySelectorAll('.info-bloco')).some(b => b.style.display !== 'none');
                const doacaoVisivel = secaoDoacao ? (secaoDoacao.style.display !== 'none') : false;
                
                if (!blocosVisiveis && !doacaoVisivel && !buscaVazia) {
                    infoSection.style.display = 'none';
                } else {
                    infoSection.style.display = '';
                }
            }

            if (perguntasSection) {
                const gruposVisiveis = Array.from(perguntasSection.querySelectorAll('.faq-topico-grupo')).some(g => g.style.display !== 'none');
                
                if (!gruposVisiveis && !buscaVazia) {
                    perguntasSection.style.display = 'none';
                } else {
                    perguntasSection.style.display = '';
                }
            }

            // 5º Passo: Exibir ou ocultar aviso de "Não encontrado"
            if (alertaSemResultado) {
                if (totalVisiveis === 0 && !buscaVazia) {
                    alertaSemResultado.style.display = 'block';
                } else {
                    alertaSemResultado.style.display = 'none';
                }
            }
        });
    }

    // ==========================================
    // 3. SISTEMA DE COPIAR TEXTOS EM 1-CLIQUE (PÁGINA DE CONTATO)
    // ==========================================
    const elementosCopiar = document.querySelectorAll('.copiar-texto');
    
    // O "if" garante que o recurso só rode se existirem botões/elementos de cópia na página
    if (elementosCopiar.length > 0) {
        
        // Cria a caixinha preta de notificação (Toast) dinamicamente se ela não existir
        let toast = document.getElementById('toast-aviso');
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast-aviso";
            document.body.appendChild(toast);
        }

        elementosCopiar.forEach(elemento => {
            elemento.addEventListener('click', () => {
                const textoParaCopiar = elemento.getAttribute('data-copiar');
                
                if (textoParaCopiar) {
                    // Copia o texto configurado direto para a área de transferência do usuário
                    navigator.clipboard.writeText(textoParaCopiar).then(() => {
                        toast.textContent = `"${textoParaCopiar}" copiado com sucesso!`;
                        toast.classList.add("mostrar");
                        
                        // Faz o balãozinho sumir após 3 segundos
                        setTimeout(() => { 
                            toast.classList.remove("mostrar"); 
                        }, 3000);
                    }).catch(err => {
                        console.error("Erro crítico ao tentar copiar o texto: ", err);
                    });
                }
            });
        });
    }
});