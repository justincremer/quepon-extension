import * as React from "react";
import { ReactElement } from "react";
import "./app.css";

export enum Message {
  GenID,
  Parse,
}

export type Elements = RegExpMatchArray;

export default function App(): ReactElement {
  const [elems, setElems]: [Elements, any] = React.useState([]);

  const onClick = () =>
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) =>
      chrome.tabs.sendMessage(
        tabs[0].id!,
        Message.Parse,
        (response: Elements) => setElems(response)
      )
    );

  return (
    <div className="App">
      <header className="App-header">
        <p>matches: {elems?.length}</p>
        <button onClick={onClick}>{"parse"}</button>
      </header>
    </div>
  );
}
