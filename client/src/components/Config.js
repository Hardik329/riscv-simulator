import React, { useContext } from "react";
import axios from "axios";
import { configContext } from "../context";
import { BASE_URL } from "../constants";

const Config = ({ setOpen }) => {
  const { config, setConfig } = useContext(configContext);
  const handleSubmit = async (e) => {
    await axios.post(BASE_URL + "config", config);
    setOpen(false);
  };

  return (
    <div className="flex justify-center">
      <div className="absolute top-1/4 flex flex-col items-center m-5 p-5 gap-3 bg-slate-200 shadow-xl rounded-3xl">
        <div className="m-2 p-2 text-center text-3xl">CONFIGURE</div>
        <div className="flex gap-7">
          <div className="bg-slate-100 m-2 px-8 p-5 flex flex-col font-semibold rounded-lg gap-4">
            <label htmlFor="cache">Cache size(in KB)</label>
            <input
              type="number"
              name="cache"
              value={config.cache}
              className="border border-black p-1 pl-2 pr-0"
              onChange={(e) => setConfig({ ...config, cache: e.target.value })}
            />
          </div>
          <div className="bg-slate-100 m-2 p-5 px-8 flex flex-col gap-4 font-semibold rounded-lg">
            <label htmlFor="block">Cache block size(in B)</label>
            <input
              name="block"
              type="number"
              value={config.block}
              onChange={(e) => setConfig({ ...config, block: e.target.value })}
              className="border border-black p-1 pl-2 pr-0"
            />
          </div>
          <div className="bg-slate-100 m-2 p-5 px-8 flex flex-col gap-4 font-semibold rounded-lg">
            <label htmlFor="mapping">Mapping</label>
            <select
              id="mapping"
              name="mapping"
              value={config.mapping}
              onChange={(e) =>
                setConfig({ ...config, mapping: e.target.value })
              }
              className="border border-black"
            >
              <option value="" disabled>
                Select
              </option>
              <option value="1">Direct mapped</option>
              <option value="2">Set associative</option>
              <option value="3">Fully associative</option>
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          {(config.mapping === "2" || config.mapping === "3") && (
            <div className="bg-slate-100 m-2 p-5 px-10 flex flex-col gap-4 font-semibold rounded-lg">
              <label htmlFor="mapping">Replacement policy</label>
              <select
                id="mapping"
                name="mapping"
                value={config.policy}
                onChange={(e) =>
                  setConfig({ ...config, policy: e.target.value })
                }
                className="border border-black"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="1">LRU</option>
                <option value="2">FIFO</option>
                <option value="3">RANDOM</option>
                <option value="4">LFU</option>
              </select>
            </div>
          )}
          {config.mapping === "2" && (
            <div className="bg-slate-100 m-2 p-5 px-8 flex flex-col gap-4 font-semibold rounded-lg">
              <label htmlFor="block">Number of ways</label>
              <input
                name="block"
                type="number"
                value={config.ways}
                onChange={(e) => setConfig({ ...config, ways: e.target.value })}
                className="border border-black p-1 pl-2 pr-0"
              />
            </div>
          )}
        </div>
        <button
          disabled={
            config.block === "" ||
            config.cache === "" ||
            config.mapping === "" ||
            (config.mapping === "2" &&
              (config.policy === "" || config.ways === "")) ||
            (config.mapping === "3" && config.policy === "")
          }
          onClick={(e) => handleSubmit()}
          className="bg-teal-200 h-fit m-2 p-2 rounded-sm px-6 w-fit cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:bg-teal-300"
        >
          SET
        </button>
      </div>
    </div>
  );
};

export default Config;
