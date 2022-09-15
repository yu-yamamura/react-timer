import React from "react";
import Timer from "./components/timer/Timer";
import "./App.css";

const App = () => (
  <div className="container">
    <header>
      <h1>タイマー</h1>
    </header>
    <Timer limit={60} />
  </div>
);

export default App;
