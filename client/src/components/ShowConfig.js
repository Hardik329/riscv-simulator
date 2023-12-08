import React, { useContext } from "react";
import { configContext, openContext } from "../context";

const ShowConfig = () => {
  const { config } = useContext(configContext);
  const { setOpen } = useContext(openContext);

  const mp = {
    1: "Direct mapped",
    2: "Set associative",
    3: "Fully associative",
  };

  const pol = {
    1: "LRU",
    2: "FIFO",
    3: "RANDOM",
    4: "LFU",
  };

  if (
    config.block === "" ||
    config.cache === "" ||
    config.mapping === "" ||
    (config.mapping === "2" && (config.policy === "" || config.ways === "")) ||
    (config.mapping === "3" && config.policy === "")
  )
    return null;
  return (
    <div className=" flex p-2 bg-slate-50 justify-end items-center gap-[8rem] pr-10">
      <div className="">
        <div className="flex flex-col gap-5 items-center">
          <div className="text-xl">CONFIGURATION</div>
          <div className="flex gap-5 ">
            <div className="text-md">Cache size: {config?.cache} KB</div>
            <div className="text-md">Cache block size: {config?.block} B</div>
            <div className="text-md">Mapping: {mp[config?.mapping]}</div>
          </div>
          <div className="flex gap-5">
            {config?.mapping === "2" && (
              <div className="text-md">Number of ways: {config?.ways}</div>
            )}
            {(config?.mapping === "2" || config?.mapping === "3") && (
              <div className="text-md">
                Replacement policy: {pol[config?.policy]}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <button
          className="bg-teal-200 h-fit m-2 p-2 rounded-sm px-6 w-fit cursor-pointer hover:bg-teal-300"
          onClick={() => {
            setOpen(true);
          }}
        >
          MODIFY
        </button>
      </div>
    </div>
  );
};

export default ShowConfig;
