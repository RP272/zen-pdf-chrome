// Listen for toggle-toolbar command defined in manifest.json
chrome.commands.onCommand.addListener((command) => {
    if (command === "toggle-toolbar") {
        console.log("ALT+Z");

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs[0]) return;

            chrome.tabs.sendMessage(tabs[0].id, {
                action: "toggle-toolbar"
            });
        });
    }
});