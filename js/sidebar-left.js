(function () {
    const container = document.getElementById('sidebar-left');
    if (!container) return;

    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const baseURL = location.href.substring(0, location.href.lastIndexOf('/') + 1);

    // Функция, которая строит пагинацию внизу страницы
    function buildPagination(pagesArray) {
        const navContainer = document.getElementById('page-navigation');
        if (!navContainer) return;

        const prevBtn = document.getElementById('nav-prev');
        const nextBtn = document.getElementById('nav-next');
        if (!prevBtn || !nextBtn) return;

        // Ищем индекс текущей страницы в массиве
        const currentIndex = pagesArray.findIndex(p => {
            const pagePath = (p.href || p.url).split('#')[0];
            return pagePath === currentPage;
        });

        if (currentIndex === -1) return; // Если страницы нет в списке - ничего не делаем

        // Настройка кнопки "Назад"
        if (currentIndex > 0) {
            const prevPage = pagesArray[currentIndex - 1];
            prevBtn.href = prevPage.href || prevPage.url;
            prevBtn.querySelector('.nav-text').textContent = prevPage.title;
            prevBtn.style.display = ''; // Показываем кнопку
        }

        // Настройка кнопки "Вперед"
        if (currentIndex < pagesArray.length - 1) {
            const nextPage = pagesArray[currentIndex + 1];
            nextBtn.href = nextPage.href || nextPage.url;
            nextBtn.querySelector('.nav-text').textContent = nextPage.title;
            nextBtn.style.display = ''; // Показываем кнопку
        }
    }

    // Fetch directory listing to discover all .html files
    fetch(baseURL)
        .then(function (r) { return r.text(); })
        .then(function (html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Собираем все ссылки, отрезаем якоря
            const rawHrefs = Array.from(doc.querySelectorAll('a[href]'))
                .map(function (a) { return a.getAttribute('href').split('#')[0]; })
                .filter(function (href) {
                    return /^[^/]+\.html$/.test(href);
                });

            // Убираем дубликаты и сортируем
            const hrefs = Array.from(new Set(rawHrefs)).sort(function(a, b) {
                if (a === 'index.html') return -1;
                if (b === 'index.html') return 1;
                return a.localeCompare(b);
            });

            // Fetch each page to read its <title>
            return Promise.all(hrefs.map(function (href) {
                return fetch(baseURL + href)
                    .then(function (r) { return r.text(); })
                    .then(function (pageHtml) {
                        const m = pageHtml.match(/<title[^>]*>([^<]+)<\/title>/i);
                        const title = m ? m[1].replace(/\s*\|.*$/, '').trim() : href.replace('.html', '');
                        return { href: href, title: title };
                    })
                    .catch(function () {
                        return { href: href, title: href.replace('.html', '') };
                    });
            }));
        })
        .then(function (pages) {
            const ul = document.createElement('ul');
            ul.className = 'sidebar-left-nav';

            pages.forEach(function (page) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = page.href;
                a.className = 'sidebar-left-link' + (currentPage === page.href ? ' active' : '');
                
                // РАЗДЕЛЯЕМ ЦИФРЫ И ТЕКСТ
                const match = page.title.match(/^(\d+\.)\s+(.*)$/);
                if (match) {
                    a.innerHTML = '<span class="nav-num">' + match[1] + '</span><span class="nav-text">' + match[2] + '</span>';
                } else {
                    a.textContent = page.title;
                }

                li.appendChild(a);
                ul.appendChild(li);
            });

            container.appendChild(ul);
            
            // Вызываем постройку кнопок навигации
            buildPagination(pages);
        })
        .catch(function () {
            // Fallback (если запуск без локального сервера)
            if (typeof NAV_PAGES !== 'undefined') {
                const ul = document.createElement('ul');
                ul.className = 'sidebar-left-nav';
                NAV_PAGES.forEach(function (page) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = page.url;
                    a.className = 'sidebar-left-link' + (currentPage === page.url ? ' active' : '');
                    
                    const match = page.title.match(/^(\d+\.)\s+(.*)$/);
                    if (match) {
                        a.innerHTML = '<span class="nav-num">' + match[1] + '</span><span class="nav-text">' + match[2] + '</span>';
                    } else {
                        a.textContent = page.title;
                    }

                    li.appendChild(a);
                    ul.appendChild(li);
                });
                container.appendChild(ul);
                
                // Вызываем постройку кнопок навигации из резервного конфига
                buildPagination(NAV_PAGES);
            }
        });
})();