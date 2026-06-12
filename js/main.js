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
    
    // Убираем подсветку с предыдущих элементов
    document.querySelectorAll('.target-highlighted').forEach(el => {
        el.classList.remove('target-highlighted');
    });

    const target = document.getElementById(id);
    if (!target) return;

    // "Сбрасываем" класс, чтобы анимация сработала при повторном клике по тому же якорю
    target.classList.remove('target-highlighted');
    void target.offsetWidth; // Хак для перезапуска CSS-анимации
    
    target.classList.add('target-highlighted');
    
    // Удаляем класс после завершения анимации (через 2 сек)
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
        
        // Плавный скролл до элемента с учетом высоты шапки
        const headerH = (document.querySelector('header') || { offsetHeight: 80 }).offsetHeight + 40;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top: top, behavior: 'smooth' });
        
        // Включаем красивую подсветку
        window.highlightAnchor(hash);
    }, 150); // Небольшая задержка, чтобы страница успела отрисоваться
}

window.addEventListener('load', handleHashOnLoad);
window.addEventListener('hashchange', handleHashOnLoad);

// ======== САЙДБАР: SCROLL SPY ========
(function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Собираем все секции и entries, у которых есть id
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

            // Сброс всех активных
            groupLinks.forEach(l => l.classList.remove('active'));
            itemLinks.forEach(l => l.classList.remove('active'));

            // Найдём текущий entry
            let currentEntry = null;
            for (let i = entries.length - 1; i >= 0; i--) {
                if (entries[i].getBoundingClientRect().top - headerH <= 8) {
                    currentEntry = entries[i];
                    break;
                }
            }

            // Найдём текущую секцию
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
                // Подсветим родительскую группу
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

    // Клик по ссылке сайдбара
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
        // На мобиле — закрыть сайдбар
        closeSidebar();
    });
})();

// Кнопка Наверх
const scrollTopBtn = document.getElementById('scroll-top-btn');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        // Показываем кнопку, если проскроллили больше 300px
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

// fallback если closeSidebar вызван до инита бургера
if (typeof window.closeSidebar === 'undefined') window.closeSidebar = function() {};


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

    // Умная функция обрезки HTML-текста по количеству слов (не ломает теги)
    function truncateHTMLByWords(htmlStr, maxWords) {
        const div = document.createElement('div');
        div.innerHTML = htmlStr;
        let wordCount = 0;
        let truncated = false;

        function traverse(node) {
            if (truncated) {
                node.remove(); // Удаляем все узлы, которые идут после обрезки
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

            // ЗАКРЫТИЕ ПО ПОВТОРНОМУ КЛИКУ НА ТУ ЖЕ ССЫЛКУ
            if (tooltip.classList.contains('visible') && tooltip.dataset.activeId === targetId) {
                tooltip.classList.remove('visible');
                tooltip.dataset.activeId = '';
                return;
            }
            // Запоминаем, какая ссылка сейчас активна
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

                // ОБРЕЗКА ТЕКСТА (Здесь настраивается лимит слов: сейчас 30)
                const MAX_WORDS = 30;
                const truncatedResult = truncateHTMLByWords(bodyHTML, MAX_WORDS);
                bodyHTML = truncatedResult.html;

                // Добавляем ссылку "Читать полностью", если текст обрезался
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
            tooltip.dataset.activeId = ''; // Сбрасываем ID при клике в "молоко"
        }
    });
});