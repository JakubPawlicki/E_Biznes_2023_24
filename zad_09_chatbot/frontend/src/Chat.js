import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from './Message';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [botTyping, setBotTyping] = useState(false);
    const [isEnded, setIsEnded] = useState(false);

    useEffect(() => {
        const fetchInitialMessage = async () => {
            try {
                const response = await axios.get('http://localhost:8000/openings/');
                const initialBotMessage = { text: response.data.message, sender: 'bot' };
                setMessages([initialBotMessage]);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchInitialMessage();
    }, []);

    const handleSendMessage = async () => {
        if (input.trim() && !isEnded) {
            const userMessage = { text: input, sender: 'user' };
            setMessages([...messages, userMessage]);
            setInput('');

            setBotTyping(true);

            try {
                const response = await fetch('http://localhost:11434/api/generate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'gemma:2b',
                        prompt: input,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let botResponse = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    botResponse += decoder.decode(value);
                }

                const botMessages = botResponse.split('\n').filter(line => line.trim() !== '').map(JSON.parse);
                const botFinalResponse = botMessages.map(msg => msg.response).join(' ');

                const botMessage = { text: botFinalResponse, sender: 'bot' };
                setMessages((prevMessages) => [...prevMessages, botMessage]);

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }

            setBotTyping(false);
        }
    };

    const handleEndChat = async () => {
        setIsEnded(true);

        try {
            const response = await axios.get('http://localhost:8000/endings/');
            const endBotMessage = { text: response.data.message, sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, endBotMessage]);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} sender={msg.sender} />
                ))}
                {botTyping && <Message text="Bot is typing..." sender="bot" />}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    disabled={isEnded}
                />
                <button onClick={handleSendMessage} disabled={isEnded}>Send</button>
                <button onClick={handleEndChat} disabled={isEnded}>End</button>
            </div>
        </div>
    );
}

export default Chat;
