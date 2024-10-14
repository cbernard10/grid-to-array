"use client";
import React from "react";
import { useState } from "react";

function GridElement({coord, handleUpdateArray, nStates}) {
  const [state, setState] = useState(0);

  return (
    <div
      className={
        state === 0
          ? "flex justify-center items-center w-6 h-6 border border-neutral-400 cursor-pointer hover:bg-neutral-300 bg-white text-white"
          : "flex justify-center items-center w-6 h-6 border border-neutral-400 cursor-pointer hover:bg-neutral-800 bg-black text-white font-mono text-sm"
      }
      onClick={() => {
        setState(prev => (prev + 1) % nStates);
        handleUpdateArray(coord[0], coord[1]);
      }}
    >{state > 0 && state}</div>
  );
}

export default GridElement;
