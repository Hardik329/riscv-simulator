import { Route, Routes } from "react-router-dom";

import Main from "./pages/Home";
import { useState } from "react";
import {
  configContext,
  dataContext,
  stateContext,
  openContext,
} from "./context";

function App() {
  const [config, setConfig] = useState({
    cache: "",
    mapping: "",
    block: "",
    ways: "",
    policy: "",
  });
  const [data, setData] = useState();
  const [state, setState] = useState({ isSpawned: false, isFinished: false });
  const [open, setOpen] = useState(false);

  return (
    <div className="App">
      <configContext.Provider value={{ config, setConfig }}>
        <dataContext.Provider value={{ data, setData }}>
          <stateContext.Provider value={{ state, setState }}>
            <openContext.Provider value={{ open, setOpen }}>
              <Routes>
                <Route index element={<Main />} />
              </Routes>
            </openContext.Provider>
          </stateContext.Provider>
        </dataContext.Provider>
      </configContext.Provider>
    </div>
  );
}

export default App;
