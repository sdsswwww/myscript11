// ==UserScript==
// @name        download txt chunman4.com
// @namespace   Violentmonkey Scripts
// @match       *://chunman4.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 2/1/2025, 3:49:41 PM
// ==/UserScript==


/*
add a button before the <div class="pcb"> element
download the text content of the <div class="pcb"> element
the txt file name would be the first not empty line of the text result
*/
 function work() {
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
        const pcbDiv = document.querySelector('#content_deiyg');
        if (pcbDiv) {
            // Exclude hidden elements
            Array.from(pcbDiv.querySelectorAll('*')).forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.display === 'none' || style.visibility === 'hidden') {
                    el.remove();
                }
            });

            // Exclude hidden elements
            Array.from(pcbDiv.querySelectorAll('.pstatus')).forEach(el => {
                if (el.innerText.includes('本帖最后由')) {
                    el.remove();
                }
            });

            let textContent = pcbDiv.innerText.trim();
            
            const threadSubject = document.querySelector('#thread_subject');
            const filename = threadSubject.innerText.trim() + '.txt';
            textContent = textContent.replace(/\n\s*\n+/g, '\n\n');
            downloadText(filename, textContent);
        }
    }

    // Create and insert the button
    const button = document.createElement('button');
    button.innerText = 'Download Post';
    button.style.marginBottom = '10px';
    button.addEventListener('click', handleButtonClick);

    const pcbDiv = document.querySelector('.pcb');
    if (pcbDiv) {
        console.log(pcbDiv);
        pcbDiv.parentNode.insertBefore(button, pcbDiv);
    }
} ;

console.log("chunman4.com  download txt script loaded");
// Trigger the button click function after 3 seconds
setTimeout(() => {
    work();
}, 3000);