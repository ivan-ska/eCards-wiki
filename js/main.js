// ======== АККОРДЕОН ========
function toggleAccordion(headerElement) {
    const accordion = headerElement.parentElement;
    const body = accordion.querySelector('.accordion-body');
    const content = accordion.querySelector('.accordion-content');

    if (accordion.classList.contains('active')) {
        accordion.classList.remove('active');
        body.style.maxHeight = null;
    } else {
        accordion.classList.add('active');
        body.style.maxHeight = content.scrollHeight + 'px';
    }
}

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
    if (event) event.stopPropagation();
    const baseUrl = window.location.href.split('#')[0];
    const fullUrl = baseUrl + '#' + id;
    navigator.clipboard.writeText(fullUrl).then(() => {
        showToast('Ссылка скопирована!');
        history.pushState(null, null, '#' + id);
    });
}

// ======== ОБРАБОТКА ЯКОРЯ (ХЭША) ========
// Открывает нужный аккордеон и скроллит к нему при загрузке страницы с якорем
function handleHashOnLoad() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    setTimeout(() => {
        const target = document.getElementById(hash);
        if (!target) return;

        // Если это аккордеон — открываем его
        if (target.classList.contains('accordion')) {
            const body = target.querySelector('.accordion-body');
            const content = target.querySelector('.accordion-content');
            target.classList.add('active');
            if (body && content) {
                body.style.maxHeight = content.scrollHeight + 'px';
            }
        }

        // Скролл к элементу
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Лёгкая подсветка
        target.style.transition = 'box-shadow 0.5s';
        target.style.boxShadow = '0 0 0 2px var(--primary-color)';
        setTimeout(() => { target.style.boxShadow = ''; }, 2000);
    }, 150);
}

// Запускаем при загрузке и при навигации назад/вперёд
window.addEventListener('load', handleHashOnLoad);
window.addEventListener('hashchange', handleHashOnLoad);
