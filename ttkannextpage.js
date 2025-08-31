// ==UserScript==
// @name         ttkan next page
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       You
// @match        https://cn.wa01.com/novel/pagea/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wa01.com
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/ttkannextpage.js
// @grant        none
// ==/UserScript==

function work() {
    console.log("twkan next page.js is running");

    // Your code here...
    // <div class="prev_page"><a href="/novel/pagea/jingtaoluori-kangsitandingbojue_343.html" title="第22章 “完了”" aria-label="第22章 “完了”">◈&nbsp;第22章 “完了”</a></div>
    const prevDiv = document.querySelector('div.prev_page');
    if (!prevDiv) return false;

    // If a next_page element already exists, do nothing
    if (document.querySelector('div[name="next_page"], div#next_page')) {
        return true;
    }
    // try to compute the "next" page URL
    let nextHref = '#';
    const curMatch = window.location.pathname.match(/_(\d+)\.html$/);
    if (curMatch) {
        const curId = parseInt(curMatch[1], 10);
        const nextId = curId + 1;
        const base = window.location.pathname.replace(/_(\d+)\.html$/, '');
        nextHref = base + '_' + nextId + '.html';
    } else {
        const prevA = prevDiv.querySelector('a');
        if (prevA) {
            const pm = prevA.getAttribute('href').match(/_(\d+)\.html$/);
            if (pm) {
                // prev -> prevId, so current is likely prevId+1, next is prevId+2
                const nextId = parseInt(pm[1], 10) + 2;
                const base = prevA.getAttribute('href').replace(/_(\d+)\.html$/, '');
                nextHref = base + '_' + nextId + '.html';
            } else {
                nextHref = prevA.getAttribute('href') || '#';
            }
        }
    }

    // build the next_page element
    const nextDiv = document.createElement('div');
    nextDiv.className = 'prev_page';
    nextDiv.id = 'next_page';
    nextDiv.setAttribute('name', 'next_page');
    const nextA = document.createElement('a');
    nextA.href = nextHref;
    nextA.title = '下一章';
    nextA.setAttribute('aria-label', '下一章');
    // use same marker as prev, then a readable label
    nextA.innerHTML = '下一章';

    nextDiv.appendChild(nextA);


    prevDiv.parentNode.insertBefore(nextDiv, prevDiv.nextSibling);

    return true;
};

 

const intervalId = setInterval(() => {
    try {
        if (work()) {
            clearInterval(intervalId);
            console.log("work() succeeded, stopping interval");
        }
    } catch (error) {
        console.error("Error in work function:", error);
        
    }
}, 1000); // Check every 1 second