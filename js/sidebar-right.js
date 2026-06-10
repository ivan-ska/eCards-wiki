(function () {
    const container = document.getElementById('sidebar-right');
    if (!container) return;

    const mode = container.dataset.mode || 'h3';
    const ul = document.createElement('ul');
    ul.className = 'sidebar-right-nav';

    if (mode === 'h2') {
        // Ищем все h2, затем поднимаемся до ближайшего предка с id
        const allH2s = document.querySelectorAll('.page-content h2, .container h2');

        if (!allH2s.length) {
            container.style.display = 'none';
            return;
        }

        let addedCount = 0;

        allH2s.forEach(function (h2) {
            const section = h2.closest('[id]');
            if (!section || section === document.body || section === document.documentElement) return;

            const title = h2.textContent.trim();
            if (!title) return;

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + section.id;
            a.className = 'sidebar-right-section-link';
            a.dataset.id = section.id;
            a.textContent = title;
            li.appendChild(a);
            ul.appendChild(li);

            addedCount++;
        });

        if (addedCount === 0) {
            container.style.display = 'none';
            return;
        }

    } else {
        // h3 режим — ищем .entry[id] и h3 внутри
        const entries = document.querySelectorAll('.entry[id]');

        if (!entries.length) {
            container.style.display = 'none';
            return;
        }

        entries.forEach(function (entry) {
            const h3 = entry.querySelector('h3');
            if (!h3) return;

            const title = h3.textContent.trim();
            if (!title) return;

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + entry.id;
            a.className = 'sidebar-right-item-link';
            a.dataset.id = entry.id;
            a.textContent = title;
            li.appendChild(a);
            ul.appendChild(li);
        });
    }

    container.appendChild(ul);

    // Плавный скролл с отступом под шапку
    container.addEventListener('click', function (e) {
        const link = e.target.closest('a[data-id]');
        if (!link) return;
        e.preventDefault();
        const target = document.getElementById(link.dataset.id);
        if (target) {
            const headerH = (document.querySelector('header') || { offsetHeight: 80 }).offsetHeight + 24;
            const top = target.getBoundingClientRect().top + window.scrollY - headerH;
            window.scrollTo({ top: top, behavior: 'smooth' });
            history.pushState(null, null, '#' + link.dataset.id);
        }
    });

    // ======== ПОДСВЕТКА АКТИВНОГО ПУНКТА ========
    const allLinks = container.querySelectorAll('[data-id]');
    
    // Собираем массив элементов, за которыми нужно следить, прямо из ссылок сайдбара
    const targets = [];
    allLinks.forEach(link => {
        const targetEl = document.getElementById(link.dataset.id);
        if (targetEl) targets.push(targetEl);
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            // Используем чуть более надежное условие для активации
            if (entry.isIntersecting) {
                allLinks.forEach(function (l) { l.classList.remove('active'); });
                const active = container.querySelector('[data-id="' + entry.target.id + '"]');
                if (active) active.classList.add('active');
            }
        });
    }, { 
        // rootMargin изменен, чтобы на главной (где секции могут быть короткими) 
        // активация срабатывала стабильнее
        rootMargin: '-15% 0px -70% 0px', 
        threshold: 0 
    });

    targets.forEach(function (t) { observer.observe(t); });
})();