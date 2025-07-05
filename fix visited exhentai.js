// ==UserScript==
// @name        fix visited exhentai.org
// @namespace   Violentmonkey Scripts
// @match       https://exhentai.org/
// @match       https://exhentai.org/watched
// @match       https://exhentai.org/tag/*
// @match       https://exhentai.org/uploader/*
// @grant       none
// @version     1.0
// @author      -
// @description 3/26/2024, 11:00:18 PM
// ==/UserScript==

console.log('work111')



function work() {
    console.log('work')
    const links = document.querySelectorAll('a');
    count = 0
    links.forEach(link => {
        // Then in JavaScript
        // var linkColor = window.getComputedStyle(link).color;

        // if (linkColor === 'rgb(221, 221, 221)') {
        //     console.log(link, linkColor)
        //     console.log('The link has been visited');
        // }
        // else return;
        // check if link startswith 'https://exhentai.org/g'
        if (link.href.startsWith('https://exhentai.org/g')) {
            if (link.querySelector('img')) {
                console.log('The link has an <img> child');
                return;
            }
            console.log('The link starts with "https://exhentai.org/g"');
            // Add your desired logic here
        }
        else return;

        count += 1;
        
        link.innerHTML = link.text;
    });
    console.log('count:', count);
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