# LightChat

A lightweight real-time group chat application built with Node.js, Socket.IO, and vanilla JavaScript.

LightChat lets multiple users join a shared chat session, exchange messages instantly, see join/leave notifications, and receive audio feedback for incoming messages.

## Features

- Real-time messaging between connected users
- Name prompt when joining the chat
- Join and leave notifications
- Socket-based user tracking
- Dynamic message rendering without page reloads
- Incoming-message audio notifications
- Simple responsive chat interface
- No framework required on the frontend

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js |
| Real-time communication | Socket.IO |
| Package manager | npm |
| Local frontend server | VS Code Live Server |

## Project Structure

```text
lightchat-app/
├── index.html              # Main chat interface
├── icon.png                # Application logo
├── sound0.mp3              # Incoming-message sound effects
├── sound1.mp3
├── sound2.mp3
├── sound3.mp3
├── css/
│   └── style.css           # Chat UI styling
├── js/
│   └── client.js           # Browser-side Socket.IO logic
└── nodeserver/
    ├── index.js            # Socket.IO server
    ├── package.json        # Server dependencies
    └── package-lock.json
```

## How It Works

The application has two parts:

1. **Frontend**  
   The browser loads `index.html`, connects to the Socket.IO server, prompts the user for a name, displays messages, and plays notification sounds.

2. **Backend**  
   The Node.js server listens on port `8000`. It stores the names of connected users against Socket IDs and broadcasts events to other connected clients.

### Socket Events

| Event | Sent by | Purpose |
| --- | --- | --- |
| `new-user-joined` | Client | Sends the joining user's name to the server |
| `user-joined` | Server | Notifies other users that someone joined |
| `send` | Client | Sends a chat message to the server |
| `receive` | Server | Broadcasts a message to other connected users |
| `left` | Server | Notifies users when someone disconnects |
| `disconnect` | Socket.IO | Triggered automatically when a client leaves |

## Getting Started

### Prerequisites

Install the following first:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (included with Node.js)
- VS Code with the **Live Server** extension, or another local static-file server

### Installation

Clone the repository:

```bash
git clone https://github.com/killerop4689/lightchat-app.git
cd lightchat-app/nodeserver
```

Install server dependencies:

```bash
npm install
```

Start the Socket.IO server:

```bash
node index.js
```

The server will run on:

```text
http://localhost:8000
```

### Run the Frontend

1. Open the project root folder in VS Code.
2. Open `index.html`.
3. Right-click inside the file and select **Open with Live Server**.
4. Open the generated URL, usually:

```text
http://127.0.0.1:5500/index.html
```

5. Enter a name when prompted.
6. Open the same URL in a second browser tab or browser window and join with a different name.
7. Send messages between the tabs.

## Configuration Notes

The server currently allows requests from this local frontend origin:

```js
http://127.0.0.1:5500
```

The Socket.IO server runs on port:

```text
8000
```

If you change the frontend port or host, update the CORS configuration in `nodeserver/index.js`.

## Current Limitations

- Messages are not saved; refreshing the page clears the chat
- There is no user authentication
- All connected users share one common chat
- There are no private messages or chat rooms
- The app is currently configured for local development

## Future Improvements

- Add chat rooms and private group conversations
- Store users and messages in a database
- Add registration, login, and authentication
- Show a live online-users list
- Add timestamps and message delivery status
- Improve mobile responsiveness
- Deploy the frontend and server for public access

## License

This project is intended for personal learning and educational purposes.
