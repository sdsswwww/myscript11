// ==UserScript==
// @name        kemono Add Edited Date to Articles
// @namespace   Violentmonkey Scripts
// @match       https://kemono.su/*/user/*
// @exclude       https://kemono.su/*/user/*/post/*
// @match       https://kemono.cr/*/user/*
// @exclude       https://kemono.cr/*/user/*/post/*
// @grant       none
// @version     1.1
// @author      -
// @description 2/1/2025, 4:32:11 PM
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/addkimporteddate.js
// ==/UserScript==

async function work() {
    console.log('work111 kemono Add Edited Date to Articles');
    const articles = document.querySelectorAll('article.post-card');
    console.log('Articles len:', articles.length);
    if (articles.length == 0) return 0;
    for (const article of articles) {
        const header = article.querySelector('header.post-card__header');
        console.log('Header Text:', header.textContent);
        const link = article.querySelector('a.fancy-link');
        if (link) {
            const href = link.getAttribute('href');
            const response = await fetch(`/api/v1${href}`, {
                "headers": {
                    "accept": "text/css",
                    "sec-ch-ua": "\"Google Chrome\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"",
                    "sec-ch-ua-arch": "\"x86\"",
                    "sec-ch-ua-bitness": "\"64\"",
                    "sec-ch-ua-full-version": "\"141.0.7390.66\"",
                    "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"141.0.7390.66\", \"Not?A_Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"141.0.7390.66\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-model": "\"\"",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-ch-ua-platform-version": "\"19.0.0\""
                },
                "referrer": "https://kemono.cr/fanbox/user/102996715/post/9760724",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "omit"
            });
            const data = await response.json();

            const footer = article.querySelector('footer.post-card__footer');
            if (footer) {
                const textarea = document.createElement('textarea');
                textarea.rows = 4;
                textarea.cols = 50;
                textarea.readOnly = true;
                data.props.revisions.forEach(revision => {
                    if (revision[1].added) {
                        console.log(revision[1].added)
                        textarea.value += revision[1].added.split('.')[0] + '\n';
                    }
                });
                footer.appendChild(textarea);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    }
    return articles.length;
}


async function repeatWork() {
    const result = await work();
    if (result === 0) {
        setTimeout(repeatWork, 3000);
    }
}

repeatWork();