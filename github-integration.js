// Configuração do GitHub
const GITHUB_CONFIG = {
    username: 'iramalho1980',
    repo: 'missa',
    token: '', // Token será configurado via variável de ambiente ou input do usuário
    apiUrl: 'https://api.github.com'
};

// Classe para gerenciar integração com GitHub
class GitHubIntegration {
    constructor(config) {
        this.config = config;
        this.headers = {
            'Authorization': `token ${config.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };
    }

    // Salvar dados da missa no GitHub
    async saveMissaToGitHub(missaData) {
        try {
            // Se não há token, salva apenas localmente
            if (!this.config.token) {
                console.log("Token do GitHub não configurado. Salvando apenas localmente.");
                return { message: "Salvo localmente" };
            }

            const filename = `missas_salvas/missa_${new Date().toISOString().split('T')[0]}_${Date.now()}.json`;
            const content = btoa(JSON.stringify(missaData, null, 2));

            // Verificar se o arquivo já existe
            const existingFile = await this.getFile(filename);

            const data = {
                message: `Salvar missa - ${new Date().toLocaleString('pt-BR')}`,
                content: content,
                branch: 'main'
            };

            if (existingFile) {
                data.sha = existingFile.sha;
            }

            const response = await fetch(
                `${this.config.apiUrl}/repos/${this.config.username}/${this.config.repo}/contents/${filename}`,
                {
                    method: 'PUT',
                    headers: this.headers,
                    body: JSON.stringify(data)
                }
            );

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao salvar no GitHub:', error);
            throw error;
        }
    }

    // Obter arquivo do GitHub
    async getFile(filename) {
        try {
            if (!this.config.token) {
                return null;
            }

            const response = await fetch(
                `${this.config.apiUrl}/repos/${this.config.username}/${this.config.repo}/contents/${filename}`,
                {
                    headers: this.headers
                }
            );

            if (response.status === 404) {
                return null; // Arquivo não encontrado
            }

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data; // Retorna os dados do arquivo, incluindo SHA
        } catch (error) {
            console.error('Erro ao obter arquivo do GitHub:', error);
            throw error;
        }
    }

    // Listar arquivos de um diretório
    async listFiles(path = 'missas_salvas') {
        try {
            if (!this.config.token) {
                return [];
            }

            const response = await fetch(
                `${this.config.apiUrl}/repos/${this.config.username}/${this.config.repo}/contents/${path}`,
                {
                    headers: this.headers
                }
            );

            if (response.status === 404) {
                return []; // Diretório não encontrado
            }

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const data = await response.json();
            return data.filter(file => file.type === 'file' && file.name.endsWith('.json'));
        } catch (error) {
            console.error('Erro ao listar arquivos do GitHub:', error);
            return [];
        }
    }

    // Carregar missas salvas do GitHub
    async loadSavedMissasFromGitHub() {
        try {
            const files = await this.listFiles('missas_salvas');
            const missas = [];

            for (const file of files) {
                try {
                    const fileData = await this.getFile(file.path);
                    if (fileData && fileData.content) {
                        const decodedContent = atob(fileData.content);
                        const missaData = JSON.parse(decodedContent);
                        missas.push(missaData);
                    }
                } catch (error) {
                    console.error(`Erro ao carregar arquivo ${file.name}:`, error);
                }
            }

            return missas.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error('Erro ao carregar missas do GitHub:', error);
            return [];
        }
    }
}

// Instanciar a classe de integração com o GitHub
const github = new GitHubIntegration(GITHUB_CONFIG);

// Função global para salvar missa (será chamada pelo script.js)
async function saveMissaToGitHub(missaData) {
    try {
        const result = await github.saveMissaToGitHub(missaData);
        console.log('Missa salva no GitHub:', result);
        return result;
    } catch (error) {
        console.error('Falha ao salvar a missa no GitHub:', error);
        throw error;
    }
}

// Função global para carregar missas do GitHub
async function loadMissasFromGitHub() {
    try {
        const missas = await github.loadSavedMissasFromGitHub();
        console.log('Missas carregadas do GitHub:', missas);
        return missas;
    } catch (error) {
        console.error('Falha ao carregar missas do GitHub:', error);
        return [];
    }
}

// Configurar token do GitHub se disponível
function setGitHubToken(token) {
    GITHUB_CONFIG.token = token;
    github.config.token = token;
    github.headers['Authorization'] = `token ${token}`;
}

// Tentar obter token do localStorage
const savedToken = localStorage.getItem('github_token');
if (savedToken) {
    setGitHubToken(savedToken);
}

// Função para configurar token via interface
function promptForGitHubToken() {
    const token = prompt('Digite seu token do GitHub para habilitar o salvamento na nuvem (opcional):');
    if (token) {
        setGitHubToken(token);
        localStorage.setItem('github_token', token);
        alert('Token configurado com sucesso!');
    }
}

// Adicionar botão para configurar token (opcional)
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há token configurado
    if (!GITHUB_CONFIG.token) {
        console.log('Token do GitHub não configurado. Salvamento será apenas local.');
    }
});

