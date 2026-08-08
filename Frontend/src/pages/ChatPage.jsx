import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import socket from '../services/socket';
import { getConsultationMessages, fetchChatHistory } from '../services/api';
import { StethoscopeIcon, ChatIcon, LockIcon, ArrowRightIcon } from '../components/Icons';
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
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '5rem 0' }}>
        <p style={{ color: 'var(--slate-600)' }}>Initializing encrypted telehealth room...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="chat-layout">
        {/* Left Sidebar: Session & Consultation Meta */}
        <div className="chat-sidebar">
          <div style={{ paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--slate-200)' }}>
            <span className="eyebrow" style={{ fontSize: '0.75rem' }}>Telehealth Consultation</span>
            <h4 style={{ fontSize: '1rem', margin: '0.25rem 0' }}>Room ID: {consultationId.slice(0, 10)}...</h4>
            <span className="status-badge" style={{ fontSize: '0.75rem', marginTop: '0.35rem' }}>
              <LockIcon size={12} /> Encrypted Session
            </span>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <span style={{ color: 'var(--slate-500)', fontSize: '0.75rem', display: 'block' }}>Logged in as:</span>
              <strong>{currentUsername}</strong> ({currentUserType})
            </div>
            <div>
              <span style={{ color: 'var(--slate-500)', fontSize: '0.75rem', display: 'block' }}>Consulting Partner:</span>
              <strong>{partnerName}</strong>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button
              className="btn btn-secondary"
              style={{ width: '100%', fontSize: '0.8rem', padding: '0.5rem' }}
              onClick={() => navigate(currentUserType === 'doctor' ? '/doctor/dashboard' : '/dashboard')}
            >
              ← Back to Portal
            </button>
          </div>
        </div>

        {/* Right Main: Conversation Window */}
        <div className="chat-main">
          <div className="chat-header-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-teal)' }}>
                <StethoscopeIcon size={18} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Clinical Consultation Channel</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                  {isConnected ? '🟢 Connection active' : '🟡 Reconnecting to server...'}
                </span>
              </div>
            </div>
          </div>

          <div className="chat-msg-area">
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--slate-400)', marginTop: '4rem', fontSize: '0.9rem' }}>
                <ChatIcon size={32} style={{ color: 'var(--slate-300)', marginBottom: '0.5rem' }} />
                <p>No messages in this session yet.<br />Type a message below to start your consultation.</p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isMine =
                  msg.sender === currentUsername ||
                  (currentUserType === 'user' && msg.sender === 'user') ||
                  (currentUserType === 'doctor' && msg.sender === 'doctor');
                return (
                  <div key={index} className={`msg-bubble ${isMine ? 'user' : 'doctor'}`}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, opacity: 0.85, marginBottom: '2px' }}>
                      {msg.sender || (isMine ? 'You' : partnerName)}
                    </div>
                    <div>{msg.content || msg.text}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.75, textAlign: 'right', marginTop: '4px' }}>
                      {msg.time || new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chat-footer-bar">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type message to doctor/patient..."
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
              Send <ArrowRightIcon size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
