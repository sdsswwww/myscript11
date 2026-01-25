// ==UserScript==
// @name        replace href spring plus.js   remove the extra parameter from the href attribute spring plus
// @namespace   Violentmonkey Scripts
// @match       https://www.spring-plus.net/thread.php*
// @match       https://www.south-plus.net/thread.php*
// @grant       none
// @version     1.1
// @author      -
// @description 2/14/2024, 10:44:11 AM
// ==/UserScript==

console.log('work111')

function work()
{
    console.log('work')
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        // Modify the href attribute here
        // https://www.spring-plus.net/read.php?tid-2096102-fpage-2.html
        // https://www.spring-plus.net/read.php?tid-2097215.html
        if (link.href.includes("read.php?tid-")) {
            
            console.log(link.href)
            link.href = link.href.replace(/-fpage-\d+/, '');
            console.log(link.href)
        }
    });
}


// Traverse all <a> elements and modify the href attribute
document.addEventListener('DOMContentLoaded', () => {

    work();
});
         

window.onload = () => {
    work();
};