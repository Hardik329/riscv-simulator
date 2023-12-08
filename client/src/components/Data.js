import React, { useState } from "react";
import Memory from "../components/Memory";
import Registers from "./Registers";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Data = () => {
  const [isRegister, setIsRegister] = useState(true);

  

  return (
    <div className="flex flex-col p-5 h-screen overflow-hidden w-max  bg-slate-50 rounded-lg">
      <div className="h-[90vh] w-96">
       

        <Tabs>
          <TabList>
            <Tab onClick={() => setIsRegister(true)}>Register</Tab>
            <Tab onClick={() => setIsRegister(false)}>Memory</Tab>
          </TabList>
          <TabPanel/>
          <TabPanel/>
        </Tabs>
        {isRegister ? <Registers /> : <Memory />}
      </div>
    </div>
  );
};

export default Data;
