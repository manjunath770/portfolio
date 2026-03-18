import React, { useState , useEffect} from "react";
import styled from "styled-components";

const ChatbotIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color:rgb(192, 37, 240);
  color: white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background-color:rgb(195, 22, 248);
  color: white;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  text-align: center;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const UserMessage = styled.div`
  align-self: flex-end;
  background: linear-gradient(90deg, rgba(140, 70, 230, 1) 0%, rgba(192, 37, 240, 1) 100%);
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 10px;
  max-width: 80%;
  word-wrap: break-word;
`;

const BotMessage = styled.div`
  align-self: flex-start;
  background: linear-gradient(90deg, rgba(230, 140, 255, 1) 0%, rgba(192, 80, 240, 1) 100%);
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 10px;
  max-width: 80%;
  word-wrap: break-word;
`;

const ChatInput = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;

  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
  }

  button {
    padding: 8px 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const ChatFooter = styled.div`
  font-size: 8px;
  color: gray;
  text-align: center;
  padding: 5px;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
`;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");


  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages([...messages, { sender: "user", text: input }]);

    try {
      // Send message to API
      const response = await fetch("https://rag-resume.onrender.com/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();
      const answer = data?.answer || "No response available.";
      console.log(answer)
      // Add API response to chat
      setMessages((prev) => [...prev, { sender: "bot", text:  answer }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: Unable to fetch response." }]);
    }

    setInput(""); // Clear input field
  };

  return (
    <>
      <ChatbotIcon onClick={() => setIsOpen(!isOpen)}>💬</ChatbotIcon>
      {isOpen && (
        <ChatWindow>
          <ChatHeader>Chat with Manoj's Assistant</ChatHeader>
          <ChatBody>
            {messages.map((msg, index) => (
              <MessageContainer key={index}>
                {msg.sender === "user" ? (
                  <UserMessage>{msg.text}</UserMessage>
                ) : (
                  <BotMessage>{msg.text}</BotMessage>
                )}
              </MessageContainer>
            ))}
          </ChatBody>
          <ChatInput>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </ChatInput>
          <ChatFooter>
            Assistant will answer questions relevant to Manoj's resume.<br />
            Assistant is in dev space; it may take time to respond.
          </ChatFooter>
        </ChatWindow>
      )}
    </>
  );
}

export default Chatbot;
