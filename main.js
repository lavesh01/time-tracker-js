
const resetValues = () => {
  inputField.value= "";

  selectedProjValue = "";
  selectedProject.innerHTML= "";

  displayTags.innerHTML = "";
  selectedTagValue = null;

  billColor = "";
}


// Delete a Task 

const deleteTask = (taskId) => {
  const taskComponent = document.getElementById(`task-component-${taskId}`);
  taskComponent.remove();
};

// TAGS 
let selectedTagValue;

// const displayTags = document.querySelector('#display-tags');

const tagDropdownMenu = document.querySelector('#tag-dropdown-menu');
const tags = []; 

const populateTags = () => {
  tags.forEach(tag => {
      const tagItem = document.createElement('li');
      tagItem.classList.add('dropdown-item');
      tagItem.textContent = tag;
      tagDropdownMenu.appendChild(tagItem);
    });
  
  tagDropdownMenu.appendChild(form);
}

const addNewTag = (tagName) => {
  const tagItem = document.createElement('li');
  const tagLink = document.createElement('a');
  const crossBtn = document.createElement('button');
  
  tagItem.classList.add('dropdown-item');
  tagLink.classList.add('tag-link');
  tagLink.setAttribute('data-value', tagName);
  tagLink.textContent = tagName;
  crossBtn.classList.add('cross-btn')
  crossBtn.innerHTML = '<i class="fa fa-thin fa-xmark"></i>';

  crossBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    tagItem.remove();
  });

  tagLink.appendChild(crossBtn);
  tagItem.appendChild(tagLink);
  tagDropdownMenu.insertBefore(tagItem, form);
};


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

    const crossBtn = document.createElement('button');
    crossBtn.classList.add('cross-btn');
    crossBtn.innerHTML = '<i class="fa fa-thin fa-xmark"></i>';

    crossBtn.addEventListener('click', () => {
      newTag.remove();
    });

    newTag.appendChild(crossBtn);
    displayTags.appendChild(newTag);
  }
});


// DOLLAR BILL 
let billColor;

const dollarBtn = document.getElementById("bill");
dollarBtn.addEventListener('click', () => {
dollarBtn.classList.toggle("bill-color");
billColor = dollarBtn.classList.contains("bill-color") ? "bill-color" : "";
})  


// CREATING NEW PROJECT 

let newprojectname;
let selectedProjValue = "";

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
  newProj.classList.add('tag-link');
  newProj.innerHTML=`<a class="dropdown-item" data-value="${newprojectname}">${newprojectname}</a>`;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('cross-btn');
  deleteBtn.style.marginRight='1rem';
  deleteBtn.innerHTML = '<i class="fa fa-thin fa-xmark"></i>';
  deleteBtn.addEventListener('click', () => {
    newProj.remove();
  });

  newProj.appendChild(deleteBtn);

  projDropdownMenu.appendChild(newProj);

  modalBodyInput.value = "";
  $('#exampleModal').modal('hide');
  
});

}

projDropdownMenu.addEventListener("click", function(event) {
  if (event.target.classList.contains('delete-btn')) {
    event.stopPropagation();
    event.target.parentNode.remove();
  } else {
    selectedProjValue = event.target.dataset.value;
    if(selectedProjValue){
      selectedProject.innerText= `● ${selectedProjValue}`;
    }
  }
});


// Get the current date

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const currentDate = new Date();

const dayOfWeek = daysOfWeek[currentDate.getDay()];
const month = monthsOfYear[currentDate.getMonth()];
const dayOfMonth = currentDate.getDate();

const year = currentDate.getFullYear();

const dateString = `${dayOfWeek}, ${month} ${dayOfMonth} ${year}`;


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



































// TIMER 
const startBtn = document.getElementById("start-btn");
const toggleText = document.getElementById("toggle-text");
const timeDisplay = document.getElementById("time-display");
const displayTags = document.querySelector('#display-tags');
  

