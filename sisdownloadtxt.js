// ==UserScript==
// @name        download txt sis001.com
// @namespace   Violentmonkey Scripts
// @match       https://sis001.com/bbs/*
// @match       https://sexinsex.net/forum/*
// @match       https://sis001.com/forum/*
// @grant       none
// @version     1.0
// @author      -
// @description 2/1/2025, 3:49:41 PM
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/sisdownloadtxt.js
// ==/UserScript==


/*
add a button before the <div class="postmessage defaultpost"> element
download the text content of the <div class="postmessage defaultpost"> element
the txt file name would be the first line of the text result
*/
(function() {
    'use strict';

    // Function to download text content as a .txt file
    function downloadText(filename, text) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    // Function to handle button click
    function handleButtonClick(event) {
        event.preventDefault(); // Prevent the default action (page refresh)
        const postMessageDiv = document.querySelector('.postmessage.defaultpost');
        if (postMessageDiv) {
            const h2Element = postMessageDiv.querySelector('h2');
            let textContent = postMessageDiv.innerText;
            if (h2Element) {
                textContent = textContent.substring(textContent.indexOf(h2Element.innerText));
            }

            const firstLine = textContent.split('\n')[0];
            downloadText(firstLine + '.txt', textContent);
        }
    }

    // Create and insert the button
    const button = document.createElement('button');
    button.innerText = 'Download Post';
    button.style.marginBottom = '10px';
    button.addEventListener('click', handleButtonClick);

    const postMessageDiv = document.querySelector('.postmessage.defaultpost');
    if (postMessageDiv) {
        postMessageDiv.parentNode.insertBefore(button, postMessageDiv);
    }
})();