// ==UserScript==
// @name        replace ip address with domain name
// @namespace   Violentmonkey Scripts
// @match       https://sis001.com/bbs/*
// @match       https://sexinsex.net/forum/*
// @match       https://sis001.com/forum/*
// @grant       none
// @version     1.0
// @author      -
// @description 2/1/2025, 3:49:41 PM
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/replaceimageipaddress.js
// ==/UserScript==


/*
find all <img> elements with src attribute containing an IP address in the ip list
replace the src attribute with the current domain name
*/

let iplist = ['174.127.195.180', '174.127.195.168']

function work() {
    'use strict';

    // Function to replace IP addresses in image src attributes with the current domain name
    function replaceIPWithDomain() {
        const images = document.querySelectorAll('img[src]');
        const currentDomain = window.location.hostname;

        images.forEach(img => {
            iplist.forEach(ip => {
                if (img.src.includes(ip)) {
                    img.src = img.src.replace(ip, currentDomain);
                }
            });
        });
    }

    // Run the function to replace IP addresses
    replaceIPWithDomain();
}


if (document.readyState === 'complete' || document.readyState === 'interactive') {
    work();
} else {
    document.addEventListener('DOMContentLoaded', work);
}