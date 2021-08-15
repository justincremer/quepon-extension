import * as React from "react";
import * as ReactDOM from "react-dom";
import { Message, Elements } from "./mod";

import "./style/popup.css";

function App(): React.ReactElement {
  const [elems, setElems]: [Elements, any] = React.useState([]);

  function updateElems(set: any) {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) =>
      chrome.tabs.sendMessage(
        tabs[0].id!,
        Message.Parse,
        (response: Elements) => set(response)
      )
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>matches: {elems?.length}</p>
        <button onClick={() => updateElems(setElems)}>{"parse"}</button>
      </header>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("popup"));
