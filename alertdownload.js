// ==UserScript==
// @name         alert download
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  try to take over the world!
// @author       You
// @match        https://windfiles.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=windfiles.com
// @updateURL    https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/alertdownload.js
// @grant        none
// ==/UserScript==

let clicked = false;
let eventadded = false;
function work() {
    'use strict';
    if (clicked) return;
    // Your code here...
    // <input type="submit" value="Start Download Now">
    const playSound = async (volume) => {
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        for (let i = 0; i < 10; i++) {
            audio.volume = volume !== undefined ? volume : 1.0;
            await audio.play();
            await new Promise(resolve => setTimeout(resolve, 100));
            audio.currentTime = 0;
        }
    };

    const input = document.querySelector('input[type="submit"][value="Start Download Now"]');
    const input1 = document.querySelector('input[type="submit"][value="马上开始下载"]');
    var ii = input || input1
    if (ii) {
        if (!eventadded) {
            ii.addEventListener('click', () => { clicked = true; }, { once: true });
            eventadded = true;
        }
        playSound();
    }
    else {
        // <h5 class="modal-title" id="slowDownTitle">Free Slow Download</h5>
        const slowDownTitle = document.querySelector('h5.modal-title#slowDownTitle');
        if (slowDownTitle) {
            const silentAudio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            silentAudio.volume = 0.01;
            silentAudio.play().catch(() => {});
        }
    }
}

const intervalId = setInterval(() => {
    work();
}, 3000); // Check every 5 seconds