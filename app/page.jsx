"use client";
import Image from "next/image";
import GridElement from "../components/GridElement";
import { useState } from "react";

export default function Home() {
  const cols = 24;
  const rows = 16;

  const [js1D, setJs1D] = useState("");
  const [js2D, setJs2D] = useState("");
  const [nStates, setNStates] = useState(2);
  const [reset, setReset] = useState(0); // alternates between 0 and 1 to reset the grid (key prop)

  const [array, setArray] = useState(
    Array(rows)
      .fill()
      .map(() => Array(cols).fill(0))
  );

  const handleUpdateArray = (row, col) => {
    const newArray = array.map((r, i) =>
      r.map((c, j) => {
        if (i === row && j === col) {
          return (c + 1) % nStates;
        }
        return c;
      })
    );
    const js1DString = makeJs1D(newArray);
    setJs1D(js1DString);
    const js2DString = makeJs2D(newArray);
    setJs2D(js2DString);
    setArray(newArray);
  };

  const makeJs1D = (array) => {
    const rows = array.length;
    const cols = array[0].length;
    let str = "[";
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        str += array[i][j];
        if (i !== rows - 1 || j !== cols - 1) {
          str += ",";
        }
      }
    }
    str += "]";
    return str;
  };

  const makeJs2D = (array) => {
    const rows = array.length;
    const cols = array[0].length;
    let str = "[";
    for (let i = 0; i < rows; i++) {
      str += "[";
      for (let j = 0; j < cols; j++) {
        str += array[i][j];
        if (j !== cols - 1) {
          str += ",";
        }
      }
      str += "]";
      if (i !== rows - 1) {
        str += ",";
      }
    }
    str += "]";
    return str;
  };

  return (
    <main className="mx-auto my-auto w-fit pt-16 flex flex-col gap-6 select-none">
      <div className="border border-black" key={reset}>
        {[...Array(rows)].map((_, row) => (
          <div key={row} className="flex ">
            {[...Array(cols)].map((_, col) => (
              <GridElement
                key={col}
                coord={[row, col]}
                handleUpdateArray={handleUpdateArray}
                nStates={nStates}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="text-sm flex flex-row gap-1 justify-between text-white">
        <div className="flex flex-row items-center gap-2">
          <button
            className="bg-blue-500 border-blue-800 border-2 cursor-pointer py-1 px-2 active:translate-y-[1px]"
            onClick={() => {
              setArray(
                Array(rows)
                  .fill()
                  .map(() => Array(cols).fill(0))
              );
              setReset((state) => 1 - state);
              setJs1D("");
              setJs2D("");
              setNStates(2);
            }}
          >
            Reset
          </button>
          <div className="flex flex-row text-black items-center gap-3 h-full px-2">
            <svg
              className="cursor-pointer border-2 rounded-full border-blue-800 w-6 h-6 p-1 bg-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#fff"
              viewBox="0 0 256 256"
              onClick={() => {
                setNStates((n) => Math.max(2, n - 1));
              }}
            >
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path>
            </svg>
            <div className="font-mono text-lg flex flex-col items-center">
              <div>{nStates}</div>
              <div className="text-xs">states</div>
            </div>
            <svg
              className="cursor-pointer border-2 rounded-full border-blue-800 w-6 h-6 p-1 bg-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#fff"
              viewBox="0 0 256 256"
              onClick={() => {
                setNStates((n) => Math.min(16, n + 1));
              }}
            >
              <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <span
            className="bg-blue-500 border-blue-800 border-2 cursor-pointer py-1 px-2 active:translate-y-[1px]"
            onClick={() => {
              navigator.clipboard.writeText(js1D);
            }}
          >
            copy 1D
          </span>
          <span
            className="bg-blue-500 border-blue-800 border-2 cursor-pointer py-1 px-2 active:translate-y-[1px]"
            onClick={() => {
              navigator.clipboard.writeText(js2D);
            }}
          >
            copy 2D
          </span>
        </div>
      </div>
    </main>
  );
}
