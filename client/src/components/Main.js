import axios from "axios";
import React, { useContext, useState } from "react";
import { BASE_URL } from "../constants";
import { dataContext, stateContext } from "../context";
import { getData } from "../helper";

const Main = () => {
  const { state, setState } = useContext(stateContext);
  const {setData } = useContext(dataContext);

  const [code, setCode] = useState("");


  const handleSubmit = async (val) => {
    if (!state.isSpawned) {
      if (val === 2) await axios.post(BASE_URL + "code", { code: "" });
      else await axios.post(BASE_URL + "code", { code });
      await axios.get(BASE_URL + "spawn");
      await axios.get(BASE_URL + "input");

      setState({ ...state, isSpawned: true });
    }
    if (val === 0) {
      //STEP
      await axios.get(BASE_URL + "step");
      await new Promise((res) => setTimeout(res, 100));
      await getData(setData);
    } else {
      //RUN
      await axios.get(BASE_URL + "run");
      await new Promise((res) => setTimeout(res, 100));
      await getData(setData);
      setState({ isSpawned: false, isFinished: true });
    }
  };

  return (
    <div className="bg-slate-50">
      <div className="flex justify-center mt-5">
        <button
          className="mx-10 bg-teal-200 h-fit m-2 p-2 rounded-sm px-6 w-fit cursor-pointer hover:bg-teal-300"
          onClick={() => handleSubmit(1)}
        >
          RUN
        </button>
        <button
          className="mx-10 bg-teal-200 h-fit m-2 p-2 rounded-sm px-6 w-fit cursor-pointer hover:bg-teal-300"
          onClick={() => handleSubmit(0)}
        >
          STEP
        </button>
        <button
          className="mx-10 bg-teal-200 h-fit m-2 p-2 rounded-sm px-6 w-fit cursor-pointer hover:bg-teal-300"
          onClick={() => handleSubmit(2)}
        >
          RESET
        </button>
      </div>
      <div className="h-[29rem] m-5 mx-12">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-full w-full border border-black p-2 resize-none"
        />
      </div>
    </div>
  );
};

export default Main;
