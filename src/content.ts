import { Message, Elements } from "./mod";

type SendResponse = (response?: Elements) => void;

// Finds matches on the current page
const matchFocusedDoc = (expr: string): RegExpMatchArray =>
  document.documentElement.innerHTML.match(new RegExp(expr)) ?? [];

// Finds matches on the current page and sends them to the caller
const matchRegex = (expr: string, sendResponse: SendResponse) =>
  sendResponse(matchFocusedDoc(expr));

// Listens for parse calls and parses the page in focus
chrome.runtime.onMessage.addListener(
  (request: Message, _, sendResponse: SendResponse) => {
    if (request === Message.Parse) {
      const expr = "/^(discount|coupon|the)$/i";
      matchRegex(expr, sendResponse);
    }
  }
);
