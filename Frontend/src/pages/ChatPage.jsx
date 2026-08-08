import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import socket from '../services/socket';
import { getConsultationMessages, fetchChatHistory } from '../services/api';
import { toast } from 'react-toastify';
import './ChatPage.css';

const ChatPage = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [partnerName, setPartnerName] = useState('Doctor');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const currentUserType = localStorage.getItem('doctorToken') ? 'doctor' : 'user';
  const currentUsername =
    localStorage.getItem('doctorName') ||
    localStorage.getItem('username') ||
    (currentUserType === 'doctor' ? 'Doctor' : 'User');

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        let historyData = [];
        try {
          const res = await getConsultationMessages(consultationId);
          if (res.data?.messages) {
            historyData = res.data.messages;
            if (res.data.patientName) setPartnerName(res.data.patientName);
          }
        } catch (e) {
          const fallbackRes = await fetchChatHistory(consultationId);
          historyData = fallbackRes.data?.data || [];
        }
        setMessages(historyData);
      } catch (err) {
        console.error('Error loading chat history:', err);
      } finally {
        setLoading(false);
      }
    };

    loadChatHistory();

    if (!socket.connected) {
      socket.connect();
    }

    setIsConnected(socket.connected);

    const onConnect = () => {
      setIsConnected(true);
      socket.emit('joinRoom', consultationId);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const handleReceiveMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receiveMessage', handleReceiveMessage);
    socket.on('new-message', handleReceiveMessage);

    if (socket.connected) {
      socket.emit('joinRoom', consultationId);
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('new-message', handleReceiveMessage);
      socket.emit('leaveRoom', consultationId);
    };
  }, [consultationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!newMessage.trim()) return;

    const msgPayload = {
      consultationId,
      sender: currentUsername,
      content: newMessage.trim(),
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    socket.emit('sendMessage', msgPayload);
    setNewMessage('');
  };

  if (loading) {
    return <div className="page-container glass-card" style={{ textAlign: 'center' }}>Loading consultation chat...</div>;
  }

  return (
    <div className="page-container">
      <div className="chat-container">
        <header className="chat-header">
          <div>
            <h2>💬 Consultation Chat</h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Room ID: {consultationId} • Logged in as: <strong>{currentUsername}</strong>
            </p>
          </div>
          <span className={`confidence-badge ${isConnected ? '' : 'btn-secondary'}`}>
            {isConnected ? '🟢 Live Connected' : '🟡 Reconnecting...'}
          </span>
        </header>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '2rem' }}>
              No messages yet. Send a greeting to start the consultation!
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMine =
                msg.sender === currentUsername ||
                (currentUserType === 'user' && msg.sender === 'user') ||
                (currentUserType === 'doctor' && msg.sender === 'doctor');
              return (
                <div key={index} className={`message ${isMine ? 'user' : 'doctor'}`}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.85, marginBottom: '2px' }}>
                    {msg.sender || (isMine ? 'You' : partnerName)}
                  </div>
                  <p>{msg.content || msg.text}</p>
                  <div style={{ fontSize: '0.7rem', opacity: 0.75, textAlign: 'right', marginTop: '4px' }}>
                    {msg.time || new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your clinical message or question..."
          />
          <button type="submit" className="btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
