import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import ListSection from "./components/ListSection";
import { createContext } from "vm";

function App() {
  return (
    <>
      <Header />
      <main>
        <Form />
        <ListSection />
      </main>
    </>
  );
}

export default App;
