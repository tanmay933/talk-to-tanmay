import { useState, useEffect, useRef } from "react";

function App() {
    const [name, setName] = useState("");
    const [started, setStarted] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    // Wake up the production backend when the site opens.
    useEffect(() => {
        fetch("https://talk-to-tanmay-backend.onrender.com/health")
            .catch(() => {
                // Backend may still be waking up.
            });
    }, []);

    useEffect(() => {
        if (started && inputRef.current) {
            inputRef.current.focus();
        }
    }, [started]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    function startChat() {
        if (!name.trim()) return;
        setStarted(true);
    }

    async function sendMessage() {
        if (!message.trim() || loading) return;

        const userMessage = message;

        setMessages((prev) => [
            ...prev,
            { role: "user", content: userMessage }
        ]);

        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(
                "https://talk-to-tanmay-backend.onrender.com/api/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        message: userMessage,
                        history: messages.slice(-6)
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.response
                }
            ]);
        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Bro, something went wrong 😭"
                }
            ]);
        } finally {
            setLoading(false);
        }
    }

    if (!started) {
        return (
            <div className="welcome">
                <div className="welcome-content">
                    <div className="welcome-header">
                        <h1>Talk to Tanmay</h1>
                        <p className="welcome-subtitle">Who are you?</p>
                    </div>

                    <div className="welcome-form">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    startChat();
                                }
                            }}
                            placeholder="Enter your name"
                            className="welcome-input"
                            autoFocus
                        />

                        <button
                            onClick={startChat}
                            className="welcome-button"
                            disabled={!name.trim()}
                        >
                            Start Chat
                        </button>
                    </div>

                    <p className="welcome-hint">Press Enter to continue</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <div>
                        <h1 className="header-title">Talk to Tanmay</h1>
                        <span className="header-subtitle">
                            Chatting as {name}
                        </span>
                    </div>
                </div>
            </header>

            <main className="chat">
                <div className="chat-container">
                    {messages.length === 0 && !loading && (
                        <div className="empty-state">
                            <div className="empty-content">
                                <h2>Hey {name} 👋</h2>
                                <p>What's on your mind?</p>
                            </div>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message-wrapper ${msg.role}`}
                        >
                            <div className={`message ${msg.role}`}>
                                <div className="message-content">
                                    {msg.content}
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="message-wrapper assistant">
                            <div className="message assistant loading">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>
            </main>

            <div className="input-area">
                <div className="input-container">
                    <input
                        ref={inputRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        placeholder="Type a message..."
                        disabled={loading}
                        className="message-input"
                    />

                    <button
                        onClick={sendMessage}
                        disabled={loading || !message.trim()}
                        className="send-button"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line
                                x1="22"
                                y1="2"
                                x2="11"
                                y2="13"
                            ></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;