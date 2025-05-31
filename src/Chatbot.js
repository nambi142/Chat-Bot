import { useChatbotContext } from './Store';
import { FaCartShopping } from "react-icons/fa6";
import Store from './Store'; 
import './Chatbot.css';

function Chatbot() {
    const { messages, userMessage, setUserMessage, postBotResponse } = useChatbotContext();

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1>Walmart</h1>
                <p>How can I help you?</p>
                <h1><FaCartShopping/></h1>
            </div>

            <div className="chat-messages" id="chat-messages">
                <div className="messages bot-message">
                    <p>Welcome to Big Bazaar<br />Ask me where any product is located.</p>
                </div>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    id="user-input"
                    placeholder="Ask about a product"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            postBotResponse();
                        }
                    }}
                />
                <button id="send-button" onClick={postBotResponse}>Send</button>
            </div>
        </div>
    );
}

export default Chatbot;
