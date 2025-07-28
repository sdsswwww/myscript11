// ==UserScript==
// @name         Scroll to first image load
// @namespace    http://tampermonkey.net/
// @description  try to take over the world!
// @author       You
// @match        https://laowang.vip/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=laowang.vip
// @updateURL    https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/scrolltoimageload.js
// @version      1.3
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
            // <img id="aimg_10371811" aid="10371811" src="/remote/data/attachment/forum/202507/28/134514wrko9knk9nmrzknh.png" zoomfile="/remote/data/attachment/forum/202507/28/134514wrko9knk9nmrzknh.png" file="/remote/data/attachment/forum/202507/28/134514wrko9knk9nmrzknh.png" class="zoom" onclick="zoom(this, this.src, 0, 0, 0)" width="600" inpost="1" onmouseover="showMenu({'ctrlid':this.id,'pos':'12'})" lazyloaded="true" style="" _load="1" initialized="true">
            // if not found, try to find the first image with lazyloaded="true"
            const images = document.querySelectorAll('img[lazyloaded="true"]');
            if (images.length > 0) {
                images[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            // <p class="mbn">
            // if not found, try to find the first paragraph with class="mbn"
            const paragraphs = document.querySelectorAll('p.mbn');
            if (paragraphs.length > 0) {
                paragraphs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

})();