console.log("Hello from background script!");

async function onCurrentTab(callback: (id: number) => void) {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    async (tabs: chrome.tabs.Tab[]) => {
      const curr = tabs[0].id!;
      await callback(curr);
    }
  );
}

chrome.runtime.onMessage.addListener(
  async (_) =>
    await onCurrentTab((id: number) => chrome.tabs.move(id, { index: 0 }))
);
