import React, { Suspense } from "react";
import Routes from "./routes/Routes";
import "./App.scss";

function App() {
  return (
    <>
      <Suspense fallback={"loading..."}>
        <Routes />
      </Suspense>
    </>
  );
}

export default App;
