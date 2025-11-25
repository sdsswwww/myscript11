// ==UserScript==
// @name        download image kemono.su
// @namespace   Violentmonkey Scripts
// @match       https://kemono.su/*/post/*
// @match       https://kemono.cr/*/post/*
// @grant       none
// @version     1.3
// @author      -
// @description 2/7/2024, 2:11:23 AM
// @require      https://cdn.jsdelivr.net/npm/jszip@3/dist/jszip.min.js
// @updateURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/downloadcontentkemono.js
// @downloadURL   https://raw.githubusercontent.com/sdsswwww/myscript11/refs/heads/main/downloadcontentkemono.js

// ==/UserScript==
function convertBlobPngToJpeg(pngBlob) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = function () {
            let canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg', 1);
        };
        img.onerror = function () {
            reject(new Error('Failed to load image'));
        };
        img.src = URL.createObjectURL(pngBlob);
    });
}


// Download it
function downloadImageFromElement(imgElement, filename) {
    // Wait for image to load if it hasn't already
    if (!imgElement.complete) {
        imgElement.onload = () => downloadImageFromElement(imgElement, filename);
        return;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;
    ctx.drawImage(imgElement, 0, 0);
    
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 'image/jpeg', 0.95);
}


async function triggerDownload() {
    const fileThumbs = document.querySelectorAll('a.fileThumb.image-link');

    const postTitles = document.querySelectorAll('.post__title');
    const postPublished = document.querySelectorAll('.post__published');
    const postEdited = document.querySelectorAll('.post__edited');
    const postAdded = document.querySelectorAll('.post__added');
    const postContent = document.querySelectorAll('.post__content');
    const postAuthor = document.querySelectorAll('.post__user-name');

    const paragraphs = Array.from(postContent).map(content => Array.from(content.getElementsByTagName('p')).map(p => p.textContent.trim()).join(' '));

    console.log('paragraphs:', paragraphs);
    const concatenatedText = paragraphs.join('\r\n');

    console.log('Concatenated Text:', concatenatedText);


    const title = Array.from(postTitles).map(title => title.textContent.trim())[0];
    const publishedDates = Array.from(postPublished).map(date => date.textContent.trim());
    const editedDates = Array.from(postEdited).map(date => date.textContent.trim());
    const addedDates = Array.from(postAdded).map(date => date.textContent.trim());
    const author = Array.from(postAuthor).map(author => author.textContent.trim())[0];
    console.log('Title:', title);
    console.log('Published Dates:', publishedDates);
    console.log('Edited Dates:', editedDates);
    console.log('Added Dates:', addedDates);
    console.log('Author:', author);
    console.log('concatenatedText', concatenatedText);


    const hrefArray = [];
    const smallImageArray = [];
    const smallHrefArray = [];
    fileThumbs.forEach((fileThumb) => {
        const href = fileThumb.getAttribute('href');
        hrefArray.push(href);
        
        const smallImage = fileThumb.querySelector('img');
        if (smallImage) {
            smallImageArray.push(smallImage);
            let h = smallImage.getAttribute('src');
            if (h.startsWith('//')) {
                h = 'https:' + h;
            }
            smallHrefArray.push(h);
        }
    });

    console.log('hrefArray', hrefArray.length, hrefArray);
    console.log('smallHrefArray', smallHrefArray.length, smallHrefArray);

    const smallImageCheckbox = document.getElementById('smallimage');
    const isSmallImageChecked = smallImageCheckbox ? smallImageCheckbox.checked : false;
    console.log('Small Image Checkbox Checked:', isSmallImageChecked);

    if (isSmallImageChecked) {
        console.log('smallImageArray', smallImageArray.length, smallImageArray);
        let index = 0;
        for (const smallImage of smallImageArray) {
            index += 1;
            console.log('smallImage', smallImage);
            const filename = `${index} - ${smallImage.getAttribute('alt') || 'image.jpg'}`;
            console.log('Downloading small image:', filename);
            downloadImageFromElement(smallImage, filename);
        }
        return;
    }


    fileset = new Set();
    const zip = new JSZip();
    zippath = 'ke [' + author + '] ' + title + ' ' + hrefArray.length + 'p';
    zipfilename = zippath +  '.zip';
    console.log('zipfilename', zipfilename);

    const currentPageURL = window.location.href;
    const currentDatetime = new Date().toLocaleString();

    const textContent = `
    Title: ${title}
    Author: ${author}
    Published Dates: ${publishedDates}
    Edited Dates: ${editedDates}
    Added Dates: ${addedDates}
    Current Page URL: ${currentPageURL}
    Current Local Datetime: ${currentDatetime}
    Content:
    ${concatenatedText}
    `;

    zip.file(zippath + '/info.txt', textContent);
    let errormsg = '';
    let downloadList = '';

    // Calculate total downloaded blob size
    let totalDownloadedSize = 0;
    async function addFilesToZip() {
        const totalFiles = (new Set(hrefArray)).size;
        let completedFiles = 0;
        let errorFiles = 0;
        index = 0;
        updateProgressBar(completedFiles, totalFiles, errorFiles);
        for (let href of hrefArray) {
            const urlObj = new URL(href);
            urlObj.hostname = window.location.hostname;
            const newHref = urlObj.toString();
            href = newHref;
            if (fileset.has(href)) {
                continue;
            }
            index += 1;
            fileset.add(href);
            console.log('href', href);
            const fileName = index + ' - ' + href.substring(href.lastIndexOf('=') + 1);
            console.log('filename', fileName);
            downloadList += `${fileName} \n ${href} \n\n`;
            const retrytimes = 5;
            for (let i = 0; i < retrytimes; i++) {
                try {
                    const response = await fetch(href);
                    const blob = await response.blob();

                    zip.file(zippath + '/' + fileName, blob);
                    console.log('Blob Size (KB):', blob.size / 1024);
                    if (blob.size < 600) {
                        throw new Error('Downloaded file is too small (less than 600 bytes)');
                    }
                    totalDownloadedSize += blob.size;
                    break;
                } catch (error) {
                    console.error('Error occurred during fetch:', error);
                    if (i < retrytimes - 1) {
                        console.log('retrying...    ')
                        await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1 second before retrying
                        continue;
                    }
                    errorFiles++;
                    errormsg += `${fileName} \n ${href} \n Error: ${error.message}\n\n`;

                    errorTextArea.textContent = errormsg;


                    const downloadLink = document.createElement('a');
                    downloadLink.href = href;
                    downloadLink.download = fileName;

                    document.body.appendChild(downloadLink);
                }
            }

            console.log('Total Downloaded Blob Size (KB):', totalDownloadedSize / 1024);

            completedFiles++;
            updateProgressBar(completedFiles, totalFiles, errorFiles);
        }

        zip.file(zippath + '/downloadList.txt', downloadList);
    }

    await addFilesToZip();

    zip.generateAsync({ type: 'blob' }).then((content) => {

        imagesdownloadLink.href = URL.createObjectURL(content);
        imagesdownloadLink.download = zipfilename;
        imagesdownloadLink.style.display = 'block';
    });
}

