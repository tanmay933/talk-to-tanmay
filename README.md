# Talk to Tanmay

A personalized AI chatbot that talks like Tanmay.

The chatbot uses the name of the person chatting with it to choose the appropriate conversational style and context. Known people can get a more personalized experience, while new or unknown users get a general Tanmay persona without access to private information.

<p align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-8b5cf6?style=for-the-badge)](https://talk-to-tanmay.onrender.com)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-111827?style=for-the-badge)](https://openrouter.ai/)

</p>

---

## Live Demo

**[talk-to-tanmay.onrender.com](https://talk-to-tanmay.onrender.com)**

Open the site, enter your name, and start talking.

---

## What it does

The idea is simple:

- Enter your name
- The backend figures out which profile applies
- A suitable persona and recent conversation context are selected
- The request is sent to the LLM through OpenRouter
- The response comes back in Tanmay's style

Known people can receive additional context that is specific to them.

Unknown users can still use the chatbot, but private personal context is not exposed to them.

---

## How it works

~~~text
                    User
                     │
                     ▼
              React Frontend
                     │
                     ▼
             Express Backend
                     │
                     ▼
              Profile Resolver
                     │
                     ▼
          Persona + Recent Messages
                     │
                     ▼
                 OpenRouter
                     │
                     ▼
                 AI Response
~~~

The important part is the **Profile Resolver**.

Instead of giving every user the same prompt, the backend first determines who is talking and builds the context accordingly.

---

## Features

- Name-based profile selection
- Different conversational styles for different people
- General Tanmay persona for unknown users
- Recent conversation history
- Private personal context kept outside the public repository
- Responsive React UI
- Dark neon-purple interface
- Separate frontend and backend services
- Lightweight backend health endpoint
- Deployed online

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| AI | OpenRouter |
| Deployment | Render |
| Styling | CSS |

---

## Project Structure

~~~text
talk-to-tanmay/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── prompts/
│       ├── routes/
│       ├── services/
│       └── server.js
│
├── frontend/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── data/
│   └── private/
│
├── .gitignore
└── README.md
~~~

---

## Privacy

Private persona data is intentionally kept outside the public repository.

`.env` and `data/private/` are ignored by Git, and private configuration is provided separately in production.

The public repository contains the application logic, not the private information used to personalize it.

---

## Why keep it simple?

This project doesn't need a database, RAG pipeline, or complicated memory system right now.

The amount of personal context is relatively small, so keeping recent messages and selecting the relevant profile is enough for the current use case.

That keeps the system:

- cheaper to run
- easier to understand
- easier to maintain
- faster to iterate on

If the project eventually needs persistent conversations or a much larger knowledge base, the architecture can be extended later.

---

## Deployment

The frontend and backend are deployed separately on Render.

The frontend is a static React/Vite application, while the backend runs as an Express service.

The backend also exposes a lightweight health endpoint that can be used by the frontend to wake the service when someone opens the site.

---

## Future Improvements

Some things that could be improved as the project grows:

- Better profile matching
- More consistent personas
- Better conversational examples
- Optional conversation persistence
- Better monitoring and error handling
- More granular access to personal context

For now, the goal is to keep the project small, understandable, and actually useful.

---

## Author

**Tanmay Mittal**

Built as a fun personal project to experiment with AI personas, conversational context, and full-stack deployment.