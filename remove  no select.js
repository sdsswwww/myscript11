// ==UserScript==
// @name        remove no select and 夺宝
// @namespace   Violentmonkey Scripts
// @match       https://sis001.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 2/16/2024, 4:55:18 PM
// ==/UserScript==

function work() {
    const noSelectDivs = document.querySelectorAll('.noSelect');
    noSelectDivs.forEach(div => {
        div.classList.remove('noSelect');
    });

    const tbodyElements = document.querySelectorAll('tbody');
    tbodyElements.forEach(tbody => {
        let needhide = false;
        const trElements = tbody.querySelectorAll('tr');
        trElements.forEach(tr => {
            const thElements = tr.querySelectorAll('th');
            thElements.forEach(th => {
                if (th.textContent.includes('[夺宝]')) {
                    needhide = true;
                }
            });
        });
        if (needhide) {
            tbody.style.display = 'none';
        }
    });

    
}



document.addEventListener('DOMContentLoaded', () => {

    work();
});
         
window.addEventListener('load', () => {
    work();
});

window.onload = () => {
    work();
};


work();