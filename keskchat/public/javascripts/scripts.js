//this file is responsible for data transmission
const socket = io();

//logs messages from socket
socket.on('clients-total', (data) =>{
    console.log(data);
})

//connecting the elements from the html document to the script folder
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageName = document.getElementById('message-name');
const nameBtn = document.getElementById('save-name');
const totalUsers = document.getElementById('counts');

//creating an event on the submit button
messageForm.addEventListener('submit', (event) =>
{
    //preventing default redirect and sending message
    event.preventDefault();
    sendMessage();
});

//this function will send a message when the send button is pressed
function sendMessage()
{
    //preventing empty messages
    if(messageInput.value === ''){}
    else
    {
        //creating message package
        console.log(messageInput.value);
        var data = 
        {
            name: nameInput.value,
            message: messageInput.value
        }
    
        //this is needed for detecting messages
        socket.emit('message', data)
        addMessage(true, data);
        messageInput.value = "";
    }
    
}

// showing number of users in chat room
socket.on('user-counts', (data) => {
    totalUsers.textContent = data
})

//will call the addMessage on message received
socket.on('chat-message', (data) =>
{
    addMessage(false, data);
})

//this function will handle the messages
function addMessage(isSender, data)
{
    clearUserTyping();
    //determine which side of the message box it ends up on
    if(isSender)
    {
        var element = '<li class="message-right"><p class="message-name">' + data.name + '</p><p class="message">' + data.message + '</p></li>'; 
    } 
    else
    {
        var element = '<li class="message-left"><p class="message-name">' + data.name + '</p><p class="message">' + data.message + '</p></li>';
    } 
    
    //adding elements
    messageContainer.innerHTML += element;

}


//disabling name input once a chat name have been entered
nameBtn.addEventListener('click', (event) =>
{
    saveChatName();
});

function saveChatName() {
    nameInput.disabled = true;
}