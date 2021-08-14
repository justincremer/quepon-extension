import * as React from "react";
import { ReactElement, useState } from "react";
import logo from "./logo.svg";
import "./app.css";

const Button = (): ReactElement => (
  <div>
    <button onClick={() => chrome.runtime.sendMessage("hello world")}>
      { "Send signal" } 
    </button>
  </div>
);

export default function App(): ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button/>
      </header>
    </div>
  );
}
