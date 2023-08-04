let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");


//Empty Array To Store The Tasks
let ArrayOfTasks =[];

// Check if Theres Tasks In Local Storage
if(localStorage.getItem("tasks")){
    ArrayOfTasks= JSON.parse(localStorage.getItem("tasks"));
}
//Trigger Get Data From Local Storage Functaion
getDataFromLocalStorage();

//Add Task
submit.onclick = function(){
    if(input !== ""){
        addTaskToArray(input.value); //Add Task To Array Of Tasks
        input.value=""; //Empty Input Field

    }
};

//Click On Task Element
tasksDiv.addEventListener("click",(e)=>{
    //Delete Button
    if(e.target.classList.contains("del")){
        //Eemove Element From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //Remove Element From Page
        e.target.parentElement.remove()
    }
    // Task Element
    if(e.target.classList.contains("task")){
        //toggle completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        //toggle Done
        e.target.classList.toggle("done")
    }
})


function addTaskToArray(taskText){
    //Tast Data
    const task ={
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    //push Task To Array Of Tasks
    ArrayOfTasks.push(task);
    console.log(ArrayOfTasks);
    //Add Tasks To Page
    addElementsToPageFrom(ArrayOfTasks);
    //Add Tasks To Local Storage
    addDataToLocalStorageFrom(ArrayOfTasks);
};

function addElementsToPageFrom(ArrayOfTasks){
    //Empty Tasks Div
    tasksDiv.innerHTML ="";
    //Looping On Array Of Tasks
    ArrayOfTasks.forEach((task)=>{
        //create Main Div
        let div =document.createElement("div");
        div.className ="task";
        //Check If Task Is Done
        if(task.completed){
            div.className ="task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        //create Delete Button
        let span =document.createElement("span");
        span.className ="del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span)
        //Add Task Div To Tasks Container
        tasksDiv.appendChild(div)
    });
}

function addDataToLocalStorageFrom(ArrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(ArrayOfTasks))
}
function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}


function deleteTaskWith(taskId) {
    // For Explain Only
    // for(let i=0; i < ArrayOfTasks.length; i++ ){
    //     console.log(`${ArrayOfTasks[i].id} === ${taskId}`)
    // }
    ArrayOfTasks = ArrayOfTasks.filter((task)=> task.id != taskId);
    addDataToLocalStorageFrom(ArrayOfTasks);
}

function toggleStatusTaskWith(taskId){
        for(let i=0; i < ArrayOfTasks.length; i++ ){
            if(ArrayOfTasks[i].id == taskId){
                ArrayOfTasks[i].completed == false ? ArrayOfTasks[i].completed == true : ArrayOfTasks[i].completed == false
            }
        }
        addDataToLocalStorageFrom(ArrayOfTasks);
}