"use client";

import React, { useEffect, useState } from "react";
import { open } from "@play-ai/web-embed";

interface Event {
  name: string;
  when: string;
  data: {
    [key: string]: { type: string; description: string };
  };
}

export default function Page() {
  const [text, setText] = useState("Change this text");

  const webEmbedId = process.env.NEXT_PUBLIC_PLAY_AI_API_KEY;
  if (!webEmbedId) {
    throw new Error("AI_API_KEY is not set");
  }

  useEffect(() => {
    const events: Array<Event> = [
      {
        name: "transcription",
        when: "The user's speech is transcribed",
        data: {
          text: { type: "string", description: "The transcribed text" },
        },
      },
      {
        name: "ai-response",
        when: "The AI responds to the user",
        data: {
          text: { type: "string", description: "The AI's response text" },
        },
      },
      {
        name: "ai-speaking",
        when: "The AI starts or stops speaking",
        data: {
          speaking: { type: "boolean", description: "Whether the AI is speaking" },
        },
      },
    ] as const;

    const onEvent = (event: Event) => {
      switch (event.name) {
        case "transcription":
          setText(`You: ${event.data.text}`);
          break;
        case "ai-response":
          setText(`AI: ${event.data.text}`);
          break;
        case "ai-speaking":
          console.log("AI speaking:", event.data.speaking);
          break;
      }
    };

    open(webEmbedId, {
      events,
      onEvent,
    });
  }, []);

  return (
    <main className="min-h-screen p-4">
      <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
        <div className="font-medium text-2xl text-center max-w-2xl">AI Voice Chatbot For Appointment Scheduling</div>
        <div className="text-sm text-gray-500">
          Speak to interact with the AI
        </div>
      </div>
    </main>
  );
}
