import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { listOfContacts } from "./data";
import {PersonInfo} from "./data"
import "./index.css";
import App from "./App.js";
import { ListContextProvider } from "./components/ListContext";

export const ListContext = createContext<Record<string, PersonInfo[]>>(null!);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ListContextProvider>
      <App />
    </ListContextProvider>
  </StrictMode>
);