function updateProgressBar(now, total, error) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.textContent = `${now} / ${total}, error ${error}`;
}

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

function drag(event) {
    if (isDragging) {
        floatWindow.style.left = `${event.clientX - offsetX}px`;
        floatWindow.style.top = `${event.clientY - offsetY}px`;
    }
}

function startorendDrag(event) {
    if (!isDragging) {

        isDragging = true;
        offsetX = event.clientX - floatWindow.offsetLeft;
        offsetY = event.clientY - floatWindow.offsetTop;
    }
    else {
        isDragging = false;
    }
}

let floatWindow = null;
let imagesdownloadLink = null;
function adddownloadwindow() {
    if (floatWindow) {
        floatWindow.style.display = floatWindow.style.display === 'none' ? 'block' : 'none';
        return;
    }

    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'start download Files';
    downloadButton.addEventListener('click', triggerDownload);
    const checkbox = document.createElement('input');
    console.log(checkbox);
    checkbox.type = 'checkbox';
    checkbox.id = 'smallimage';
    const checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = 'smallimage';
    checkboxLabel.textContent = 'Download small images only';
    checkbox.style.marginRight = '8px';

    // Append the button and progress bar to the document body or any other desired element
    const progressBar = document.createElement('div');
    progressBar.id = 'progress-bar';
    progressBar.style.width = '200px';
    progressBar.style.height = '20px';
    progressBar.style.backgroundColor = 'blue';
    progressBar.style.color = 'white';
    progressBar.style.textAlign = 'center';
    progressBar.style.lineHeight = '20px';
    progressBar.style.transition = 'width 0.3s ease-in-out';

    const errorTextArea = document.createElement('textarea');
    errorTextArea.id = 'error-textarea';
    errorTextArea.style.width = '100%';
    errorTextArea.style.height = '250px';
    errorTextArea.style.marginTop = '10px';


    floatWindow = document.createElement('div');
    floatWindow.id = 'hexi-float-window';
    floatWindow.style.position = 'fixed';
    floatWindow.style.top = '30%';
    const dragHandle = document.createElement('div');
    dragHandle.style.width = '100%';
    dragHandle.style.height = '20px';
    dragHandle.style.backgroundColor = 'green';
    dragHandle.style.cursor = 'move';

    dragHandle.addEventListener('mousemove', drag);
    dragHandle.addEventListener('mouseup', startorendDrag);

    floatWindow.appendChild(dragHandle);
    floatWindow.style.width = '400px';
    floatWindow.style.height = '400px';
    floatWindow.style.backgroundColor = 'white';
    floatWindow.style.border = '1px solid black';
    floatWindow.style.padding = '20px';
    floatWindow.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    floatWindow.style.zIndex = '9999';

    floatWindow.appendChild(downloadButton);
    floatWindow.appendChild(checkbox);
    floatWindow.appendChild(checkboxLabel);
    floatWindow.appendChild(progressBar);
    floatWindow.appendChild(errorTextArea);
 
    imagesdownloadLink = document.createElement('a');
    imagesdownloadLink.id = 'images-download-link';
    imagesdownloadLink.textContent = 'Download Images';
    imagesdownloadLink.href = '#';
    imagesdownloadLink.style.display = 'none';
    floatWindow.appendChild(imagesdownloadLink);
    document.body.appendChild(floatWindow);

}


