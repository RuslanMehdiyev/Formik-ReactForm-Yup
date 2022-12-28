import React from "react";
import "./assets/style.css";
import FormikYup from "./components/FormikYup";
import ReactFormYup from "./components/ReactFormYup";

function App() {
  return (
    <>
      <div className="App">
      <FormikYup />
      <ReactFormYup />
      </div>
    </>
  );
}

export default App;
