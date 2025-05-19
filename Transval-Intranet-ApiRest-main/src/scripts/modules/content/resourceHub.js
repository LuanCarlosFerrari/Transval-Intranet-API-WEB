/**
 * Resource Hub - Página central para acessar todos os recursos após login
 * Versão simplificada com apenas dois cards principais
 */

import { initDownloadsSection, addEventListeners, initializeDownloadsData } from './download.js';
import { initQuickContactsSection, initQuickContactsEvents } from './quickContacts.js';

export function initResourceHub() {
    // Verificar se o usuário está logado
    if (!sessionStorage.getItem('isLoggedIn')) {
        return `
            <div class="resource-container">
                <h2>Acesso Restrito</h2>
                <p>Por favor, faça login para acessar este conteúdo.</p>
            </div>
        `;
    }

    return `
        <div class="resource-container">
            <h2>Portal de Recursos Transval</h2>
            
            <div class="resource-main-grid">
                <div class="resource-card">
                    <div class="resource-icon">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="resource-content">
                        <h3>Treinamentos e Políticas</h3>
                        <p>Acesse documentos de treinamento, procedimentos operacionais, normas de segurança e políticas internas da empresa.</p>
                        <a href="javascript:void(0)" id="trainingPoliciesBtn" class="resource-button">
                            <i class="fas fa-eye"></i> Acessar
                        </a>
                    </div>
                </div>
                
                <div class="resource-card">
                    <div class="resource-icon">
                        <i class="fas fa-address-book"></i>
                    </div>
                    <div class="resource-content">
                        <h3>Contatos</h3>
                        <p>Lista de contatos dos departamentos e colaboradores da Transval para comunicação interna.</p>
                        <a href="javascript:void(0)" id="contactsAccessBtn" class="resource-button">
                            <i class="fas fa-eye"></i> Acessar
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Inicializa os eventos dos botões do ResourceHub
 */
export function initResourceHubEvents() {
    // Botão para acessar treinamentos e políticas
    const trainingPoliciesBtn = document.getElementById('trainingPoliciesBtn');
    if (trainingPoliciesBtn) {
        trainingPoliciesBtn.addEventListener('click', async () => {
            const contentArea = document.querySelector('.content-area');

            // Mostrar indicador de carregamento enquanto carrega os dados
            contentArea.innerHTML = `
                <div class="loading-container">
                    <i class="fas fa-spinner fa-spin fa-3x"></i>
                    <p>Carregando arquivos...</p>
                </div>
            `;

            // Carregar dados e inicializar a visualização de downloads
            try {
                // Agora usando a função importada diretamente
                await initializeDownloadsData();
                
                contentArea.innerHTML = initDownloadsSection();

                // Ativar os event listeners nos elementos carregados
                addEventListeners();
            } catch (error) {
                console.error('Erro ao carregar a seção de downloads:', error);
                contentArea.innerHTML = `
                    <div class="error-container">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Erro ao carregar os arquivos. Por favor, tente novamente.</p>
                    </div>
                `;
            }
        });
    }

    // Botão para acessar contatos
    const contactsAccessBtn = document.getElementById('contactsAccessBtn');
    if (contactsAccessBtn) {
        contactsAccessBtn.addEventListener('click', () => {
            const contentArea = document.querySelector('.content-area');
            contentArea.innerHTML = initQuickContactsSection();
            initQuickContactsEvents();
        });
    }
}
