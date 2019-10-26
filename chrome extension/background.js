window.urls = {}

chrome.runtime.onMessage.addListener(request => {
    window.urls[request.url] = ''
})

chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: 'display_tabs.html' })
})
