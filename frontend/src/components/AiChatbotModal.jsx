import React, { useState } from "react";
import axios from "axios";
import { X, Send, Sparkles } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || window.location.origin;

export default function AiChatbotModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your RouteIQ AI Assistant. Ask me about live bus tracking, fares, ETAs, or route optimization!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/ai/chatbot`, {
        prompt: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: res.data?.reply || "I am here to assist with your bus transit needs." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "RouteIQ AI: Unable to reach prediction server. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[2000]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-gradient-to-tr from-[#4F6BF6] to-[#8B5CF6] hover:from-[#3B5BDB] hover:to-[#7C3AED] text-white rounded-full shadow-2xl shadow-[#4F6BF6]/30 flex items-center gap-2 font-extrabold text-xs transition transform hover:scale-105"
        >
          <Sparkles className="w-6 h-6 animate-bounce" />
          <span className="hidden sm:inline">Ask RouteIQ AI</span>
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-[#111827] border border-[#374151]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[480px]">
          {/* Header */}
          <div className="p-4 bg-[#0A0E1A] border-b border-[#374151]/40 flex items-center justify-between text-[#F9FAFB]">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#8B5CF6]/15 text-[#8B5CF6] rounded-xl">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs">RouteIQ AI Transit Assistant</h4>
                <p className="text-[10px] text-[#34D399] font-bold">Online · ML Prediction Engine</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9CA3AF] hover:text-[#F9FAFB] font-bold p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0A0E1A]/50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#4F6BF6] text-white font-medium"
                      : "bg-[#1F2937] text-[#F9FAFB] border border-[#374151]/40"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-[10px] text-[#22D3EE] font-bold animate-pulse">
                AI Assistant is thinking...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-[#0A0E1A] border-t border-[#374151]/40 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about fares, ETAs, routes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2 bg-[#1F2937]/60 border border-[#374151]/40 rounded-xl text-xs text-[#F9FAFB] focus:outline-none focus:border-[#4F6BF6] placeholder-[#9CA3AF]"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2.5 bg-[#4F6BF6] hover:bg-[#3B5BDB] text-white rounded-xl transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
