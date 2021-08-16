import { Message, InputElems } from "./mod";

type SendResponse = (response?: InputElems) => void;

const genCssSelector = (
  tag?: string,
  pattern?: string,
  attrs?: Array<string>
): string =>
  tag
    ? attrs
      ? attrs
          .reduce((acc, attr) => acc + `${tag}[${attr}*="${pattern}" i],`, "")
          .slice(0, -1)
      : tag
    : pattern ?? "";

// Finds matches on the current page and sends them to the caller
const focusedElems = (selector: string): Array<Element> =>
  Array.from(document.querySelectorAll(selector));

//
const fillInput = (elem: HTMLInputElement, codes: Array<string>) =>
  codes.forEach((c) => {
    elem.value = c;
    elem.type = "submit";
  });

// Listens for parse calls and parses the page in focus
chrome.runtime.onMessage.addListener(
  (request: Message, _, sendResponse: SendResponse) => {
    if (request === Message.Parse) {
      const discount_input_elems: Array<Element> = focusedElems("input").filter(
        (e: Element) =>
          (e as HTMLInputElement).outerHTML.match(/(coupon|discount|code)/i)
      );

      const total_amount_elem: Array<Element> = focusedElems("*").filter(
        (e: Element) =>
          e.outerHTML.match(/(amount|due|payment|total)/i) &&
          e.textContent?.match(/(d+.d{1,2})/)
      );

      console.log(total_amount_elem);
      // sendResponse(discount_input_elems);
      sendResponse(total_amount_elem);
    }
  }
);
