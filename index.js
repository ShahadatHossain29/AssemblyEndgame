import React from "react";
import { createRoot } from "react-dom/client";
import AssemblyEndgame from "./AssemblyEndgame";

function App() {
  return (
    <div className="App">
      <AssemblyEndgame />
    </div>
  );
}

const rootElement = document.querySelector("#root");
const root = createRoot(rootElement);
root.render(<App />);
