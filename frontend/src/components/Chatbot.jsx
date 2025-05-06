import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown"; // To render bot replies with Markdown formatting
import LoadingSpinner from "./LoadingSpinner"; // Spinner component during API call
import geminiAPI from "../api/geminiAPI"; // Your function to call Gemini AI
import { BsRobot, BsLightbulb } from "react-icons/bs"; // Icons for UI
import { IoSend } from "react-icons/io5"; // Send button icon

const Chatbot = () => {
  // State to hold all chat messages (user and bot)
  const [messages, setMessages] = useState([]);
  
  // State for the current user input in textarea
  const [input, setInput] = useState("");
  
  // State to indicate whether a message is being processed
  const [loading, setLoading] = useState(false);

  // Ref to automatically scroll to bottom when new message appears
  const chatEndRef = useRef(null);

  // Ref to automatically focus the input when component mounts
  const inputRef = useRef(null);

  // Example prompts to suggest when there are no conversations yet
  const examplePrompts = [
    "Explain quantum computing in simple terms",
    "How do I make a REST API in Node.js?",
    "What's the difference between React and Vue?",
    "Suggest some healthy breakfast ideas"
  ];

  // Scroll to the bottom whenever new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus the input field on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle pressing Enter to send message (Shift+Enter for newline)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Function to send the user message and get the bot response
  const sendMessage = async () => {
    if (!input.trim() || loading) return; // Do nothing if input is empty or already loading

    // Create user message and update messages list
    const userMessage = { text: input, sender: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput(""); // Clear input field
    setLoading(true); // Show loading spinner

    try {
      // Send the user's input to Gemini API
      const response = await geminiAPI(input);

      // Create bot message and update chat history
      const botMessage = { text: response, sender: "bot" };
      setMessages([...newMessages, botMessage]);

      // Save the conversation (question + answer) to your backend
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, answer: response }),
      });
    } catch (error) {
      console.error("Error:", error);
      // Show error message from bot if API fails
      setMessages([...newMessages, { 
        text: "Sorry, I encountered an error. Please try again.", 
        sender: "bot" 
      }]);
    } finally {
      setLoading(false); // Hide loading spinner after response/error
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 pb-0 space-y-4">
        {messages.length === 0 ? (
          // Empty state: Show welcome message and example prompts
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="p-4 rounded-full mb-4 bg-gray-100">
              <BsRobot className="text-3xl text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">How can I help you today?</h2>
            <p className="text-sm mb-6 text-gray-600">
              Ask me anything and I'll do my best to assist you.
            </p>

            {/* Example Prompts Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)} // When clicked, fill prompt into input box
                  className="p-3 rounded-lg text-left text-sm bg-gray-100 hover:bg-gray-200 border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <BsLightbulb className="flex-shrink-0 text-yellow-500" />
                    <span>{prompt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Display each message */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] lg:max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none" // Styling for user message
                      : "bg-gray-200 text-black rounded-bl-none" // Styling for bot message
                  }`}
                >
                  {/* Render text with Markdown formatting */}
                  <ReactMarkdown className="prose max-w-none">
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            
            {/* Loading spinner during bot response */}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-lg rounded-bl-none bg-gray-200">
                  <LoadingSpinner size="sm" />
                </div>
              </div>
            )}
          </>
        )}
        {/* Dummy div to always scroll to bottom */}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-end gap-2">
          {/* Input Textarea */}
          <div className="flex-grow rounded-lg bg-gray-100">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-3 rounded-lg resize-none focus:outline-none bg-gray-100 text-black"
              placeholder="Type your message..."
              rows="1"
              style={{ minHeight: '50px', maxHeight: '150px' }} // Auto-grow limits
            />
          </div>

          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading} // Disabled if input is empty or loading
            className={`p-3 rounded-lg flex items-center justify-center ${
              !input.trim() || loading
                ? "bg-gray-300 text-gray-500" // Disabled styling
                : "bg-blue-500 text-white hover:bg-blue-600" // Active styling
            }`}
            aria-label="Send message"
          >
            <IoSend className="text-lg" />
          </button>
        </div>
        {/* Input instruction */}
        <p className="text-xs mt-2 text-center text-gray-400">
          Press Shift+Enter for a new line
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
