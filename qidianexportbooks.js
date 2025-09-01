// ==UserScript==
// @name         export qidian book titles
// @namespace    http://tampermonkey.net/
// @version      2025-09-01
// @description  Export book titles from Qidian
// @author       You
// @match        https://my.qidian.com/bookcase/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=qidian.com
// @grant        none
// ==/UserScript==




function work() {
    'use strict';

 
    const spans = document.querySelectorAll('.shelf-table-name');
    const titles = [];

    spans.forEach(span => {
        const bookAnchor = span.querySelector('a[data-bid]') ||
            Array.from(span.querySelectorAll('a')).find(a => !a.classList.contains('shelf-table-chapter'));
        if (!bookAnchor) return;
        const title = bookAnchor.getAttribute('title') || bookAnchor.textContent.trim();
        if (title) titles.push(title.trim());
    });

    if (titles.length) {
        console.log(titles.join('\n'));
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(titles.join('\n')).catch(() => { });
        }
        console.log(titles);
    } else {
        console.log('No titles found');
    }
    // Your code here...
} 



setTimeout(() => {
    work();
}, 5000);