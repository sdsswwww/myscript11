// ==UserScript==
// @name         Scroll to first image load
// @namespace    http://tampermonkey.net/
// @version      2025-07-28
// @description  try to take over the world!
// @author       You
// @match        https://laowang.vip/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=laowang.vip
// @updateURL    https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/scrolltoimageload.js
// @version      1.1
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // Your code here...
    // <div style="width: 600px; height: 100px;background: url(static/image/common//loading.gif) no-repeat center center;"></div>
    document.addEventListener('keydown', function(e) {
        console.log("Key pressed: " + e.key);
        if (e.key === 'f' || e.key === 'F') {
            const divs = document.querySelectorAll('div[style]');
            for (const div of divs) {
                const style = div.getAttribute('style');
                console.log("Div style: " + style);
                if (
                    style &&
                    style.includes('background: url(static/image/common//loading.gif)') &&
                    style.includes('no-repeat center center')
                ) {
                    div.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    break;
                }
            }
        }
    });

})();