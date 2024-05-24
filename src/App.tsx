import "./App.css";
import React from "react";
import { OseClientProvider } from "./views";
import { Routes } from "./views/Routes";
import { MetaMaskContextProvider } from "./hooks";

const App = () => {
  return (
    <MetaMaskContextProvider>
      <OseClientProvider>
        <Routes />
      </OseClientProvider>
    </MetaMaskContextProvider>
  );
};

export default App;
