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
                message: `Salvar missa - ${new Date().toLocaleDateString('pt-BR')}`,
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
            console.error("Erro ao salvar no GitHub:", error);
            throw error;
        }
    }

    async getFile(filename) {
        try {
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

            return await response.json();
        } catch (error) {
            console.error("Erro ao obter arquivo do GitHub:", error);
            throw error;
        }
    }

    async getTree(tree_sha) {
        try {
            const response = await fetch(
                `${this.config.apiUrl}/repos/${this.config.username}/${this.config.repo}/git/trees/${tree_sha}?recursive=1`,
                {
                    headers: this.headers
                }
            );

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Erro ao obter árvore do GitHub:", error);
            throw error;
        }
    }

    async getLatestCommitSha() {
        try {
            const response = await fetch(
                `${this.config.apiUrl}/repos/${this.config.username}/${this.config.repo}/branches/main`,
                {
                    headers: this.headers
                }
            );

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const branch = await response.json();
            return branch.commit.sha;
        } catch (error) {
            console.error("Erro ao obter o SHA do último commit:", error);
            throw error;
        }
    }

    async createTree(base_tree_sha, new_tree_items) {
        try {
            const response = await fetch(
                `${this.config.apiUrl}/repos/${this.config.username}/${this.config.repo}/git/trees`,
                {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify({
                        base_tree: base_tree_sha,
                        tree: new_tree_items
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Erro ao criar árvore:", error);
            throw error;
        }
    }

    async createCommit(tree_sha, parent_sha, message) {
        try {
            const response = await fetch(
                `${this.config.apiUrl}/repos/${this.config.username}/${this.config.repo}/git/commits`,
                {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify({
                        message: message,
                        tree: tree_sha,
                        parents: [parent_sha]
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Erro ao criar commit:", error);
            throw error;
        }
    }

    async updateBranch(commit_sha) {
        try {
            const response = await fetch(
                `${this.config.apiUrl}/repos/${this.config.username}/${this.config.repo}/git/refs/heads/main`,
                {
                    method: 'PATCH',
                    headers: this.headers,
                    body: JSON.stringify({
                        sha: commit_sha
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Erro ao atualizar branch:", error);
            throw error;
        }
    }
}

const github = new GitHubIntegration(GITHUB_CONFIG);

async function fetchGitHubContent(path) {
    try {
        const response = await fetch(
            `${GITHUB_CONFIG.apiUrl}/repos/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/contents/${path}`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_CONFIG.token}`,
                    'Accept': 'application/vnd.github.v3.raw'
                }
            }
        );

        if (response.status === 404) {
            return null; // Arquivo não encontrado
        }

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        console.error("Erro ao buscar conteúdo do GitHub:", error);
        throw error;
    }
}

async function updateGitHubContent(path, content, message) {
    try {
        const existingFile = await github.getFile(path);
        const parentSha = await github.getLatestCommitSha();

        const newTreeItem = {
            path: path,
            mode: '100644',
            type: 'blob',
            content: atob(content) // O conteúdo já está em base64, então decodificamos para o blob
        };

        let treeItems = [newTreeItem];

        if (existingFile) {
            newTreeItem.sha = existingFile.sha; // Se o arquivo existe, use o SHA existente
        }

        const newTree = await github.createTree(parentSha, treeItems);
        const newCommit = await github.createCommit(newTree.sha, parentSha, message);
        await github.updateBranch(newCommit.sha);

        return newCommit;
    } catch (error) {
        console.error("Erro ao atualizar conteúdo no GitHub:", error);
        throw error;
    }
}


