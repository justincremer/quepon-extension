import { format } from "path/posix";
import { Message, Elements } from "./mod";

type SendResponse = (response?: Elements) => void;

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
      : `${tag}`
    : pattern ?? "";

// Finds matches on the current page and sends them to the caller
const getFocusedElems = (selector: string) =>
  Array.from(document.querySelectorAll(selector));

// Listens for parse calls and parses the page in focus
chrome.runtime.onMessage.addListener(
  (request: Message, _, sendResponse: SendResponse) => {
    if (request === Message.Parse) {
      const elems = getFocusedElems("input");
      console.log(elems);
      sendResponse(
        elems.filter((e: Element) =>
          e.innerHTML.match(/(coupon|discount|code)/i)
        )
      );
    }
  }
);
