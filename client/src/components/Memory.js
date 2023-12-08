import React, { useContext } from "react";
import { dataContext } from "../context";
import { Register } from "./Registers";


const Memory = () => {
  const { data } = useContext(dataContext);
  const arr = [];
  for (const [key, val] of Object.entries(data.memory)) {
    arr.push(<Register id={key} num={key} key={key} value={val} />);
  }
  return (
    <>
      <div className="bg-slate-200 m-2 p-2 h-full overflow-y-scroll rounded-sm">
        <div className="flex flex-col">{arr}</div>
      </div>
    </>
  );
};

export default Memory;
