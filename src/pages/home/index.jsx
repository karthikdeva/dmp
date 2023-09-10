import React from "react";


import Citizen from "../citizen";

const Home = () => {
  return (
    <div className="flex flex-wrap mb-8">
      <div className="grow w-full md:w-full px-2 mb-4">
        <Citizen />
      </div>
      <div className="grow w-full  lg:w-1/2 px-2 mb-4">
      </div>
      <div className="grow w-full  lg:w-1/2 px-2 mb-4">
      </div>
      <div className="grow w-full lg:w-1/2 px-2 mb-4">
      </div>
    </div>
  );
};
export default Home;
