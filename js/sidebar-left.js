(function () {
    const container = document.getElementById('sidebar-left');
    if (!container) return;

    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const baseURL = location.href.substring(0, location.href.lastIndexOf('/') + 1);

    // Fetch directory listing to discover all .html files
    fetch(baseURL)
        .then(function (r) { return r.text(); })
        .then(function (html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const hrefs = Array.from(doc.querySelectorAll('a[href]'))
                .map(function (a) { return a.getAttribute('href'); })
                .filter(function (href) {
                    return /^[^/]+\.html$/.test(href) && href !== 'index.html';
                })
                .sort(); // alphabetical by filename

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
        })
        .catch(function () {
            // Directory listing unavailable — fallback to nav-config if present
            if (typeof NAV_PAGES !== 'undefined') {
                const ul = document.createElement('ul');
                ul.className = 'sidebar-left-nav';
                NAV_PAGES.forEach(function (page) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = page.url;
                    a.className = 'sidebar-left-link' + (currentPage === page.url ? ' active' : '');
                    
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
            }
        });
})();