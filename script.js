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
            "vem_louvar.pdf",
            "creio.jpeg",
            "tu_es_a_razao_da_jornada_novo.jpeg"
        ],
        "Ato Penitencial": [
            "conheco_um_coracao.pdf",
            "coracoes_arrependidos.pdf",
            "kyrie_eleison_jmj.pdf",
            "pelos_pecados_senhor_piedade_de_nos.pdf",
            "perdao_senhor.pdf",
            "renovame.pdf",
            "senhor_que_viestes_salvar_kirie_elleisson.pdf",
            "senhor_tende_piedade_de_nos.pdf",
            "senhor_tende_piedade_perdoai_nossa_culpa.pdf",
            "senhor_que_viestes_salvar_novo.jpeg"
        ],
        "Gloria": [
            "a_ele_seja_a_gloria.pdf",
            "gloria_a_deus_nas_alturas.pdf",
            "gloria_a_deus_nas_alturas_rock_balada.pdf",
            "gloria_ao_pai_criador.pdf",
            "gloria_gloria_aleluia.pdf",
            "gloria_in_excelsis_deo.pdf",
            "gloria_pra_sempre.pdf",
            "gloria_a_deus_nas_alturas_novo.jpeg"
        ],
        "Aclamação ao Evangelho": [
            "aleluia_a_minha_alma_abrir.pdf",
            "aleluia_quando_estamos_unidos.pdf",
            "aleluia_novo.jpeg"
        ],
        "Ofertorio": [
            "a_nos_chegou_a_alegria.pdf",
            "bendito_sejas_senhor.pdf",
            "bendito_sejas_senhor_pelo_vinho.pdf",
            "bendito_sejas_senhor_novo.jpeg"
        ],
        "Santo": [
            "santo_e_o_senhor.pdf",
            "santo_santo_santo.pdf",
            "santo_novo.jpeg"
        ],
        "Cordeiro": [
            "cordeiro_de_deus.pdf",
            "cordeiro_de_deus_novo.jpeg"
        ],
        "Comunhão": [
            "a_mesa_esta_pronta.pdf",
            "a_partilha.pdf",
            "a_ti_meu_deus.pdf",
            "ao_cordeiro_de_deus.pdf",
            "bendito_seja_deus.pdf",
            "bom_pastor_novo.jpeg"
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
            "gratidao.pdf",
            "grande_e_o_senhor.pdf",
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
            "o_senhor_e_meu_pastor.pdf",
            "olhar_de_cristo.pdf",
            "para_sempre_te_adorarei.pdf",
            "passos_de_fe.pdf",
            "paz_na_alma.pdf",
            "pe_na_estrada.pdf",
            "perdao_senhor_novo.jpeg",
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
            "voz_do_ceu.pdf",
            "o_ceu_se_abre.pdf",
            "o_ceu_se_abre_novo.jpeg"
        ],
        "Final": [
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
            "viver_o_amor.pdf",
            "a_bencao_novo.jpeg"
        ]
    };

    for (const category in canticosData) {
        canticosData[category].sort((a, b) => a.localeCompare(b));
    }

    renderCanticos(canticosData);
}

function renderCanticos(data) {
    canticosList.innerHTML = "";
    for (const category in data) {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("cantico-category");

        const categoryTitle = document.createElement("h3");
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        const categoryList = document.createElement("div");
        categoryList.classList.add("grid-container");

        data[category].forEach(cantico => {
            const canticoItem = document.createElement("div");
            canticoItem.classList.add("cantico-item");
            canticoItem.setAttribute("draggable", true);
            canticoItem.dataset.filename = cantico;

            const canticoTitle = document.createElement("h4");
            canticoTitle.textContent = cantico.replace(/_|-/g, " ").replace(/\.pdf|\.jpeg|\.jpg/g, "");
            canticoItem.appendChild(canticoTitle);

            const canticoType = document.createElement("p");
            canticoType.textContent = category;
            canticoItem.appendChild(canticoType);

            canticoItem.addEventListener("click", () => openPdf(cantico));
            canticoItem.addEventListener("dragstart", dragStart);
            canticoItem.addEventListener("dragend", dragEnd);

            categoryList.appendChild(canticoItem);
        });
        categoryDiv.appendChild(categoryList);
        canticosList.appendChild(categoryDiv);
    }
}

