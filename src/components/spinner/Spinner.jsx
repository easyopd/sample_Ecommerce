import React from "react";
import { Spinner } from "@material-tailwind/react";

const SpinnerComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-white">
      <Spinner className="h-12 w-12 text-blue-500" />
    </div>
  );
};

export default SpinnerComponent;