function downloadTxt() {
    const authorLink = document.querySelector('a.post__user-name');
    let authorName = '';
    if (authorLink) {
        authorName = authorLink.textContent.trim();
    }
    console.log('Author Name: ' + authorName);
    const titleElement = document.querySelector('h1.post__title > span');
    let title = '';
    if (titleElement) {
        title = titleElement.textContent.trim();
        console.log('Title: ' + title);
    }
    const publishedDiv = document.querySelector('.post__published time.timestamp');
    let publishedDate = '';
    if (publishedDiv) {
        publishedDate = publishedDiv.getAttribute('datetime') || publishedDiv.textContent.trim();
        console.log('Published Date: ' + publishedDate);
    }
    let editedDate = '';
    const editedDiv = document.querySelector('.post__edited time.timestamp');
    if (editedDiv) {
        editedDate = editedDiv.getAttribute('datetime') || editedDiv.textContent.trim();
        console.log('Edited Date: ' + editedDate);
    }
    const postContentDiv = document.querySelector('.post__content');
    let contentText = '';
    if (postContentDiv) {
        contentText = postContentDiv.innerText.trim();

        contentText = contentText.replace(/\n\s*\n+/g, '\n\n'); // Normalize newlines
        contentText = contentText.replace(/ +/g, ' '); // Remove extra spaces

        console.log('Content Text: ' + contentText);
    }

    const textfilename = `${authorName} - ${title}.txt`;
    const textContent = 
`Title: ${title}
Author: ${authorName}
Published Date: ${publishedDate}
Edited Date: ${editedDate}
URL: ${window.location.href}
Content:

${contentText}`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = textfilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}




const imgButton = document.createElement('button');
imgButton.textContent = 'Download Images';
imgButton.style.marginBottom = '10px';
imgButton.addEventListener('click', adddownloadwindow);

const txtButton = document.createElement('button');
txtButton.textContent = 'Download Text';
txtButton.style.marginLeft = '10px';
txtButton.addEventListener('click', downloadTxt);

// Create a floating container for the buttons
const floatBtnContainer = document.createElement('div');
floatBtnContainer.style.position = 'fixed';
floatBtnContainer.style.left = '20px';
floatBtnContainer.style.bottom = '20px';
floatBtnContainer.style.zIndex = '10000';
floatBtnContainer.style.display = 'flex';
floatBtnContainer.style.gap = '10px';
floatBtnContainer.appendChild(imgButton);
floatBtnContainer.appendChild(txtButton);
floatBtnContainer.style.flexDirection = 'column';
document.body.appendChild(floatBtnContainer);