import * as React from "react";
import * as ReactDOM from "react-dom";
import { Message, InputElems } from "./mod";

import "./style/popup.css";

function App(): React.ReactElement {
  const [elems, setElems]: [InputElems, any] = React.useState([]);

  function updateElems(set: any) {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) =>
      chrome.tabs.sendMessage(
        tabs[0].id!,
        Message.Parse,
        (response: InputElems) => set(response)
      )
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>matches: {elems.length}</p>
        <button onClick={() => updateElems(setElems)}>{"parse"}</button>
        {/* <p>elems: {elems}</p> */}
      </header>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("popup"));
