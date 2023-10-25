import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import DocketForm from "./components/DocketForm";
import DocketList from "./components/DocketList";

function App() {
  return (
    <>
      <DocketList/>
      {/* <DocketForm /> */}
    </>
  );
}

export default App;
