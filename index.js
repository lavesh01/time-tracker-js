const taskComponentArea = document.getElementById("task-component-area");

const taskComponents = [];

// Get the current date

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const currentDate = new Date();

const dayOfWeek = daysOfWeek[currentDate.getDay()];
const month = monthsOfYear[currentDate.getMonth()];
const dayOfMonth = currentDate.getDate();

const year = currentDate.getFullYear();

const dateString = `${dayOfWeek}, ${month} ${dayOfMonth} ${year}`;


const inputField = document.querySelector('#task-class');
const taskName = document.getElementById('task-name');

let billColor;

// TIMER 
const startBtn = document.getElementById("start-btn");
const toggleText = document.getElementById("toggle-text");
const timeDisplay = document.getElementById("time-display");

let timerInterval; 
let prevTime;
let totalTime;

startBtn.addEventListener('click', () => {
  toggleText.innerText = toggleText.innerText === "Start" ? "Stop" : "Start";
  startBtn.classList.toggle("stop-btn");
  
  if (toggleText.innerText === "Stop") {
    let startTime = Date.now(); 
    timerInterval = setInterval(() => {
      let elapsedTime = Date.now() - startTime; 
      let formattedTime = formatTime(elapsedTime); 
    
      timeDisplay.innerText = formattedTime; 
      prevTime = timeDisplay.innerText;     
    }, 10);  
  } else {
    totalTime = prevTime
    
    clearInterval(timerInterval); 
    timeDisplay.innerText = "00:00:00"; 
    taskComponent();
    
    // taskComponentArea.style.visibility="visible";
  }  
});  


const taskComponent = () => {
  // Update TotalTime 
  const updateTime = document.getElementById("prev-time");
  updateTime.innerText=`Total Time: ${totalTime}`;
  
  // Update Date 
  const date = document.getElementById('date');
  date.innerText=dateString;

  // Update Task Name 
  const inputValue = inputField.value;
  taskName.append(inputValue);  
  inputField.value= "";

  // Update Project Name  
  const taskProjName = document.getElementById('task-project-name');
  taskProjName.innerText = `● ${selectedProjValue}`;
  selectedProject.innerText = "";


  // Update Tags 
  taskTags = document.getElementById('task-tags');
  taskTags.appendChild(displayTags);
  const mainTags = document.querySelector('#main-tags');
  mainTags.innerHTML = '';


  // // Update Dollar sign 
  const taskBill = document.querySelector('#task-bill');
  taskBill.appendChild(dollarBtn);
  dollarIcon.innerHTML="<i id='bill' class='fa-regular fa-dollar-sign'></i>";

}  

const toggleBtn = document.getElementById('toggle-btn');
const resumeTime = document.getElementById('resume-time');

toggleBtn.addEventListener('click', function() {
  toggleBtn.className = toggleBtn.className === 'fas fa-regular fa-play' ? 'fas fa-regular fa-stop' : 'fas fa-regular fa-play';

  if(toggleBtn.className === 'fas fa-regular fa-stop'){
    let startTime = Date.now(); 
    timerInterval = setInterval(() => {
      let elapsedTime = Date.now() - startTime;
      let formattedTime = formatTime(elapsedTime); 
      resumeTime.innerText = formattedTime;
    }, 10);  
  } else {
      let resumedTime = resumeTime.innerText;
      
      const [hours1, minutes1, seconds1] = prevTime.split(':').map(Number);
      const [hours2, minutes2, seconds2] = resumedTime.split(':').map(Number);

      let totalSeconds = seconds1 + seconds2;
      let totalMinutes = minutes1 + minutes2;
      let totalHours = hours1 + hours2;

      if (totalSeconds >= 60) {
        totalSeconds -= 60;
        totalMinutes++;
      }  

      if (totalMinutes >= 60) {
        totalMinutes -= 60;
        totalHours++;
      }  

      const result = `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;

      totalTime = result;
      prevTime = totalTime;
  
      clearInterval(timerInterval);
      resumeTime.innerText = "00:00:00";
      // taskComponent();
  }    
});  


function formatTime(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = Math.floor(totalSeconds % 60);
  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
}  

function formatNumber(number) {
  return number.toString().padStart(2, "0");
}  


// DOLLAR BILL 

const dollarIcon = document.querySelector(".bill-icon");
const dollarBtn = document.getElementById("bill");
dollarIcon.addEventListener('click', () => {
  dollarBtn.classList.toggle("bill-color");
})  


// TAGS 
let selectedTagValue;

const displayTags = document.querySelector('#display-tags');

const tagDropdownMenu = document.querySelector('#tag-dropdown-menu');
const tags = []; 

function populateTags() {
    tags.forEach(tag => {
        const tagItem = document.createElement('li');
        tagItem.classList.add('dropdown-item');
        tagItem.textContent = tag;
        tagDropdownMenu.appendChild(tagItem);
      });
    
    tagDropdownMenu.appendChild(form);
}

function addNewTag(tagName) {
    const tagItem = document.createElement('li');
    tagItem.innerHTML=`<a class="dropdown-item" data-value='${tagName}' >${tagName}</a>`
    tagDropdownMenu.insertBefore(tagItem, form); 
}

const form = document.createElement('form');
form.classList.add('px-1', 'pt-1');
const input = document.createElement('input');
input.type = 'text';
input.placeholder = '● Create New tag';
input.classList.add('form-control');

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const tagName = input.value.trim();
        if (tagName.length > 0) {
          addNewTag(tagName);
          input.value = '';
        }
    }
});

form.appendChild(input);

const dropdownToggle = document.querySelector('#tag-dropdown');
dropdownToggle.addEventListener('click', () => {
    populateTags();
});

tagDropdownMenu.addEventListener('click', function(event) {
    selectedTagValue = event.target.dataset.value;

    if(selectedTagValue) {
      const newTag = document.createElement('span');
      newTag.classList.add('tags');
      newTag.textContent = selectedTagValue;
  
      displayTags.appendChild(newTag);
    }
});


// CREATING NEW PROJECT 

let newprojectname;
let selectedProjValue;

const projDropdownMenu = document.querySelector('.dropdown-menu');
const newProjInput = document.querySelector('#newproject-name');
const selectedProject = document.getElementById('selected-project');

// Modal 
const projectModal = document.getElementById('projectModal');

if (projectModal) {
  
  projectModal.addEventListener('show.bs.modal', event => {
    newProjInput.focus();

  })

  const createButton = projectModal.querySelector('.start-btn');
  createButton.addEventListener('click', (event) => {
    
    const modalBodyInput = projectModal.querySelector('.modal-body input');
    newprojectname= modalBodyInput.value;

    const newProj = document.createElement('li');
    newProj.innerHTML=`<a class="dropdown-item" data-value="${newprojectname}">${newprojectname}</a>`;
    projDropdownMenu.appendChild(newProj);

    modalBodyInput.value = "";
    $('#exampleModal').modal('hide');
    
  });

}

projDropdownMenu.addEventListener("click", function(event) {
  selectedProjValue = event.target.dataset.value;
  if(selectedProjValue){
    selectedProject.innerText= `● ${selectedProjValue}`;
  }
});

