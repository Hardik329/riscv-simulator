import Data from "../components/Data";

import React, { useContext, useEffect } from "react";

import ShowConfig from "../components/ShowConfig";
import Backdrop from "@mui/material/Backdrop";
import Config from "../components/Config";

import { configContext, dataContext, openContext } from "../context";
import Main from "../components/Main";
import { getData } from "../helper";

const Home = () => {
  const { config } = useContext(configContext);
  const { data, setData } = useContext(dataContext);

  const { open, setOpen } = useContext(openContext);

  if (!open) {
    if (
      config.block === "" ||
      config.cache === "" ||
      config.mapping === "" ||
      (config.mapping === "2" &&
        (config.policy === "" || config.ways === "")) ||
      (config.mapping === "3" && config.policy === "")
    )
      setOpen(true);
  }


  useEffect(() => {
    getData(setData);
  }, []);

  if (!data || !data.registers || !data.memory) return <>Loading...</>;

  return (
    <div className="flex h-screen overflow-hidden bg-teal-50">
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <Config open={open} setOpen={setOpen} />
      </Backdrop>
      <div className="flex flex-col grow">
        <ShowConfig />
        <Main />
      </div>
      <div className="">
        <Data />
      </div>
    </div>
  );
};

export default Home;
