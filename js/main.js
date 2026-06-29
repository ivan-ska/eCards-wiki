// ======== TOAST ========
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message || 'Ссылка скопирована!';
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

// ======== КОПИРОВАНИЕ ССЫЛКИ ========
function copyLink(id, event) {
    if (event) { event.preventDefault(); event.stopPropagation(); }
    const baseUrl = window.location.href.split('#')[0];
    const fullUrl = baseUrl + '#' + id;
    navigator.clipboard.writeText(fullUrl).then(() => {
        showToast('Ссылка скопирована!');
        history.pushState(null, null, '#' + id);
    });
}

// ======== ОБРАБОТКА ЯКОРЯ (ХЭША) И ПОДСВЕТКА ========
window.highlightAnchor = function(id) {
    if (!id) return;
    
    document.querySelectorAll('.target-highlighted').forEach(el => {
        el.classList.remove('target-highlighted');
    });

    const target = document.getElementById(id);
    if (!target) return;

    target.classList.remove('target-highlighted');
    void target.offsetWidth;
    
    target.classList.add('target-highlighted');
    
    setTimeout(() => {
        target.classList.remove('target-highlighted');
    }, 2000);
};

function handleHashOnLoad() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;
    
    setTimeout(() => {
        const target = document.getElementById(hash);
        if (!target) return;
        
        const headerH = (document.querySelector('header') || { offsetHeight: 80 }).offsetHeight + 40;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: top, behavior: 'smooth' });
        
        window.highlightAnchor(hash);
    }, 150);
}

window.addEventListener('load', handleHashOnLoad);
window.addEventListener('hashchange', handleHashOnLoad);

// ======== САЙДБАР: SCROLL SPY ========
(function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const sections = Array.from(document.querySelectorAll('.theme-section[id]'));
    const entries  = Array.from(document.querySelectorAll('.entry[id]'));
    const allAnchors = [...sections, ...entries];

    const groupLinks = Array.from(sidebar.querySelectorAll('.sidebar-group-link[data-id]'));
    const itemLinks  = Array.from(sidebar.querySelectorAll('.sidebar-item-link[data-id]'));

    function setActive(id) {
        groupLinks.forEach(l => l.classList.toggle('active', l.dataset.id === id));
        itemLinks.forEach(l => l.classList.toggle('active', l.dataset.id === id));
    }

    function setGroupActive(id) {
        groupLinks.forEach(l => {
            if (l.dataset.id === id) l.classList.add('active');
        });
    }

    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const headerH = (document.querySelector('header') || {offsetHeight: 80}).offsetHeight + 16;

            groupLinks.forEach(l => l.classList.remove('active'));
            itemLinks.forEach(l => l.classList.remove('active'));

            let currentEntry = null;
            for (let i = entries.length - 1; i >= 0; i--) {
                if (entries[i].getBoundingClientRect().top - headerH <= 8) {
                    currentEntry = entries[i];
                    break;
                }
            }

            let currentSection = null;
            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i].getBoundingClientRect().top - headerH <= 8) {
                    currentSection = sections[i];
                    break;
                }
            }

            if (currentEntry) {
                const entryLink = itemLinks.find(l => l.dataset.id === currentEntry.id);
                if (entryLink) entryLink.classList.add('active');
                const parentSection = currentEntry.closest('.theme-section');
                if (parentSection) {
                    const gl = groupLinks.find(l => l.dataset.id === parentSection.id);
                    if (gl) gl.classList.add('active');
                }
            } else if (currentSection) {
                const gl = groupLinks.find(l => l.dataset.id === currentSection.id);
                if (gl) gl.classList.add('active');
            }

            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    sidebar.addEventListener('click', function(e) {
        const link = e.target.closest('[data-id]');
        if (!link) return;
        e.preventDefault();
        const id = link.dataset.id;
        const target = document.getElementById(id);
        if (target) {
            const headerH = (document.querySelector('header') || {offsetHeight: 80}).offsetHeight + 8;
            const top = target.getBoundingClientRect().top + window.scrollY - headerH;
            window.scrollTo({ top, behavior: 'smooth' });
            history.pushState(null, null, '#' + id);
        }
        closeSidebar();
    });
})();

