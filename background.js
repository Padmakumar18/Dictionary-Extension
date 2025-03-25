chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "lookupWord",
        title: "Look up definition",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "lookupWord") {
        const selectedText = info.selectionText;
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`);
        const data = await response.json();
        
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: showDefinition,
            args: [selectedText, data]
        });
    }
});

function showDefinition(word, data) {
    let definition = "No definition found.";
    if (data && data.length > 0) {
        definition = data[0].meanings[0].definitions[0].definition;
    }
    alert(`${word}: ${definition}`);
}
