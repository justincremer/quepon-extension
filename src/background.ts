// Applies a closure to the current tab
// const onCurrentTab = async (callback: (id: number) => void) =>
// 	chrome.tabs.query(
// 		{ currentWindow: true, active: true },
// 		(tabs: chrome.tabs.Tab[]) => callback(tabs[0].id!));

// Signal to generate a UID on installation
// chrome.runtime.onInstalled.addListener((_) =>
// 	chrome.runtime.sendMessage(Message.GenID));

// On click, move current tab to index 0
// chrome.runtime.onMessage.addListener(
// 	(_) => onCurrentTab((id: number) =>
// 		chrome.tabs.move(id, { index: 0 })));

// chrome.runtime.  .addListener((_) =>
// 	chrome.runtime.sendMessage("ayoooo"));
