import { Message, Elements } from "./app";

type SendResponse = (response?: Elements) => void;

// Finds matches on the current page
const matchFocusedDoc = (expr: string): RegExpMatchArray => {
	const re = new RegExp(expr);
	const res = document.documentElement.innerHTML.match(re) ?? [];
	alert(res.length);
	return res;
}

// Finds matches on the current page and sends them to the caller
const matchRegex = (expr: string, sendResponse: SendResponse) =>
	sendResponse(matchFocusedDoc(expr));

chrome.runtime.onMessage.addListener((request: Message, _, sendResponse: SendResponse) => {
	if (request === Message.Parse) {
		const expr = "/^(discount|coupon|the)$/i";
		matchRegex(expr, sendResponse);
	}
});
