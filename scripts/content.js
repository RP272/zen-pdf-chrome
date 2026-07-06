let toolbarVisible = true;

// Callback function to handle 'toggle-toolbar' message from background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggle-toolbar") {
        const shadowRoot = chrome.dom.openOrClosedShadowRoot(document.body);
        
        if (!shadowRoot) {
            console.error("Can't access Shadow DOM");
            return;
        }

        const pdfIframe = shadowRoot.querySelector("iframe");

        if (!pdfIframe) {
            console.error("Couldn't find PDF iframe.");
            return;
        }

        if (toolbarVisible === true) {
            // I think this is the only way to hide the toolbar, since the contents are stored in the iframe and we can't access them directly
            pdfIframe.style.transform = "translateY(-56px)";
            pdfIframe.style.height = "calc(100vh + 56px)";
            toolbarVisible = false;
        } else {
            pdfIframe.style.transform = "";
            pdfIframe.style.height = "";
            toolbarVisible = true;
        }
    }
});