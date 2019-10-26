/*
    This is the main page of the extension where main content will be displayed
*/

chrome.runtime.sendMessage({ url: window.location.href }) // will send message to background.js