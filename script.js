const messageModal = document.querySelector('#newMessageDialog');
const messageForm = document.querySelector('#message-form');
const newMessageModalBtn = document.querySelector('#new-message-modal-btn');
const closeModalBtn = document.querySelector('#close-dialog-btn');
const messagesContainer = document.querySelector('#message-container');

async function fetchMessages(messagesEndpoint) {
  const response = await fetch(messagesEndpoint);
  const data = await response.json();

  return data;
}

const createMessageMarkup = (messageObj, messageNum) => {
  const messageMarkup = 
  `<div class="nes-container with-title message-box" id="message-${messageNum}">
     <p class="title">${messageObj.title}</p>
     <p>${messageObj.text}</p>
     <a class="nes-btn is-error is-small" id="delete-message-${messageNum}">Delete</a>
     <div class="confirm-controls-container" id="confirm-controls-${messageNum}">
       <a class="nes-btn is-success is-small">Yes</a>
       <a class="nes-btn is-error is-small">No</a>
     </div>
   </div>`;

   return messageMarkup;
}

const createDeleteMessageControls = (messageNum) => {
  const confirmControlsContainer = document.querySelector('#confirm-controls-' + messageNum);
  const confirmDeleteBtn = document.querySelector(`#delete-confirm-${messageNum}`);

  // When Delete button is clicked, hide delete button target and show confirm controls
  document.querySelector(`#delete-message-${messageNum}`).addEventListener('click', (e) => {
    handleDelete(e.target, confirmControlsContainer);
  });
}

const deleteControlsToggle = (deleteBtn, confirmControlsContainer) => {
  if(confirmControlsContainer.style.display !== 'block') {
    confirmControlsContainer.style.display = 'block';
    deleteBtn.style.display = 'none';
  } else {
    confirmControlsContainer.style.display = 'none';
    deleteBtn.style.display = 'block';
  }
}

const handleDelete = (deleteBtn, container) => {
  deleteControlsToggle(deleteBtn, container);

  container.addEventListener('click', (e) => {
    console.log(e.target.text)
    if(e.target.text === 'Yes') {
      console.log('DESTROYING');
    } else {
      // how to target delete button from here?
      deleteControlsToggle(deleteBtn, container);
    }
  });
}

const displayMessages = (data) => {
  let messageNum = 1;

  data.forEach(obj => {
    messagesContainer.insertAdjacentHTML('beforeend', createMessageMarkup(obj, messageNum));
    createDeleteMessageControls(messageNum);    
    messageNum++;
  });
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

