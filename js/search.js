// ======== ПОИСК ========
// Работает на всех страницах. Использует SEARCH_INDEX из search-data.js.
// При выборе результата переходит на нужную страницу с якорем.

(function () {
    'use strict';

    const MAX_RESULTS = 8;

    // Нормализация: строчные, убираем лишние пробелы
    function normalize(str) {
        return str.toLowerCase().replace(/\s+/g, ' ').trim();
    }

    // Подсветка совпадения в строке
    function highlight(text, query) {
        if (!query) return escapeHtml(text);
        const escaped = escapeHtml(text);
        const escapedQuery = escapeHtml(query).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        return escaped.replace(new RegExp(`(${escapedQuery})`, 'gi'), '<mark>$1</mark>');
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Поиск по индексу
    function search(query) {
        const q = normalize(query);
        if (q.length < 2) return [];

        const words = q.split(' ').filter(w => w.length > 1);
        if (!words.length) return [];

        const scored = SEARCH_INDEX.map(item => {
            const titleNorm = normalize(item.title);
            const keywordsNorm = normalize(item.keywords);
            const sectionNorm = normalize(item.sectionTitle);

            let score = 0;
            for (const word of words) {
                if (titleNorm.includes(word)) score += 10;
                if (keywordsNorm.includes(word)) score += 5;
                if (sectionNorm.includes(word)) score += 2;
            }
            return { item, score };
        });

        return scored
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, MAX_RESULTS)
            .map(r => r.item);
    }

    // Построение URL для результата
    function buildUrl(item) {
        return item.pageUrl + '#' + item.id;
    }

    // Рендер результатов в дропдаун
    function renderResults(results, query, dropdown) {
        dropdown.innerHTML = '';

        if (results.length === 0) {
            dropdown.innerHTML = `<div class="search-empty">Ничего не найдено по запросу «${escapeHtml(query)}»</div>`;
            return;
        }

        const header = document.createElement('div');
        header.className = 'search-dropdown-header';
        header.textContent = `Найдено: ${results.length}`;
        dropdown.appendChild(header);

        results.forEach(item => {
            const a = document.createElement('a');
            a.className = 'search-result-item';
            a.href = buildUrl(item);

            const breadcrumb = document.createElement('div');
            breadcrumb.className = 'search-result-breadcrumb';
            breadcrumb.innerHTML = `<span class="badge">${escapeHtml(item.pageLabel)}</span> ${escapeHtml(item.sectionTitle)}`;

            const title = document.createElement('div');
            title.className = 'search-result-title';
            title.innerHTML = highlight(item.title, query);

            a.appendChild(breadcrumb);
            a.appendChild(title);
            dropdown.appendChild(a);
        });
    }

    // Инициализация поиска
    function initSearch() {
        const input = document.getElementById('search-input');
        const dropdown = document.getElementById('search-dropdown');
        const clearBtn = document.getElementById('search-clear');

        if (!input || !dropdown) return;

        let debounceTimer;

        input.addEventListener('input', function () {
            clearTimeout(debounceTimer);
            const query = this.value.trim();

            // Показываем/скрываем кнопку очистки
            if (clearBtn) {
                clearBtn.classList.toggle('visible', query.length > 0);
            }

            if (query.length < 2) {
                dropdown.classList.remove('open');
                return;
            }

            debounceTimer = setTimeout(() => {
                const results = search(query);
                renderResults(results, query, dropdown);
                dropdown.classList.add('open');
            }, 150);
        });

        // Очистка поиска
        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                input.value = '';
                clearBtn.classList.remove('visible');
                dropdown.classList.remove('open');
                input.focus();
            });
        }

        // Закрытие дропдауна при клике вне
        document.addEventListener('click', function (e) {
            if (!input.closest('.search-wrapper').contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });

        // Закрытие по Escape
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                dropdown.classList.remove('open');
                input.blur();
            }
        });

        // Навигация стрелками по результатам
        input.addEventListener('keydown', function (e) {
            if (!dropdown.classList.contains('open')) return;
            const items = dropdown.querySelectorAll('.search-result-item');
            if (!items.length) return;

            const focused = dropdown.querySelector('.search-result-item:focus');
            let idx = Array.from(items).indexOf(focused);

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                idx = (idx + 1) % items.length;
                items[idx].focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                idx = (idx - 1 + items.length) % items.length;
                items[idx].focus();
            }
        });
    }

    // Запуск после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }
})();
