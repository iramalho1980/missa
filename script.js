// Estrutura de dados dos cânticos
let canticosData = {};
let missaOrder = [];

// Elementos DOM
const canticosList = document.getElementById("canticos-list");
const missaOrderElement = document.getElementById("missa-order");
const searchInput = document.getElementById("search-input");
const popup = document.getElementById("popup");
const pdfViewer = document.getElementById("pdf-viewer");
const closeButton = document.querySelector(".close-button");
const saveMissaBtn = document.getElementById("save-missa");

// Novos elementos para o popup de pesquisa
const searchResultsPopup = document.getElementById("search-results-popup");
const searchResultsList = document.getElementById("search-results-list");
const searchResultsCloseBtn = document.getElementById("search-results-close");

// Elementos para carregar missas salvas
const loadMissaBtn = document.getElementById("load-missa");
const clearMissaBtn = document.getElementById("clear-missa");
const loadMissaPopup = document.getElementById("load-missa-popup");
const loadMissaCloseBtn = document.getElementById("load-missa-close");
const savedMissasList = document.getElementById("saved-missas-list");

// Inicialização
document.addEventListener("DOMContentLoaded", function() {
    loadCanticos();
    setupEventListeners();
    loadSavedMissa();
});

// Carregar cânticos da estrutura de pastas
function loadCanticos() {
    // Estrutura reorganizada na sequência da missa do tempo comum
    canticosData = {
        "Entrada": [
            "a_biblia_e_a_palavra_de_deus.pdf",
            "bom_pastor.pdf",
            "coracao_santo.pdf",
            "cristo_ressucitou_aleluia.pdf",
            "deixa_a_luz_da_ceu_entrar.pdf",
            "eis_me_aqui_senhor.pdf",
            "esatremos_aqui_reunidos.pdf",
            "faco_novas_todas_as_coisas.pdf",
            "hosana_hey_hosana_ha.pdf",
            "por_sua_morte.pdf",
            "senhor_quem_entrara.pdf",
            "te_amarei.pdf",
            "toda_biblia_e_comunicacao.pdf",
            "tu_es_a_razao_da_jornada.pdf",
            "tu_es_a_razao_da_jornada_novo.jpeg",
            "vem_louvar.pdf",
            "creio.jpeg"
        ],
        "Ato Penitencial": [
            "conheco_um_coracao.pdf",
            "coracoes_arrependidos.pdf",
            "kyrie_eleison_jmj.pdf",
            "pelos_pecados_senhor_piedade_de_nos.pdf",
            "perdao_senhor.pdf",
            "renovame.pdf",
            "senhor_que_viestes_salvar_kirie_elleisson.pdf",
            "senhor_que_viestes_salvar_novo.pdf",
            "senhor_tende_piedade_de_nos.pdf",
            "senhor_tende_piedade_perdoai_nossa_culpa.pdf"
        ],
        "Gloria": [
            "a_ele_seja_a_gloria.pdf",
            "gloria_a_deus_nas_alturas_novo.pdf",
            "gloria_a_deus_nas_alturas_rock_balada.pdf",
            "gloria_a_deus_nas_alturas.pdf",
            "gloria_ao_pai_criador.pdf",
            "gloria_gloria_aleluia.pdf",
            "gloria_in_excelsis_deo.pdf",
            "gloria_pra_sempre.pdf"
        ],
        "Aclamação ao Evangelho": [
            "aleluia_a_minha_alma_abrir.pdf",
            "aleluia_novo.pdf",
            "aleluia_quando_estamos_unidos.pdf"
        ],
        "Ofertorio": [
            "a_nos_chegou_a_alegria.pdf",
            "bendito_sejas_senhor_novo.pdf",
            "bendito_sejas_senhor_pelo_vinho.pdf",
            "bendito_sejas_senhor.pdf"
        ],
        "Santo": [
            "santo_e_o_senhor.pdf",
            "santo_novo.pdf",
            "santo_santo_santo.pdf"
        ],
        "Cordeiro": [
            "cordeiro_de_deus_novo.pdf",
            "cordeiro_de_deus.pdf"
        ],
        "Comunhão": [
            "a_mesa_esta_pronta.pdf",
            "a_partilha.pdf",
            "a_ti_meu_deus.pdf",
            "ao_cordeiro_de_deus.pdf",
            "bendito_seja_deus.pdf",
            "bom_pastor_novo.pdf"
        ],
        "Pós-Comunhão": [
            "a_escolha.pdf",
            "a_espera.pdf",
            "a_fe_e_o_amor.pdf",
            "a_forca_da_oracao.pdf",
            "a_luz_divina.pdf",
            "a_paz_esteja_contigo.pdf",
            "a_vida_e_um_dom.pdf",
            "a_vitoria_e_nossa.pdf",
            "abracar_e_amar.pdf",
            "adoracao.pdf",
            "alegria_do_senhor.pdf",
            "alma_missionaria.pdf",
            "amigo_fiel.pdf",
            "amor_que_transforma.pdf",
            "anjo_da_guarda.pdf",
            "ao_pe_da_cruz.pdf",
            "apenas_um_toque.pdf",
            "aqui_estou.pdf",
            "as_portas_do_ceu.pdf",
            "basta_querer.pdf",
            "caminho_da_luz.pdf",
            "caminhos_de_deus.pdf",
            "canta_alegremente.pdf",
            "cantar_e_orar.pdf",
            "ceu_azul.pdf",
            "chamado_de_deus.pdf",
            "cheio_de_graca.pdf",
            "com_amor_eterno.pdf",
            "como_e_bom_louvar.pdf",
            "confia_em_deus.pdf",
            "coracao_adorador.pdf",
            "corpo_e_sangue.pdf",
            "cristo_vive.pdf",
            "cura_me_senhor.pdf",
            "de_maos_dadas.pdf",
            "deixa_deus_te_amar.pdf",
            "deus_e_fiel.pdf",
            "deus_e_pai.pdf",
            "deus_esta_aqui.pdf",
            "deus_no_comando.pdf",
            "doce_espirito.pdf",
            "e_preciso_amar.pdf",
            "em_teus_bracos.pdf",
            "ensina_me_a_amar.pdf",
            "es_a_minha_rocha.pdf",
            "espirito_santo.pdf",
            "eu_creio.pdf",
            "eu_te_amo_deus.pdf",
            "face_a_face.pdf",
            "faz_um_milagre_em_mim.pdf",
            "fiel_a_ti.pdf",
            "fonte_de_vida.pdf",
            "grande_e_o_senhor.pdf",
            "gratidao.pdf",
            "incendeia_minha_alma.pdf",
            "jesus_cristo_e_o_senhor.pdf",
            "jesus_fonte_de_vida.pdf",
            "luz_do_mundo.pdf",
            "mais_perto_quero_estar.pdf",
            "meu_bom_pastor.pdf",
            "meu_respirar.pdf",
            "minha_essencia.pdf",
            "minha_liberdade.pdf",
            "no_poder_da_oracao.pdf",
            "o_amor_de_deus.pdf",
            "o_ceu_se_abre_novo.pdf",
            "o_ceu_se_abre.pdf",
            "o_senhor_e_meu_pastor.pdf",
            "olhar_de_cristo.pdf",
            "para_sempre_te_adorarei.pdf",
            "passos_de_fe.pdf",
            "paz_na_alma.pdf",
            "pe_na_estrada.pdf",
            "perdao_senhor_novo.pdf",
            "poder_do_ceu.pdf",
            "pra_te_adorar.pdf",
            "presenca_divina.pdf",
            "quando_deus_age.pdf",
            "que_seja_eterno.pdf",
            "quem_e_deus.pdf",
            "quero_louvar_te.pdf",
            "refugio_e_fortaleza.pdf",
            "rei_da_gloria.pdf",
            "rendicao.pdf",
            "restauracao.pdf",
            "rocha_eterna.pdf",
            "sabedoria_divina.pdf",
            "santo_espirito.pdf",
            "se_calarem_a_voz.pdf",
            "sempre_comigo.pdf",
            "senhor_da_vida.pdf",
            "senhor_dos_senhores.pdf",
            "so_em_ti.pdf",
            "sou_teu_deus.pdf",
            "teu_amor_me_basta.pdf",
            "teu_e_o_reino.pdf",
            "toda_honra_e_gloria.pdf",
            "tudo_posso.pdf",
            "um_novo_tempo.pdf",
            "vamos_celebrar.pdf",
            "vem_espirito_santo.pdf",
            "vida_nova.pdf",
            "vitoria_certa.pdf",
            "voz_do_ceu.pdf"
        ],
        "Final": [
            "a_bencao_novo.pdf",
            "a_bencao.pdf",
            "a_missao.pdf",
            "agradecemos_senhor.pdf",
            "amem_amem_amem.pdf",
            "envia_nos_senhor.pdf",
            "ide_e_pregai.pdf",
            "louvado_seja_o_senhor.pdf",
            "missao_e_vida.pdf",
            "pelos_caminhos.pdf",
            "te_louvamos_senhor.pdf",
            "vamos_com_alegria.pdf",
            "viver_o_amor.pdf"
        ]
    };

    displayCanticos(canticosData);
}

