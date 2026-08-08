const Chat = require('../models/Chat');
const Message = require('../models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 Socket client connected:', socket.id);

    // Join consultation room
    const handleJoin = (roomId) => {
      if (roomId) {
        socket.join(roomId);
        console.log(`✅ Socket ${socket.id} joined room: ${roomId}`);
      }
    };

    socket.on('joinRoom', handleJoin);
    socket.on('join-room', handleJoin);

    // Leave room
    const handleLeave = (roomId) => {
      if (roomId) {
        socket.leave(roomId);
        console.log(`🔴 Socket ${socket.id} left room: ${roomId}`);
      }
    };

    socket.on('leaveRoom', handleLeave);
    socket.on('leave-room', handleLeave);

    // Unified message sending
    const handleSendMessage = async (payload) => {
      try {
        const { consultationId, message, sender, content, text, from, to } = payload || {};
        const targetRoom = consultationId || to || from;
        const msgSender = sender || (message && message.sender) || from || 'user';
        const msgContent = content || text || (message && message.content) || '';

        if (!msgContent.trim()) return;

        const timestamp = new Date();
        const timeFormatted = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const messageData = {
          consultationId: targetRoom,
          sender: msgSender,
          senderType: msgSender.toLowerCase().includes('dr') || msgSender === 'doctor' ? 'doctor' : 'user',
          content: msgContent,
          text: msgContent,
          time: timeFormatted,
          timestamp: timestamp.toISOString()
        };

        // Persist to Message model if consultationId is valid ObjectId
        if (targetRoom && targetRoom.match(/^[0-9a-fA-F]{24}$/)) {
          const dbMsg = new Message({
            consultation: targetRoom,
            senderType: messageData.senderType,
            content: msgContent,
            timestamp
          });
          await dbMsg.save();
        }

        // Also persist to legacy Chat model
        const chatEntry = new Chat({
          from: msgSender,
          to: targetRoom || 'General',
          text: msgContent,
          timestamp
        });
        await chatEntry.save();

        // Broadcast to target room and sender
        if (targetRoom) {
          io.to(targetRoom).emit('receiveMessage', messageData);
          io.to(targetRoom).emit('new-message', messageData);
        } else {
          io.emit('receiveMessage', messageData);
          io.emit('new-message', messageData);
        }

      } catch (err) {
        console.error('❌ Failed to process socket message:', err.message);
      }
    };

    socket.on('sendMessage', handleSendMessage);
    socket.on('send-message', handleSendMessage);

    socket.on('disconnect', () => {
      console.log('🔴 Socket client disconnected:', socket.id);
    });
  });
};