const scrollTopBtn = document.getElementById('scroll-top-btn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ======== БУРГЕР ========
(function initBurger() {
    const burger  = document.getElementById('sidebar-burger');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!burger || !sidebar) return;

    function openSidebar() {
        sidebar.classList.add('open');
        burger.classList.add('open');
        if (overlay) overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    window.closeSidebar = function() {
        sidebar.classList.remove('open');
        burger.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => {
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    if (overlay) overlay.addEventListener('click', closeSidebar);
})();

if (typeof window.closeSidebar === 'undefined') window.closeSidebar = function() {};

// ======== ТИПОГРАФ: ИСПРАВЛЕНИЕ ВИСЯЧИХ ПРЕДЛОГОВ ========
window.runTypograph = function(rootNode) {
    function traverse(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.nodeValue;
            let prevText = "";
            while (text !== prevText) {
                prevText = text;
                text = text.replace(/(^|[\s\xA0(«"'\-—])([А-Яа-яЁёA-Za-z0-9]{1,2}|без|для|под|над|при|про|или|как|что|это|где|кто|там|тут)\s+/gi, '$1$2\u00A0');
            }
            node.nodeValue = text;
        } 
        else if (node.nodeType === Node.ELEMENT_NODE) {
            const tag = node.tagName.toLowerCase();
            if (['script', 'style', 'pre', 'code', 'svg'].includes(tag)) return;
            node.childNodes.forEach(child => traverse(child));
        }
    }
    traverse(rootNode);
};

document.addEventListener('DOMContentLoaded', () => {
    window.runTypograph(document.body);
});

// ======== УМНЫЕ ТУЛТИПЫ ДЛЯ ТЕРМИНОВ ========
document.addEventListener('DOMContentLoaded', () => {
    const termLinks = document.querySelectorAll('a[href^="terminology.html#"]');
    if (termLinks.length === 0) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'term-tooltip';
    document.body.appendChild(tooltip);

    let terminologyDoc = null; 
    let fetchPromise = null;   

    async function getTerminologyDoc() {
        if (terminologyDoc) return terminologyDoc; 
        if (!fetchPromise) {
            fetchPromise = fetch('terminology.html')
                .then(res => res.text())
                .then(html => {
                    const parser = new DOMParser();
                    terminologyDoc = parser.parseFromString(html, 'text/html');
                    return terminologyDoc;
                })
                .catch(err => {
                    console.error('Ошибка загрузки терминов:', err);
                    return null;
                });
        }
        return fetchPromise;
    }

    function truncateHTMLByWords(htmlStr, maxWords) {
        const div = document.createElement('div');
        div.innerHTML = htmlStr;
        let wordCount = 0;
        let truncated = false;

        function traverse(node) {
            if (truncated) {
                node.remove();
                return;
            }
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const words = text.match(/\S+/g) || [];
                
                if (wordCount + words.length > maxWords) {
                    const allowedCount = maxWords - wordCount;
                    let regex = /\S+/g;
                    for (let i = 0; i < allowedCount; i++) {
                        regex.exec(text);
                    }
                    const lastIndex = regex.lastIndex;
                    node.textContent = text.substring(0, lastIndex) + '...';
                    truncated = true;
                } else {
                    wordCount += words.length;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const children = Array.from(node.childNodes);
                for (let child of children) {
                    traverse(child);
                }
            }
        }
        
        Array.from(div.childNodes).forEach(traverse);
        return { html: div.innerHTML, isTruncated: truncated };
    }

    termLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault(); 
            
            const targetHref = link.getAttribute('href');
            const targetId = targetHref.split('#')[1];
            if (!targetId) return;

            if (tooltip.classList.contains('visible') && tooltip.dataset.activeId === targetId) {
                tooltip.classList.remove('visible');
                tooltip.dataset.activeId = '';
                return;
            }
            tooltip.dataset.activeId = targetId;

            const rect = link.getBoundingClientRect();
            let leftPos = rect.left + window.scrollX - (340 / 2) + (rect.width / 2);
            if (leftPos < 20) leftPos = 20;
            if (leftPos + 340 > window.innerWidth - 20) leftPos = window.innerWidth - 340 - 20;

            tooltip.style.left = `${leftPos}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 16}px`;
            
            tooltip.innerHTML = `<div class="term-tooltip-loading"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg></div>`;
            tooltip.classList.add('visible');

            const doc = await getTerminologyDoc();
            if (!doc) {
                tooltip.innerHTML = '<div class="term-tooltip-body">Не удалось загрузить определение.</div>';
                return;
            }

            const termEntry = doc.getElementById(targetId);
            if (termEntry) {
                const titleObj = termEntry.querySelector('.entry-header h3');
                const bodyObj = termEntry.querySelector('.entry-body');
                
                const titleText = titleObj ? titleObj.textContent : 'Термин';
                let bodyHTML = bodyObj ? bodyObj.innerHTML : '';

                const MAX_WORDS = 30;
                const truncatedResult = truncateHTMLByWords(bodyHTML, MAX_WORDS);
                bodyHTML = truncatedResult.html;

                let readMoreLink = '';
                if (truncatedResult.isTruncated) {
                    readMoreLink = `<a href="${targetHref}" target="_blank" class="term-read-more">Читать полностью</a>`;
                }

                tooltip.innerHTML = `
                    <div class="term-tooltip-title">
                        <a href="${targetHref}" target="_blank" class="term-tooltip-title-link">${titleText}</a>
                        <button class="term-tooltip-close" type="button" aria-label="Закрыть">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.05176 3.05371L12.9513 12.9532" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                                <path d="M12.9512 3.04688L3.05168 12.9464" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <div class="term-tooltip-body">
                        ${bodyHTML}
                        ${readMoreLink}
                    </div>
                `;

                if (typeof window.runTypograph === 'function') {
                    window.runTypograph(tooltip);
                }

                const closeBtn = tooltip.querySelector('.term-tooltip-close');
                closeBtn.addEventListener('click', () => {
                    tooltip.classList.remove('visible');
                    tooltip.dataset.activeId = '';
                });

            } else {
                 tooltip.innerHTML = '<div class="term-tooltip-body">Определение не найдено.</div>';
            }
        });
    });

    document.addEventListener('click', (e) => {
        const isClickInsideTooltip = tooltip.contains(e.target);
        const isClickOnTermLink = e.target.closest('a[href^="terminology.html#"]');
        
        if (!isClickInsideTooltip && !isClickOnTermLink) {
            tooltip.classList.remove('visible');
            tooltip.dataset.activeId = '';
        }
    });
});


// ======== МОДАЛКА ДЛЯ ПРОСМОТРА КАРТИНОК ========
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <button class="image-modal-close" aria-label="Закрыть">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
        <img class="image-modal-content" src="" alt="Enlarged image">
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('.image-modal-content');
    const closeBtn = modal.querySelector('.image-modal-close');

    const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = ''
        
        setTimeout(() => { 
            modalImg.src = ''; 
            modal.classList.remove('is-narrow'); 
        }, 300); 
    };


    const images = document.querySelectorAll('.page-content img, .img-row img, .hero img');
    
    images.forEach(img => {
        if (img.tagName.toLowerCase() === 'svg' || img.classList.contains('hero-icon-desktop') || img.classList.contains('hero-icon-mobile')) return;

        img.addEventListener('click', () => {
            modalImg.src = img.src;
            
            if (img.classList.contains('img-narrow')) {
                modal.classList.add('is-narrow');
            } else {
                modal.classList.remove('is-narrow');
            }
            
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
});