// Exibir cânticos na tela
function displayCanticos(data) {
    canticosList.innerHTML = "";
    for (const section in data) {
        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("cantico-section");
        sectionDiv.innerHTML = `<h3>${section}</h3>`;

        data[section].forEach(cantico => {
            const canticoName = cantico.replace(/_|-/g, " ").replace(/\.pdf|\.jpeg|\.jpg/g, "");
            const canticoDiv = document.createElement("div");
            canticoDiv.classList.add("cantico-item");
            canticoDiv.setAttribute("draggable", "true");
            canticoDiv.dataset.src = cantico;
            canticoDiv.dataset.section = section;
            canticoDiv.innerHTML = `<h4>${canticoName}</h4><p>${section}</p>`;
            canticoDiv.addEventListener("click", () => openPdf(cantico));
            sectionDiv.appendChild(canticoDiv);
        });
        canticosList.appendChild(sectionDiv);
    }
}

// Abrir PDF ou imagem
function openPdf(src) {
    const filePath = `letras/${src}`;
    pdfViewer.src = filePath;
    popup.style.display = "flex";
}

// Configurar event listeners
function setupEventListeners() {
    // Fechar popup
    closeButton.addEventListener("click", () => {
        popup.style.display = "none";
        pdfViewer.src = ""; // Limpa o src para parar qualquer mídia
    });

    // Fechar popup clicando fora
    window.addEventListener("click", (event) => {
        if (event.target == popup) {
            popup.style.display = "none";
            pdfViewer.src = "";
        }
    });

    // Pesquisa de cânticos - nova lógica com popup
    searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase().trim();
        
        if (searchTerm.length > 0) {
            showSearchResults(searchTerm);
        } else {
            searchResultsPopup.style.display = "none";
        }
    });

    // Fechar popup de pesquisa ao pressionar Enter
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const searchTerm = event.target.value.toLowerCase().trim();
            if (searchTerm.length > 0) {
                showSearchResults(searchTerm);
            }
        }
    });

    // Drag and Drop
    let draggedItem = null;

    canticosList.addEventListener("dragstart", (e) => {
        draggedItem = e.target;
        setTimeout(() => {
            e.target.classList.add("hide");
        }, 0);
    });

    canticosList.addEventListener("dragend", (e) => {
        e.target.classList.remove("hide");
        draggedItem = null;
    });

    missaOrderElement.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    missaOrderElement.addEventListener("dragenter", (e) => {
        e.preventDefault();
        missaOrderElement.classList.add("drag-over");
    });

    missaOrderElement.addEventListener("dragleave", () => {
        missaOrderElement.classList.remove("drag-over");
    });

    missaOrderElement.addEventListener("drop", (e) => {
        e.preventDefault();
        missaOrderElement.classList.remove("drag-over");
        if (draggedItem) {
            addCanticoToMissa(draggedItem.dataset.src, draggedItem.dataset.section);
        }
    });

    // Salvar Missa
    saveMissaBtn.addEventListener("click", saveMissa);

    // Carregar Missa
    loadMissaBtn.addEventListener("click", () => {
        loadMissaPopup.style.display = "flex";
        displaySavedMissas();
    });

    loadMissaCloseBtn.addEventListener("click", () => {
        loadMissaPopup.style.display = "none";
    });

    // Limpar Missa
    clearMissaBtn.addEventListener("click", clearMissa);

    // Fechar popup de pesquisa
    searchResultsCloseBtn.addEventListener("click", () => {
        searchResultsPopup.style.display = "none";
    });

    // Fechar popup de pesquisa clicando fora
    window.addEventListener("click", (event) => {
        if (event.target == searchResultsPopup) {
            searchResultsPopup.style.display = "none";
        }
    });

    // Fechar popup de pesquisa com tecla Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (searchResultsPopup.style.display === "flex") {
                searchResultsPopup.style.display = "none";
            }
            if (popup.style.display === "flex") {
                popup.style.display = "none";
                pdfViewer.src = "";
            }
        }
    });
}

