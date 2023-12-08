import React, { useContext } from "react";
import { dataContext } from "../context";

export const Register = ({ num, value }) => {
  return (
    <div className="flex justify-around">
      <label htmlFor="register" className="m-2 p-2 ">
        {num}
      </label>
      <input
        readOnly
        name="register"
        className="border border-black m-2 p-2"
        value={value}
      />
    </div>
  );
};

const Registers = () => {
  const { data } = useContext(dataContext);
  if (!data || !data.registers) return <>Loading...</>;

  return (
    <div className="bg-slate-200 h-full m-2 p-2 overflow-y-scroll">
      <div className="text-xl text-center"></div>

      {Array(32)
        .fill()
        .map((_, index) => (
          <Register num={"X" + index} key={index} value={data.registers[index]} />
        ))}
    </div>
  );
};

export default Registers;
