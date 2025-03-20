import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      sender: "ME",
      text: "Je suis un fournisseur vendant des produits électroniques...",
    },
    {
      sender: "AI",
      text: "Basé sur vos données, je recommande d'acheter 40 smartphones...",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "ME" }];
    setInput("");

    setMessages(newMessages);
  };

  return (
    <div className=" p-1 h-full">
      <Card className="p-4 space-y-4 h-[85%] overflow-y-auto border-none shadow-none">
        {messages.map((msg) => (
          <div
            key={msg.text}
            className={`flex items-center ${
              msg.sender === "ME" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "AI" && (
              <Avatar className="mr-4">
                <AvatarImage src="/ai-avatar.png" alt="AI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div className="p-3 rounded-lg text-black max-w-xs bg-gray-100">
              {msg.text}
            </div>
            {msg.sender === "ME" && (
              <Avatar className="ml-4">
                <AvatarImage src="/user-avatar.png" alt="User" />
                <AvatarFallback className="text-white bg-slate-900">
                  ME
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </Card>
      <div className="flex gap-2 mt-4 h-[10%]">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Empêche le saut de ligne dans Textarea
              sendMessage();
            }
          }}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
