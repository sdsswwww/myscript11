// ==UserScript==
// @name         show or hide books
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       You
// @match        https://www.69shuba.com/modules/article/bookcase.php
// @match        https://twkan.com/bookcase
// @icon         https://www.google.com/s2/favicons?sz=64&domain=69shuba.com
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/hidereadedbook.js
// @grant        none
// ==/UserScript==

function showorhide(flag) {
    console.log('showorhide', flag)
    const matched = [];
    document.querySelectorAll('li').forEach(li => {
        if (li.classList && li.classList.contains('col-8')) return;
        // find the first .zxzj that has child elements
        const zxCandidates = li.querySelectorAll('.zxzj');
        const zx = Array.from(zxCandidates).find(el => el && el.childElementCount > 0);
        if (!zx) return;

        const pElems = Array.from(zx.querySelectorAll('p'));
        let bookmarkAnchor = null;
        let updateAnchor = null;

        pElems.forEach(p => {
            const text = (p.firstChild && p.firstChild.nodeType === Node.TEXT_NODE)
                ? p.firstChild.textContent.trim()
                : p.textContent.trim();
            if (text.startsWith('书签') || text.startsWith('书籤')) {
                bookmarkAnchor = p.querySelector('a');
            } else if (text.startsWith('更新')) {
                updateAnchor = p.querySelector('a');
            }
        });

        if (bookmarkAnchor && updateAnchor) {
            const bText = bookmarkAnchor.textContent.trim();
            const uText = updateAnchor.textContent.trim();
            console.log(bText, uText)
            if (bText && bText === uText) {
                matched.push(li);
                console.log('matched', li, bText, uText);
            }
            else {
                console.log('not matched', li, bText, uText);
            }
        }
    });

    // show or hide based on flag (true = show, false = hide)
    matched.forEach(li => {
        li.style.display = flag ? '' : 'none';
    });

    return matched;

    
}



(function() {
    'use strict';
    
    // Your code here...
    // add a toggle button to show/hide matched items
    (function createToggleButton() {
        const btnId = 'shuba-toggle-read-btn';
        if (document.getElementById(btnId)) return;

        let shown = true; // true => show matched, false => hide matched

        const btn = document.createElement('button');
        btn.id = btnId;
        btn.type = 'button';
        btn.textContent = '隐藏已读'; // initial text indicates action
        btn.title = '切换显示/隐藏已读书籍';
        Object.assign(btn.style, {
            position: 'fixed',
            right: '16px',
            bottom: '16px',
            zIndex: 99999,
            padding: '8px 12px',
            background: '#0078d4',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            fontSize: '13px'
        });

        btn.addEventListener('click', () => {
            shown = !shown;
            showorhide(shown);
            // Button text shows the next action (in Chinese to match site)
            btn.textContent = shown ? '隐藏已读' : '显示已读';
        });

        document.body.appendChild(btn);

        // Apply initial state (show)
        showorhide(shown);
    })();
})();