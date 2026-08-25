import { useState } from "react";

function App() {
    const [name, setName] = useState("");
    const [started, setStarted] = useState(false);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    function startChat() {
        if (!name.trim()) return;
        setStarted(true);
    }

    async function sendMessage() {
        if (!message.trim()) return;

        const userMessage = message;

        setMessages((prev) => [
            ...prev,
            { role: "user", content: userMessage }
        ]);

        setMessage("");

        try {
            const response = await fetch("http://localhost:8000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    message: userMessage,
                    history: messages.slice(-6)
                })
            });

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.response
                }
            ]);
        } catch (error) {
            console.error(error);
        }
    }

    if (!started) {
        return (
            <div>
                <h1>Talk to Tanmay</h1>

                <p>Who are you?</p>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            startChat();
                        }
                    }}
                    placeholder="Enter your name"
                />

                <button onClick={startChat}>
                    Start talking
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1>Talk to Tanmay</h1>

            <p>Talking as: {name}</p>

            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>
                            {msg.role === "user" ? "You" : "Tanmay AI"}:
                        </strong>{" "}
                        {msg.content}
                    </div>
                ))}
            </div>

            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                }}
                placeholder="Talk to Tanmay..."
            />

            <button onClick={sendMessage}>
                Send
            </button>
        </div>
    );
}

export default App;