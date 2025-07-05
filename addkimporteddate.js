// ==UserScript==
// @name        Add Edited Date to Articles
// @namespace   Violentmonkey Scripts
// @match       https://kemono.su/*/user/*
// @exclude       https://kemono.su/*/user/*/post/*
// @grant       none
// @version     1.0
// @author      -
// @description 2/1/2025, 4:32:11 PM
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/addkimporteddate.js
// ==/UserScript==
 

async function work() {
        console.log('work111');
        const articles = document.querySelectorAll('article.post-card');
        console.log('Articles len:', articles.length);
        if (articles.length ==0) return 0;
        for (const article of articles) {
            const header = article.querySelector('header.post-card__header');
            console.log('Header Text:', header.textContent);
            const link = article.querySelector('a.fancy-link');
            if (link) {
                const href = link.getAttribute('href');
                const response = await fetch(`/api/v1${href}`);
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