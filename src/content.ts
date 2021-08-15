import { Message, Elements } from "./mod";

type SendResponse = (response?: Elements) => void;

// Finds matches on the current page and sends them to the caller
const getFocusedElems = (selector: string, sendResponse: SendResponse) =>
	sendResponse(Array.from(document.querySelectorAll(selector)));

// Listens for parse calls and parses the page in focus
chrome.runtime.onMessage.addListener(
	(request: Message, _, sendResponse: SendResponse) => {
		if (request === Message.Parse) {
			const selector = 'coupon, .coupon, #coupon, discount, .discount, #discount';
			getFocusedElems(selector, sendResponse);
		}
	}
);
