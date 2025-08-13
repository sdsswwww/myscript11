// ==UserScript==
// @name         keep alive
// @namespace    http://tampermonkey.net/
// @description  try to take over the world!
// @author       You
// @match        https://mega.nz/file/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mega.nz
// @updateURL    https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/keepalive.js
// @version      1.4
// @grant        none
// ==/UserScript==

function work() {
    'use strict';
    
    const silentAudio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
    silentAudio.volume = 0.01;
    silentAudio.play().catch(() => {});
}

const intervalId = setInterval(() => {
    work();
}, 3000); // Check every 3 seconds