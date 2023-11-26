"use client";
import React, { useRef } from "react";

function Root() {
  const inputRef = useRef();
  function onGoChat() {
    if (inputRef.current.value) {
      sessionStorage.setItem("username", inputRef.current.value);
      window.location = "/room";
    }
  }
  return (
    <div className=" bg-gray-900 w-[100vw] h-[100vh] text-gray-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-600  rounded-md p-4 py-10 flex flex-col items-center gap-2">
        <h1 className=" text-2xl font-bold pb-8">Messenger</h1>
        <input
          ref={inputRef}
          className=" p-1 bg-inherit border border-dashed border-gray-100 rounded-md outline-none"
          placeholder="Username"
          required
          onKeyDown={(event) => {
            event.key === "Enter" && onGoChat();
          }}
        />
        <button
          className="p-1 bg-green-300 text-gray-900 font-bold w-full rounded-md hover:bg-green-200 border border-green-300"
          onClick={() => onGoChat()}
        >
          Go Chat
        </button>
        <p className="text-[0.7rem] text-gray-600">by Geeleed</p>
      </div>
    </div>
  );
}

export default Root;
