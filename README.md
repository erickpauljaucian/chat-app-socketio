# ChatCord App
Realtime chat app with websockets using Node.js, Express and Socket.io with Vanilla JS on the frontend with a custom UI
[![Run on Repl.it](https://repl.it/badge/github/bradtraversy/chatcord)](https://repl.it/github/bradtraversy/chatcord)
## Usage
```
npm install
npm run dev

Go to localhost:3000
```

## Notes
The *_html_css* folder is just a starter template to follow along with the tutorial at https://www.youtube.com/watch?v=jD7FnbI76Hg&t=1339s. It is not part of the app


## Scripts
- npm init -> initialize package.json (in root)
- npm install express socket.io moment (format dates and time)
- npm install -D nodemon (dont restart server when there's a change)

## Socket io
- socket.emit('message', 'welcome') -> to client connecting only
- socket.broadcast.emit() -> all client except the client connecting
- io.emit() -> all clients