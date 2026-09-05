const socket = io('http://localhost:8000');

//Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")


//Audios that will play on recieved message
var sounds = [ audio0 = new Audio('sound0.mp3'),
 audio1 = new Audio('sound1.mp3'),
 audio2 = new Audio('sound2.mp3'),
 audio3 = new Audio('sound3.mp3')]
    

var int = 0;

// Function which will append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
       sounds[int%4].play();
       int++;
        
    }
}


//Ask new user for his name and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//if new user join,receive the name and notify all the other users
socket.on('user-joined' , name =>{
    append(`${name} joined the chat`,'right')
})

//if server sends a message,receive it
socket.on('receive' , data =>{
    append(`${data.name} : ${data.message}`,'left')
})

//if a user leavs the chat ,append the info to the container
socket.on('left' , name =>{
    append(`${name} is no more online!!`,'right')
})

//if the form gets submitted, send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value = ''
})