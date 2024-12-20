"use client";

import React, {useState, useEffect} from "react";
import Image from "next/image";
import io from 'socket.io-client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const socket = io('http://localhost:8000/');
console.log(socket);

export default function Home() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faPlay} width={25} />
            Start now
          </a>
        </div>
      </main>
    </div>
  );
}
