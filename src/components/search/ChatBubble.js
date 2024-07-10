import React from 'react';

const ChatBubble = ({ children, onClick, colors }) => (
  <button
    onClick={onClick}
    className="text-white px-4 py-2 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl text-sm hover:bg-opacity-80 transition-colors duration-200 max-w-xs break-words text-left"
    style={{ backgroundColor: colors.primary }}
  >
    {children}
  </button>
);

export default ChatBubble;