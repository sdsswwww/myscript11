// ==UserScript==
// @name        twkan.com clear text
// @namespace   Violentmonkey Scripts
// @match       https://twkan.com/*
// @grant       none
// @version     1.3
// @author      -
// @description 3/25/2025, 11:29:27 PM
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/twkancleartext.js
// ==/UserScript==

  

let z = [ 'TWKAN',  'ᴛᴡᴋᴀɴ',  '𝗍𝗐𝗄𝖺𝗇', '臺湾小説网', "𝕥𝕨𝕜𝕒𝕟", "最⊥新⊥小⊥说⊥"  ]

function work() {
    const contentDiv = document.getElementById("txtcontent");
    if (contentDiv) {
        const lines = contentDiv.innerHTML.split("<br>");
        const filteredLines = lines.filter(line => !z.some(word => line.includes(word)));
        contentDiv.innerHTML = filteredLines.join("<br>");
    }
};



// // Traverse all <a> elements and modify the href attribute
// document.addEventListener('DOMContentLoaded', () => {

//     work();
// });

// window.addEventListener('load', () => {
//     work();
// });

// window.onload = () => {
//     work();
// };


setTimeout(() => {
    work();
}, 2000);

setTimeout(() => {
    work();
}, 1000);

setTimeout(() => {
    work();
}, 4000);