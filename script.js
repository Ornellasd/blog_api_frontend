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
    const messageDiv = document.createElement('div');
    const title = document.createElement('p');
    const messageText = document.createElement('p');
 
    messageDiv.classList += 'nes-container with-title message-box';
    messageDiv.id = `message-${messageNum}`;
    title.classList += 'title';

    title.textContent = obj['title'];
    messageText.textContent = obj['text'];
   
    // change to only append new objects if they dont already exist or just redo messageContainer each time
    messageDiv.appendChild(title);
    messageDiv.appendChild(messageText);
   
    createDeleteMessageBtnContainer(messageDiv, messageNum);
    messagesContainer.appendChild(messageDiv);

    messageNum++;
  });
}

const createDeleteMessageBtnContainer = (messageDiv, messageNum) => {
  const deleteBtnContainer = document.createElement('div');
  const confirmBtnsContainer = document.createElement('div');
  const deleteBtn = document.createElement('a');
  const confirmBtn = document.createElement('a');
  const cancelBtn = document.createElement('a');

  deleteBtnContainer.classList = 'delete-btn-container';
  confirmBtnsContainer.classList += 'confirm-container';
  confirmBtnsContainer.id = `confirm-${messageNum}`;
  //confirmBtnsContainer.style.display = 'none';
  deleteBtn.classList += 'nes-btn is-error is-small';
  deleteBtn.textContent = 'Delete';
  deleteBtn.href = `http://localhost:3000/id/delete`;
  confirmBtn.classList += 'nes-btn is-success is-small';
  confirmBtn.textContent = 'Yes';
  cancelBtn.classList += 'nes-btn is-error is-small';
  cancelBtn.textContent = 'No';

  confirmBtnsContainer.appendChild(confirmBtn);
  confirmBtnsContainer.appendChild(cancelBtn);

  deleteBtnContainer.appendChild(deleteBtn);
  deleteBtnContainer.appendChild(confirmBtnsContainer);
  messageDiv.appendChild(deleteBtnContainer);  
}

const deleteBtnContainerToggle = () => {

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
