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

//will call the addMessage on message recieved
socket.on('chat-message', (data) =>
{
    addMessage(false, data);
})

//this function will handle the messages
function addMessage(isSender, data)
{
    //determine which side of the message box it ends up on
    if(isSender)
    {
        var element = '<li class="message-right"><p class="message">' + data.name + "-" + data.message + '</p></li>'; 
    } 
    else
    {
        var element = '<li class="message-left"><p class="message">' + data.name + "-" + data.message + '</p></li>'; 
    } 
    
    //adding element
    messageContainer.innerHTML += element;

}