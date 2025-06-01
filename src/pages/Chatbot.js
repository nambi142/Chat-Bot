import { useChatbotContext } from '../Context/Store';
import { FaCartShopping } from "react-icons/fa6";
import '../Css/Chatbot.css';

function Chatbot() {
    const { messages, userMessage, setUserMessage, postBotResponse, messagesEndRef } = useChatbotContext();

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1>Walmart</h1>
                <p>How can I help you?</p>
                <h1><FaCartShopping/></h1>
            </div>

            <div className="chat-messages" id="chat-messages">
                <div className="messages bot-message">
                    <p>Welcome to Walmart<br />Ask me where any grocery products is located.</p>
                </div>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                        <p>{msg.text}</p>
                    </div>
                ))}
                <div ref = {messagesEndRef}/>
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