// Adicionar cântico à missa
function addCanticoToMissa(src, section) {
    const canticoName = src.replace(/_|-/g, " ").replace(/\.pdf|\.jpeg|\.jpg/g, "");
    const missaItem = document.createElement("div");
    missaItem.classList.add("missa-item");
    missaItem.dataset.src = src;
    missaItem.dataset.section = section;
    missaItem.innerHTML = `<h3>${canticoName}</h3><p>${section}</p><button class="remove-btn">&times;</button>`;
    missaItem.querySelector(".remove-btn").addEventListener("click", () => {
        missaItem.remove();
        updateMissaOrder();
    });
    missaOrderElement.appendChild(missaItem);
    updateMissaOrder();
}

// Atualizar ordem da missa
function updateMissaOrder() {
    missaOrder = [];
    missaOrderElement.querySelectorAll(".missa-item").forEach(item => {
        missaOrder.push({ src: item.dataset.src, section: item.dataset.section });
    });
}

// Salvar missa no localStorage e GitHub
function saveMissa() {
    const missaName = `Missa ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    const missaData = { name: missaName, order: missaOrder };
    let savedMissas = JSON.parse(localStorage.getItem("savedMissas")) || [];
    savedMissas.push(missaData);
    localStorage.setItem("savedMissas", JSON.stringify(savedMissas));
    alert("Missa salva com sucesso!");
    saveMissaToGitHub(missaData);
}

// Carregar missa salva
function loadMissa(missaData) {
    missaOrderElement.innerHTML = "";
    missaOrder = [];
    missaData.order.forEach(item => {
        addCanticoToMissa(item.src, item.section);
    });
    loadMissaPopup.style.display = "none";
}

// Exibir missas salvas no popup
function displaySavedMissas() {
    savedMissasList.innerHTML = "";
    let savedMissas = JSON.parse(localStorage.getItem("savedMissas")) || [];
    if (savedMissas.length === 0) {
        savedMissasList.innerHTML = "<p>Nenhuma missa salva ainda.</p>";
        return;
    }
    savedMissas.forEach((missa, index) => {
        const missaDiv = document.createElement("div");
        missaDiv.innerHTML = `<h4>${missa.name}</h4><p>Cânticos: ${missa.order.length}</p>`;
        missaDiv.addEventListener("click", () => loadMissa(missa));
        savedMissasList.appendChild(missaDiv);
    });
}

// Limpar missa
function clearMissa() {
    missaOrderElement.innerHTML = "";
    missaOrder = [];
    alert("Missa limpa!");
}

// Mostrar resultados de pesquisa no popup
function showSearchResults(searchTerm) {
    searchResultsList.innerHTML = "";
    let hasResults = false;
    
    for (const section in canticosData) {
        canticosData[section].forEach(cantico => {
            const canticoName = cantico.replace(/_|-/g, " ").replace(/\.pdf|\.jpeg|\.jpg/g, "");
            if (canticoName.toLowerCase().includes(searchTerm)) {
                hasResults = true;
                const canticoDiv = document.createElement("div");
                canticoDiv.classList.add("cantico-item");
                canticoDiv.dataset.src = cantico;
                canticoDiv.dataset.section = section;
                canticoDiv.innerHTML = `<h4>${canticoName}</h4><p>${section}</p>`;
                
                // Adicionar evento de clique para adicionar à missa
                canticoDiv.addEventListener("click", () => {
                    addCanticoToMissa(cantico, section);
                    searchResultsPopup.style.display = "none";
                    searchInput.value = ""; // Limpar campo de pesquisa
                });
                
                // Adicionar evento de duplo clique para visualizar
                canticoDiv.addEventListener("dblclick", () => {
                    openPdf(cantico);
                    searchResultsPopup.style.display = "none";
                });
                
                searchResultsList.appendChild(canticoDiv);
            }
        });
    }
    
    if (hasResults) {
        searchResultsPopup.style.display = "flex";
    } else {
        searchResultsList.innerHTML = `
            <div style="text-align: center; color: #ccc; padding: 20px;">
                <p>Nenhum cântico encontrado para "${searchTerm}"</p>
                <p style="font-size: 0.9em;">Tente usar palavras-chave diferentes</p>
            </div>
        `;
        searchResultsPopup.style.display = "flex";
    }
}

// Carregar missas salvas do GitHub
function loadSavedMissa() {
    fetchGitHubContent("saved_missas.json")
        .then(content => {
            if (content) {
                let savedMissas = JSON.parse(atob(content.content));
                localStorage.setItem("savedMissas", JSON.stringify(savedMissas));
                console.log("Missas salvas do GitHub carregadas.");
            }
        })
        .catch(error => console.error("Erro ao carregar missas salvas do GitHub:", error));
}

// Salvar missa no GitHub
function saveMissaToGitHub(missaData) {
    let savedMissas = JSON.parse(localStorage.getItem("savedMissas")) || [];
    const content = btoa(JSON.stringify(savedMissas));
    const message = "Atualiza missas salvas";
    updateGitHubContent("saved_missas.json", content, message)
        .then(() => console.log("Missa salva no GitHub com sucesso!"))
        .catch(error => console.error("Erro ao salvar missa no GitHub:", error));
}


