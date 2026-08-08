import React, { useEffect, useState, useRef } from 'react';
import socket from '../services/socket';
import { fetchChatHistory } from '../services/api';
import { useParams } from 'react-router-dom';

const ChatWindow = ({ user }) => {
  const { consultationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.emit('joinRoom', consultationId);

    const handleReceiveMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on('receiveMessage', handleReceiveMessage);
    socket.on('new-message', handleReceiveMessage);

    const loadHistory = async () => {
      try {
        const res = await fetchChatHistory(consultationId);
        if (res.data?.data) {
          setMessages(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching chat history:', err);
      }
    };

    loadHistory();

    return () => {
      socket.emit('leaveRoom', consultationId);
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('new-message', handleReceiveMessage);
    };
  }, [consultationId]);

  const sendMessage = (e) => {
    if (e) e.preventDefault();
    if (input.trim() === '') return;

    const messageData = {
      sender: user?.username || 'User',
      content: input.trim(),
      text: input.trim(),
      consultationId,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    socket.emit('sendMessage', messageData);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => {
          const isMine = msg.sender === (user?.username || 'User');
          return (
            <div key={i} className={`message ${isMine ? 'user' : 'doctor'}`}>
              <strong>{msg.sender}:</strong> {msg.content || msg.text}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
