// ==UserScript==
// @name        twkan.com clear text
// @namespace   Violentmonkey Scripts
// @match       https://twkan.com/*
// @match       https://cn.wa01.com/*
// @grant       none
// @version     1.7
// @author      -
// @description 3/25/2025, 11:29:27 PM
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/twkancleartext.js
// ==/UserScript==

  

let z = [ 'TTKAN', 'TWKAN',  'ᴛᴛᴋᴀɴ',  'ᴛᴡᴋᴀɴ',  '𝗍𝗍𝗄𝖺𝗇', '𝗍𝗐𝗄𝖺𝗇', '臺湾小説网', "𝕥𝕥𝕜𝕒𝕟","𝕥𝕨𝕜𝕒𝕟", "最⊥新⊥小⊥说⊥"  ]
// normalize to lowercase, trim and remove duplicates
z = Array.from(new Set(z.map(s =>  s.toLowerCase().trim() ).filter(Boolean)));
console.log(z);
function work() {
    console.log("twkancleartext.js is running");
    const contentDiv = document.getElementById("txtcontent");
    if (contentDiv) {
        const lines = contentDiv.innerHTML.split("<br>");
        const filteredLines = lines.filter(line => !z.some(word => line.toLowerCase().includes(word)));
        contentDiv.innerHTML = filteredLines.join("<br>");
        if (lines.length != filteredLines.length) return true;
    }
    return false;
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


// setTimeout(() => {
//     work();
// }, 2000);

// setTimeout(() => {
//     work();
// }, 1000);

// setTimeout(() => {
//     work();
// }, 4000);


// Replace the existing setTimeout calls with:

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