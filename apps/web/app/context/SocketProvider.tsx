"use client";
import React, { useCallback, useContext, useEffect } from "react";
import { io } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}
interface ISocketContext {
  sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
    console.log("Send Message", msg);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");

    _socket.on("connect", () => {
      console.log("Socket connected");
    });

    _socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    _socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    return () => {
      _socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
