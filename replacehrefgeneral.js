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
// @version     1.5
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

        if (location.hostname.includes('sis001.com')) {
            // viewthread.php?tid=12304571
            // thread-12304571-1-1.html
            // Convert viewthread.php?tid=12304571 to thread-12304571-1-1.html
            if (link.href.includes("viewthread.php?tid=")) {
                console.log(link.href)
                let tid = link.href.match(/viewthread.php\?tid=(\d+)/)[1];
                link.href = `https://${location.hostname}/bbs/thread-${tid}-1-1.html`;
                console.log(link.href)
                return;
            }
        }

        let z = ["viewthread.php?tid=", "forum.php?mod=viewthread&tid=", 'read.php?tid=']
        let keys = ['extra', 'fpage']
        if (z.some(word => link.href.includes(word))) {
            console.log('origin', link.href)
            for (let k of keys) {
                let index = link.href.indexOf(`&${k}=`);
                if (index !== -1) {
                    link.href = link.href.substring(0, index);
                }
            }

            console.log('modified', link.href)
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