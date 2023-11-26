"use client";
import React, { useEffect, useRef, useState } from "react";
import { socketio } from "../socket";

const socket = socketio();
function Page() {
  const inputRef = useRef();
  const [username, setUsername] = useState();
  const [message, setMessage] = useState([]);
  function sendMsg() {
    const msg = inputRef.current.value;
    inputRef.current.value = "";
    socket.emit("data", {
      username: username,
      message: msg,
      socketid: socket.id,
    });
  }
  useEffect(() => {
    setUsername(sessionStorage.getItem("username"));
  }, []);
  socket.on("sent", (data) => {
    setMessage([...message, data]);
  });
  return (
    <div className=" relative bg-gray-900 h-[100vh] w-[100vw] text-gray-50 flex justify-center">
      <div className=" relative w-[70%] flex gap-2 flex-col">
        <h1 className=" text-center text-[2rem] font-bold">Chat</h1>
        <h2 className=" text-center text-[1rem] font-bold">{username}</h2>
        {message.map((item, index) =>
          item["username"] === username ? (
            <div className="flex justify-end">
              <p
                className="p-1 px-3 bg-green-200 rounded-xl rounded-br-none text-gray-900 max-w-full break-words"
                key={index}
              >{`${item["message"]}`}</p>
            </div>
          ) : (
            <div className="flex justify-start">
              <p
                className="p-1 px-3 bg-gray-300 rounded-xl rounded-bl-none text-gray-900 max-w-full break-words"
                key={index}
              >
                <b>{`${item["username"]} : `}</b>
                {`${item["message"]}`}
              </p>
            </div>
          )
        )}
        <div className=" w-[inherit] fixed bottom-0 flex gap-1">
          <input
            ref={inputRef}
            className=" w-full p-2 border border-dashed border-gray-300 bg-inherit outline-none rounded-md"
            type="text"
            placeholder="Type a message..."
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMsg();
              }
            }}
          />
          <button className=" w-20 border border-green-300 bg-green-300 hover:bg-green-200 text-gray-900 rounded-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
