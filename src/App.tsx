import { useState } from "react";
import reactLogo from "./assets/react.svg";
import bgkitik from "/bg-kitik.jpg";
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
