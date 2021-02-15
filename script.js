const messageModal = document.querySelector('#newMessageDialog');
const messageForm = document.querySelector('#message-form');
const newMessageModalBtn = document.querySelector('#new-message-modal-btn');
const closeModalBtn = document.querySelector('#close-dialog-btn');
let messagesContainer = document.querySelector('#message-container');

async function fetchMessages(messagesEndpoint) {
  const response = await fetch(messagesEndpoint);
  const data = await response.json();

  return data;
}

const displayMessages = (data) => {
  let messageNum = 1;

  data.forEach(obj => {
    const messageMarkup = 
      `<div class="nes-container with-title message-box" id="message-${messageNum}">
         <p class="title">${obj.title}</p>
         <p>${obj.text}</p>
         <a class="nes-btn is-error is-small" id="delete-message-${messageNum}">Delete</a>

         <div class="confirm-controls-container" id="confirm-controls-${messageNum}">
           <a href="http://localhost:3000/message/${obj._id}/delete" class="nes-btn is-success is-small">Yes</a>
           <a href="" class="nes-btn is-error is-small">No</a>
         </div>
       </div>`;
   
    messagesContainer.insertAdjacentHTML('beforeend', messageMarkup);
    
    document.querySelector(`#delete-message-${messageNum}`).addEventListener('click', (e) => {
      e.target.style.display = 'none';
    });
    
    messageNum++;
  });
}

const deleteMessage = (id) => {
  console.log(id);
}

const postForm = (body) => {
  return fetch('http://localhost:3000/message/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
}

const handleSubmit = (e) => {
  e.preventDefault();
  const body = JSON.stringify(Object.fromEntries(new FormData(e.target)));

  messageModal.close();
  postForm(body);
  
  fetchMessages('http://localhost:3000/messages').then(data => {
    displayMessages(data);
  });
}

messageForm.addEventListener('submit', handleSubmit);

newMessageModalBtn.addEventListener('click', () => {
  messageModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
  messageModal.close();
});

fetchMessages('http://localhost:3000/messages').then(data => {
  displayMessages(data);
});

