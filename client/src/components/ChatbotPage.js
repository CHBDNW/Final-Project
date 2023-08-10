import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getChatbotResponse } from './SpoonacularAPI'; 
import './ChatbotPage.css'; 

const ChatbotPage = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const response = await getChatbotResponse(userInput); 
    const newChatHistory = [...chatHistory, { text: userInput, isUser: true }, { text: response.answerText, isUser: false }];
    
    setChatHistory(newChatHistory);
    setUserInput('');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="ChatbotPage">
      <h2>Ask Me Anything</h2>
      <div className="UserInput">
        <input type="text" value={userInput} onChange={handleUserInput} placeholder="Ask a question" />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div className="Dropdown">
        <button className="Dropdown-toggle" onClick={toggleDropdown}>
          What can I ask?
        </button>
        {showDropdown && (
          <div className="Dropdown-content">
            <p>Ask for recipes like 'chicken recipes' or 'spaghetti with shrimp'</p>
            <p>Ask for nutrient contents like 'vitamin a in 2 carrots' or 'calories is 1 cup of butter'</p>
            <p>Convert something with '2 cups of butter in grams'</p>
            <p>Check out foodie gifts by saying 'show me some foodie gifts'</p>
            <p>Find food substitutes by saying 'what is a substitute for flour'</p>
            <p>Thirsty? Ask for wine pairings like 'which wine goes well with spaghetti carbonara'</p>
            <p>If you want more results, just say 'more'</p>
            <p>For more similar results say 'more like the first/second/third...'</p>
            <p>Let spoonacular tell you a joke, just say 'tell me a joke'.</p>
            <p>Want to learn some food trivia, just say 'food trivia'.</p>
          </div>
        )}
      </div>
      <div className="ChatHistory">
        {chatHistory.map((message, index) => (
          <div key={index} className={message.isUser ? 'UserMessage' : 'BotMessage'}>
            {message.text}
          </div>
        ))}
        <div className="PersonAnimation">
          <div className="PersonBubble">
            <span>...</span>
          </div>
        </div>
      </div>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default ChatbotPage;
