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

// ======== ОБРАБОТКА ЯКОРЯ (ХЭША) ========
function handleHashOnLoad() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;
    setTimeout(() => {
        const target = document.getElementById(hash);
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.style.transition = 'box-shadow 0.4s';
        target.style.boxShadow = '0 0 0 2px var(--primary-color)';
        setTimeout(() => { target.style.boxShadow = ''; }, 2000);
    }, 150);
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
