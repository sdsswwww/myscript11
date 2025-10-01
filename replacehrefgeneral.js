// ==UserScript==
// @name        general remove the extra parameter from the href attribute
// @namespace   Violentmonkey Scripts
// @match       *://sis001.com/*
// @match       *://sexinsex.net/*
// @match       *://laowang.vip/*
// @match       *://chunman4.com/*
// @match       *://*.a41415.com/*
// @match       *://*.hjd2048.com/*
// @match       *://*.sxsylt1.com/*
// @match       *://*.xsijishe.net/*
// @grant       none
// @version     1.3
// @author      -
// @description 2/14/2024, 10:44:11 AM
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/replacehrefgeneral.js
// @downloadURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/replacehrefgeneral.js
// ==/UserScript==

console.log('work111')

function work()
{
    console.log('work')
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        // Modify the href attribute here
        // https://sis001.com/bbs/thread-11859395-1-1.html
        if (link.href.includes("/bbs/thread-")) {

            console.log(link.href)
            link.href = link.href.replace(/-\d+\.html/, '-1.html');
            console.log(link.href)
            return;
        }
        let z = ["viewthread.php?tid=", "forum.php?mod=viewthread&tid=", 'read.php?tid=']
        if (z.some(word => link.href.includes(word))) {
            console.log(link.href)
            link.href = link.href.replace(/(\?|&)extra=[^&]+/, '');
            //&fpage=2
            link.href = link.href.replace(/(\?|&)fpage=[^&]+/, '');
            console.log(link.href)
        }
    });
}


// Traverse all <a> elements and modify the href attribute
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