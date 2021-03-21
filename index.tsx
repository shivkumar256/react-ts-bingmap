import React, { Component } from "react";
import { render } from "react-dom";
import BingMap from "./BingMap";
import "./style.css";
import "./MapStyle.css";

interface AppProps {}
interface AppState {
  name: string;
}

function App() {
  return (
    <BingMap
      mapOptions={{
        center: [50.3406935, 127.3646807],
        credentials:"ApJA7XsmAsrok-nwOdyQILRZAjsHNu4_GCjn2fhoeo-7q3RG2km1UwBjqPPuEkXd"
      }}
    />
  );
}

render(<App />, document.getElementById("root"));