function setupEventListeners() {
    missaOrderElement.addEventListener("dragover", dragOver);
    missaOrderElement.addEventListener("drop", drop);
    missaOrderElement.addEventListener("dragleave", dragLeave);

    saveMissaBtn.addEventListener("click", saveMissaOrder);
    closeButton.addEventListener("click", closePopup);

    // Event listener para o campo de pesquisa
    searchInput.addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        filterAndShowCanticos(searchTerm);
    });

    // Event listeners para o popup de pesquisa
    searchResultsCloseBtn.addEventListener("click", closeSearchResultsPopup);

    // Event listeners para carregar missas salvas
    loadMissaBtn.addEventListener("click", showLoadMissaPopup);
    clearMissaBtn.addEventListener("click", clearMissa);
    loadMissaCloseBtn.addEventListener("click", closeLoadMissaPopup);
}

let draggedItem = null;

function dragStart(e) {
    draggedItem = this;
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
    e.dataTransfer.setData("text/plain", this.dataset.filename);
}

function dragEnd() {
    setTimeout(() => {
        draggedItem.style.display = "block";
        draggedItem = null;
    }, 0);
}

function dragOver(e) {
    e.preventDefault();
    missaOrderElement.classList.add("drag-over");
}

function dragLeave() {
    missaOrderElement.classList.remove("drag-over");
}

function drop(e) {
    e.preventDefault();
    missaOrderElement.classList.remove("drag-over");
    const filename = e.dataTransfer.getData("text/plain");
    addCanticoToMissa(filename);
}

function addCanticoToMissa(filename) {
    const canticoItem = createCanticoElement(filename);
    missaOrderElement.appendChild(canticoItem);
    missaOrder.push(filename);
    saveMissaOrderToLocalStorage();
}

function createCanticoElement(filename) {
    const canticoItem = document.createElement("div");
    canticoItem.classList.add("cantico-item");
    canticoItem.setAttribute("draggable", true);
    canticoItem.dataset.filename = filename;

    const canticoTitle = document.createElement("h4");
    canticoTitle.textContent = filename.replace(/_|-/g, " ").replace(/\.pdf|\.jpeg|\.jpg/g, "");
    canticoItem.appendChild(canticoTitle);

    const canticoType = document.createElement("p");
    // Tenta encontrar a categoria do cântico
    let categoryFound = "Desconhecido";
    for (const category in canticosData) {
        if (canticosData[category].includes(filename)) {
            categoryFound = category;
            break;
        }
    }
    canticoType.textContent = categoryFound;
    canticoItem.appendChild(canticoType);

    canticoItem.addEventListener("click", () => openPdf(filename));
    canticoItem.addEventListener("dragstart", dragStart);
    canticoItem.addEventListener("dragend", dragEnd);

    return canticoItem;
}

function openPdf(filename) {
    const filePath = `letras/${filename}`;
    const fileExtension = filename.split(".").pop().toLowerCase();

    if (fileExtension === "pdf" || fileExtension === "jpeg" || fileExtension === "jpg") {
        pdfViewer.src = filePath;
        popup.style.display = "flex";
    } else {
        alert("Formato de arquivo não suportado para visualização: " + fileExtension);
    }
}

function closePopup() {
    popup.style.display = "none";
    pdfViewer.src = ""; // Limpa o src para parar qualquer carregamento
}

function saveMissaOrder() {
    if (missaOrder.length === 0) {
        alert("Adicione pelo menos um cântico à missa antes de salvar.");
        return;
    }

    const missaData = {
        date: new Date().toISOString(),
        canticos: missaOrder,
        name: `Missa ${new Date().toLocaleDateString('pt-BR')}`
    };

    // Salvar no localStorage
    saveMissaOrderToLocalStorage();

    // Tentar salvar no GitHub se possível
    if (typeof saveMissaToGitHub === 'function') {
        saveMissaToGitHub(missaData).then(() => {
            alert("Ordem da missa salva com sucesso!");
        }).catch((error) => {
            console.error("Erro ao salvar no GitHub:", error);
            alert("Missa salva localmente. Erro ao salvar no GitHub: " + error.message);
        });
    } else {
        alert("Ordem da missa salva localmente!");
    }
}

function saveMissaOrderToLocalStorage() {
    const missaData = {
        date: new Date().toISOString(),
        canticos: missaOrder,
        name: `Missa ${new Date().toLocaleDateString('pt-BR')}`
    };

    // Salvar a missa atual
    localStorage.setItem("missaOrder", JSON.stringify(missaOrder));

    // Salvar no histórico de missas
    let savedMissas = JSON.parse(localStorage.getItem("savedMissas") || "[]");
    savedMissas.push(missaData);
    
    // Manter apenas as últimas 20 missas
    if (savedMissas.length > 20) {
        savedMissas = savedMissas.slice(-20);
    }
    
    localStorage.setItem("savedMissas", JSON.stringify(savedMissas));
}

