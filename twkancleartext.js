// ==UserScript==
// @name        twkan.com clear text
// @namespace   Violentmonkey Scripts
// @match       https://twkan.com/*
// @grant       none
// @version     1.20
// @author      -
// @description 3/25/2025, 11:29:27 PM
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/twkancleartext.js
// ==/UserScript==



let z = ['T Tκan', 'TTKAN', 'TWKAN', 'ᴛᴛᴋᴀɴ', 'ᴛ ᴛᴋᴀɴ', 'ᴛᴡᴋᴀɴ', '𝗍𝗍𝗄𝖺𝗇', '𝗍𝗐𝗄𝖺𝗇', '臺湾小説网', "𝕥𝕥𝕜𝕒𝕟", "𝕥𝕨𝕜𝕒𝕟", "最⊥新⊥小⊥说⊥"]
// normalize to lowercase, trim and remove duplicates
z = Array.from(new Set(z.map(s => s.toLowerCase().trim())));

let x = ['𝓽𝔀𝓴𝓪𝓷', 'www⊕ ttκǎ n⊕ C 〇', 'Wшw .Tтkā n .C 〇', 'Www✿тt kǎn✿CΟ', 'шшш＿TTKΛN＿co', 'Wшw ●тTkan ●￠ ○', 'ωωω ＿TтkΛ n ＿￠ O']
console.log(z);

function workline(line0) {
    let plain = line0;
    // replace any occurrence of any entry in x with a single space (case-insensitive)
    for (const pat of x) {
        const idx = plain.indexOf(pat);
        if (idx !== -1) {
            console.log(`Removing pattern "${pat}" from line: ${plain}`);
            let x = plain.slice(0, idx) + '⭐' + plain.slice(idx + pat.length);
            console.log(`Resulting line: ${x}`);
            plain = x;
        }
    }
    if (z.some(word => plain.toLowerCase().includes(word))) {
        console.log(`Line contains filtered word, replacing all line with star: ${plain}`);
        return "⭐";
    }
    return plain;
}


function work() {
    console.log("twkancleartext.js is running");
    // <div id="txtcontent0">
    const contentDiv =  document.querySelector('div#txtcontent');
    // <div class="content">
    // fallback: find the <div class="content">
    const contentEl = document.querySelector('div.content');
    const contentE2 = document.querySelector('div#txtcontent0');

    let target = contentDiv || contentEl || contentE2;
    console.log('found target:', target);
    if (!target) return false;
    const lines = target.innerHTML.split("<br>");
    //const filteredLines = lines.filter(line => !z.some(word => line.toLowerCase().includes(word)));
    const filteredLines = lines.map(line => workline(line));
    // console.log(lines);
    // console.log(filteredLines);
    target.innerHTML = filteredLines.join("<br>");

    return true;
};



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