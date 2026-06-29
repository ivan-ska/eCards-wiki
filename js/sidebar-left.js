(function () {
    const container = document.getElementById('sidebar-left');
    if (!container) return;

    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const baseURL = location.href.substring(0, location.href.lastIndexOf('/') + 1);

    function buildPagination(pagesArray) {
        const navContainer = document.getElementById('page-navigation');
        if (!navContainer) return;

        const prevBtn = document.getElementById('nav-prev');
        const nextBtn = document.getElementById('nav-next');
        if (!prevBtn || !nextBtn) return;

        const currentIndex = pagesArray.findIndex(p => {
            const pagePath = (p.href || p.url).split('#')[0];
            return pagePath === currentPage;
        });

        if (currentIndex === -1) return;

        if (currentIndex > 0) {
            const prevPage = pagesArray[currentIndex - 1];
            prevBtn.href = prevPage.href || prevPage.url;
            prevBtn.querySelector('.nav-text').textContent = prevPage.title;
            prevBtn.style.display = '';
        }

        if (currentIndex < pagesArray.length - 1) {
            const nextPage = pagesArray[currentIndex + 1];
            nextBtn.href = nextPage.href || nextPage.url;
            nextBtn.querySelector('.nav-text').textContent = nextPage.title;
            nextBtn.style.display = '';
        }
    }

    fetch(baseURL)
        .then(function (r) { return r.text(); })
        .then(function (html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const rawHrefs = Array.from(doc.querySelectorAll('a[href]'))
                .map(function (a) { return a.getAttribute('href').split('#')[0]; })
                .filter(function (href) {
                    return /^[^/]+\.html$/.test(href);
                });

            const hrefs = Array.from(new Set(rawHrefs)).sort(function(a, b) {
                if (a === 'index.html') return -1;
                if (b === 'index.html') return 1;
                return a.localeCompare(b);
            });

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
            
            buildPagination(pages);
        })
        .catch(function () {
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
                
                buildPagination(NAV_PAGES);
            }
        });
})();