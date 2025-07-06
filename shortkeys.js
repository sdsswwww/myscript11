// ==UserScript==
// @name        Shortkeys for reading books
// @namespace   Violentmonkey Scripts
// @match       https://www.sudugu.com/*
// @match       https://69shuba.*/*
// @match       https://69shuba.cx/*
// @match       https://www.69shuba.*/*
// @match        https://www.69shuba.com/*
// @match       https://twkan.com/*
// @match       https://www.qidian.com/*
// @match       https://learn.microsoft.com/*
// @grant       none
// @version     1.2
// @author      -
// @description 6/12/2025, 1:02:12 AM
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/shortkeys.js
// ==/UserScript==


function getLinks(texts) {
    const r =  Array.from(document.querySelectorAll('button, a, span')).filter(a => texts.some(text => a.textContent.trim() === text));
    const isVisible = el => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return (
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0' &&
            rect.width > 0 &&
            rect.height > 0 &&
            rect.bottom > 0 &&
            rect.right > 0
        );
    };
    const visible = r.filter(isVisible);
    if (visible.length > 0) return visible[0];
    // if (r.length > 0) {
    //     console.log("Found exact match: " + r.map(a => a.textContent.trim()).join(", "));
    //     return r;
    // }
    // const r1 = Array.from(document.querySelectorAll('button, a, span')).filter(a => texts.some(text => a.textContent.includes(text)));
    // if (r1.length > 0) {
    //     console.log("Found partial match: " + r1.map(a => a.textContent.trim()).join(", "));
    //     return r1;
    // }
    return null;
}


const keyconfig = {
    "next": "d",
    "previous": "a",
    "Scrolldown": "s",
    "Scrollup": "w",
    "Scrolldownonepage": "e",
    "Scrolluponepage": "q",
    "Scrolltop": "r",
    "Scrollbottom": "f",
    "bookmark": "b",
    "bookshelf": "z",
    "goback": "x",
    "goforward": "c",
}
const bookmarkTexts = ["书签", "书籤","書籤", "把最后一章加入书签", "把最后一章加入书籤", "把最后一章加入書籤", "收藏", "加入书签", "添加书签"];
const previousChapterTexts = ["上一章", "上一页", "Previous"];
const nextChapterTexts = ["下一章", "下一页", "Next"];
const bookshelfTexts = ["书架", "我的书架", "我的收藏", "我的书签", "书签列表", "书架列表", "Check Your Answer", "Check your answers"];


// when user press keys,  do the actions,
document.addEventListener('keydown', function(event) {
    if (event.target.tagName === 'INPUT' && !(['checkbox', 'radio'].includes(event.target.type?.toLowerCase()) ) || event.target.tagName === 'TEXTAREA') {
        console.log("target tagname   " + event.target.tagName )
        console.log("event.target.type  " + event.target.type )
        return; // Ignore key presses in input or textarea fields
    }
    console.log("Key pressed: " + event.key);
    lowercasekey = event.key.toLowerCase();
    if (event.ctrlKey || event.altKey || event.metaKey) {
        console.log("Ignoring key press with modifier keys");
        return; // Ignore key presses with modifier keys
    }
    
    switch (lowercasekey) {
        case keyconfig.next:
            // <a href="/1655/2185858.html">下一章</a>
            // <a href="/1655/2185857-2.html">下一页</a>
            // find the href with text 下一章 or 下一页 to click
            const nextChapterLink = getLinks(nextChapterTexts);
            if (nextChapterLink) {
                console.log("Next chapter link found: " + nextChapterLink);
                nextChapterLink.click();
            }
            break;
        case keyconfig.previous:
            // <a href="/1655/2185856.html">上一章</a>
            // <a href="/1655/2185857-2.html">上一页</a>
            // find the href with text 上一章 or 上一页 to click
            const previousChapterLink = getLinks(previousChapterTexts);
            if (previousChapterLink) {
                console.log("Previous chapter link found: " + previousChapterLink);
                previousChapterLink.click();
            }
            break;
        case keyconfig.bookmark:
            const bookmarkLink = getLinks(bookmarkTexts);
            if (bookmarkLink) {
                console.log("Bookmark link found: " + bookmarkLink);
                bookmarkLink.click();
            }
            break;
        case keyconfig.bookshelf:
            const bookshelfLink = getLinks(bookshelfTexts);
            if (bookshelfLink) {
                console.log("Bookshelf link found: " + bookshelfLink);
                bookshelfLink.click();
            }
            break;
        case keyconfig.Scrolldown:
            window.scrollBy(0, 100);
            break;
        case keyconfig.Scrollup:
            window.scrollBy(0, -100);
            break;
        case keyconfig.Scrolldownonepage:
            window.scrollBy(0, window.innerHeight * 0.9);
            break;
        case keyconfig.Scrolluponepage:
            window.scrollBy(0, -window.innerHeight * 0.9);
            break;
        case keyconfig.Scrolltop:
            window.scrollTo(0, 0);
            break;
        case keyconfig.Scrollbottom:
            window.scrollTo(0, document.body.scrollHeight);
            break;
        case keyconfig.goback:
            window.history.back();
            break;
        case keyconfig.goforward:
            window.history.forward();
            break;
    }
});
