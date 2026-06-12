(function () {
    const container = document.getElementById('sidebar-right');
    if (!container) return;

    const mode = container.dataset.mode || 'h3';
    const ul = document.createElement('ul');
    ul.className = 'sidebar-right-nav';

    if (mode === 'h2') {
        // Ищем все h2 внутри основного контента
        const allH2s = document.querySelectorAll('.page-content h2, .container h2');
        
        if (!allH2s.length) {
            container.style.display = 'none';
            return;
        }

        let addedCount = 0;

        allH2s.forEach(function (h2) {
            // Берем сам h2 (если у него есть id), либо ближайшего родителя с id
            const section = h2.closest('[id]');
            if (!section || section === document.body || section === document.documentElement) return;

            const title = h2.textContent.trim();
            if (!title) return;

            // Защита от дублей: если ссылка на этот ID уже есть в сайдбаре, пропускаем
            if (ul.querySelector(`a[data-id="${section.id}"]`)) return;

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
        // Логика для страниц вроде 01-security (где ищем h3 внутри entry)
        const entries = document.querySelectorAll('.entry[id]');
        
        if (!entries.length) {
            container.style.display = 'none';
            return;
        }

        let addedCount = 0;

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

            addedCount++;
        });

        if (addedCount === 0) {
            container.style.display = 'none';
            return;
        }
    }

    container.appendChild(ul);

    container.addEventListener('click', function (e) {
        const link = e.target.closest('a[data-id]');
        if (!link) return;
        e.preventDefault();
        const target = document.getElementById(link.dataset.id);
        if (target) {
            const headerH = (document.querySelector('header') || { offsetHeight: 80 }).offsetHeight + 40;
            const top = target.getBoundingClientRect().top + window.scrollY - headerH;
            window.scrollTo({ top: top, behavior: 'smooth' });
            history.pushState(null, null, '#' + link.dataset.id);
            
            if (typeof window.highlightAnchor === 'function') {
                window.highlightAnchor(link.dataset.id);
            }
        }
    });

    // Подсветка активного пункта при скролле
    const allLinks = container.querySelectorAll('[data-id]');
    const targets = [];
    allLinks.forEach(link => {
        const targetEl = document.getElementById(link.dataset.id);
        if (targetEl) targets.push(targetEl);
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                allLinks.forEach(function (l) { l.classList.remove('active'); });
                const active = container.querySelector('[data-id="' + entry.target.id + '"]');
                if (active) active.classList.add('active');
            }
        });
    }, { 
        rootMargin: '-15% 0px -70% 0px', 
        threshold: 0 
    });

    targets.forEach(function (t) { observer.observe(t); });
})();