function loadSavedMissa() {
    const savedOrder = localStorage.getItem("missaOrder");
    if (savedOrder) {
        missaOrder = JSON.parse(savedOrder);
        renderMissaOrder();
    }
}

function renderMissaOrder() {
    missaOrderElement.innerHTML = ""; // Limpa a lista atual
    missaOrder.forEach(filename => {
        const canticoItem = createCanticoElement(filename);
        missaOrderElement.appendChild(canticoItem);
    });
}

function clearMissa() {
    if (confirm("Tem certeza que deseja limpar a missa atual?")) {
        missaOrder = [];
        missaOrderElement.innerHTML = "";
        localStorage.removeItem("missaOrder");
    }
}

function filterAndShowCanticos(searchTerm) {
    searchResultsList.innerHTML = ""; // Limpa resultados anteriores
    let hasResults = false;

    for (const category in canticosData) {
        canticosData[category].forEach(cantico => {
            const canticoName = cantico.replace(/_|-/g, " ").replace(/\.pdf|\.jpeg|\.jpg/g, "").toLowerCase();
            if (canticoName.includes(searchTerm) && searchTerm !== "") {
                hasResults = true;
                const canticoItem = document.createElement("div");
                canticoItem.classList.add("cantico-item");
                canticoItem.dataset.filename = cantico;

                const canticoTitle = document.createElement("h4");
                canticoTitle.textContent = canticoName;
                canticoItem.appendChild(canticoTitle);

                const canticoType = document.createElement("p");
                canticoType.textContent = category;
                canticoItem.appendChild(canticoType);

                canticoItem.addEventListener("click", () => {
                    addCanticoToMissa(cantico);
                    closeSearchResultsPopup();
                });
                searchResultsList.appendChild(canticoItem);
            }
        });
    }

    if (searchTerm === "") {
        searchResultsPopup.style.display = "none";
    } else if (hasResults) {
        searchResultsPopup.style.display = "flex";
    } else {
        searchResultsPopup.style.display = "flex";
        searchResultsList.innerHTML = "<p style=\"color: #ccc; text-align: center; padding: 20px;\">Nenhum cântico encontrado.</p>";
    }
}

function closeSearchResultsPopup() {
    searchResultsPopup.style.display = "none";
    searchInput.value = ""; // Limpa o campo de pesquisa
}

function showLoadMissaPopup() {
    const savedMissas = JSON.parse(localStorage.getItem("savedMissas") || "[]");
    savedMissasList.innerHTML = "";

    if (savedMissas.length === 0) {
        savedMissasList.innerHTML = "<p style=\"color: #ccc; text-align: center; padding: 20px;\">Nenhuma missa salva encontrada.</p>";
    } else {
        savedMissas.reverse().forEach((missa, index) => {
            const missaItem = document.createElement("div");
            missaItem.classList.add("saved-missa-item");

            const missaTitle = document.createElement("h4");
            missaTitle.textContent = missa.name || `Missa ${index + 1}`;
            missaItem.appendChild(missaTitle);

            const missaDate = document.createElement("p");
            missaDate.textContent = `Data: ${new Date(missa.date).toLocaleString('pt-BR')}`;
            missaItem.appendChild(missaDate);

            const missaCanticos = document.createElement("p");
            missaCanticos.textContent = `Cânticos: ${missa.canticos.length}`;
            missaItem.appendChild(missaCanticos);

            missaItem.addEventListener("click", () => {
                loadMissa(missa);
                closeLoadMissaPopup();
            });

            savedMissasList.appendChild(missaItem);
        });
    }

    loadMissaPopup.style.display = "flex";
}

function loadMissa(missaData) {
    if (confirm("Carregar esta missa irá substituir a missa atual. Continuar?")) {
        missaOrder = [...missaData.canticos];
        renderMissaOrder();
        saveMissaOrderToLocalStorage();
        alert("Missa carregada com sucesso!");
    }
}

function closeLoadMissaPopup() {
    loadMissaPopup.style.display = "none";
}

// Função para integração com GitHub (será chamada se disponível)
async function saveMissaToGitHub(missaData) {
    if (typeof github !== 'undefined' && github.saveMissaToGitHub) {
        return await github.saveMissaToGitHub(missaData);
    } else {
        throw new Error("Integração com GitHub não disponível");
    }
}