let timerInterval; 
let inheritedTime;
let totalTime;
let resumeTime = "00:00:00";

startBtn.addEventListener('click', () => {
  toggleText.innerText = toggleText.innerText === "Start" ? "Stop" : "Start";
  startBtn.classList.toggle("stop-btn");
  
  if (toggleText.innerText === "Stop") {
    let startTime = Date.now(); 
    timerInterval = setInterval(() => {
      let elapsedTime = Date.now() - startTime; 
      let formattedTime = formatTime(elapsedTime); 
    
      timeDisplay.innerText = formattedTime; 
      inheritedTime = formattedTime;      
    }, 10);  
  } else {
    totalTime = inheritedTime;
    clearInterval(timerInterval); 
    timeDisplay.innerText = "00:00:00"; 

    createTaskComponent();
  }  

});  

const taskComponentArea = document.querySelector('#task-component-area');
const inputField = document.querySelector('#task-class');

let componentCount = 0;

const createTaskComponent = () => {
  addComponent();
  resetValues();
}
    

function addComponent() {
  
  const taskName = inputField.value;
  
  const tagElements = Array.from(displayTags.children);
  const tags = tagElements.map((tag) => tag.textContent);
  
  const component = document.createElement('div');
    component.id = `task-component-${componentCount}`;
    component.classList.add("container-fluid","right-side");
    component.innerHTML=`
    <div class="top">
    <div id="date">${dateString}</div>
        <div id="inherited-time">Total Time: ${totalTime}</div>
    </div>

    <hr>

    <div class="bottom">

        <input type='checkbox' class="checkbox" >
        <div class="left">
        
            <div>
                <div id="task-name">${taskName}</div>
            </div>

            <div id="task-project-name">
                ${selectedProjValue ? `●${selectedProjValue}` : ""}
            </div>

            <div id="task-tags" class="tag"> 
            ${tags.map((tag) => `<span class="tags">${tag}</span>`).join("")}
            </div>

            <div id="task-bill" class="${billColor}">
          
            <i id="bill" class="fa-regular fa-dollar-sign"></i>
                
            </div>
            |
        </div>
        
        <div class="right">
            <div id="display-resume-time">
              ${resumeTime} 
            </div>
            <div id="resume-btn">
                <i id="toggle-btn" class="fas fa-regular fa-play"></i>
            </div>
            <div id="delete-btn">
            <i class="fa fa-regular fa-trash-alt" onclick="deleteTask(${componentCount})"></i>
            </div>
        </div>

    </div>
    `

  const toggleBtn = component.querySelector('#toggle-btn');
  const displayResumeTime = component.querySelector('#display-resume-time');
  const resumeBtn = component.querySelector('#resume-btn');
  const inheritTaskTime = component.querySelector('#inherited-time');

  resumeBtn.addEventListener('click', () => {
    toggleBtn.className = toggleBtn.className === 'fas fa-regular fa-play' ? 'fas fa-regular fa-stop' : 'fas fa-regular fa-play';

    
    if(toggleBtn.className === 'fas fa-regular fa-stop'){
      let startTime = Date.now(); 
      timerInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime;
        let formattedTime = formatTime(elapsedTime); 
        displayResumeTime.innerText = formattedTime;
        resumeTime = formattedTime;
      }, 10);  
    } else {
        let resumedTime = resumeTime;
        console.log("inherited: " + inheritedTime);
        console.log("resumed: " + resumedTime);
        const [hours1, minutes1, seconds1] = inheritedTime.split(':').map(Number);
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
        inheritedTime = totalTime;

        console.log("TotalTime: " + totalTime);
        
        inheritTaskTime.innerText = `Total Time: ${totalTime}`;

        clearInterval(timerInterval);
        displayResumeTime.innerText = "00:00:00";
    }    
  });  

    taskComponentArea.appendChild(component);
    componentCount++;  
    
  }

  




