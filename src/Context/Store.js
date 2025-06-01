import { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatbotContext = createContext();

function Store({ children }) {
    const BASE_URL = "https://json-server-6r7i.onrender.com";
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [botResponse, setBotResponse] = useState({});
    const messagesEndRef = useRef(null);
    useEffect(() => {
        axios.get(`${BASE_URL}/ChatBot`)
            .then((response) => {
                const responseObj = {};
                response.data.forEach((item) => {
                    responseObj[item.key.toLowerCase()] = item.response;
                });
                setBotResponse(responseObj);
            })
            .catch((error) => {
                console.error("Error fetching bot responses:", error);
            });
    }, []);

    const postBotResponse = () => {
        if (!userMessage.trim()) return;

        const userMsg = { sender: 'user', text: userMessage };
        const lowerCaseMsg = userMessage.trim().toLowerCase();
        const responseText = botResponse[lowerCaseMsg] || "Sorry, I don't have information about that product.";
        const botMsg = { sender: 'bot', text: responseText };

        setMessages((prev) => [...prev, userMsg, botMsg]);
        setUserMessage("");
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <ChatbotContext.Provider value={{
            messages,
            setMessages,
            userMessage,
            setUserMessage,
            botResponse,
            setBotResponse,
            postBotResponse,
            messagesEndRef
        }}>
            {children}
        </ChatbotContext.Provider>
    );
}

export const useChatbotContext = () => useContext(ChatbotContext);
export default Store;
