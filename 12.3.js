const ITEMS_CONTAINER = document.getElementById("list");
const ITEM_TEMPLATE = document.getElementById("schoolTemplate")
const ADD_BUTTON = document.getElementById("addLearning")


let items = getItems()

function getItems(){
    const value = localStorage.getItem("todo")  || "[]";

    return JSON.parse(value);
}
function setItems(items){
const itemsJson = JSON.stringify(items);

localStorage.setItem("todo", itemsJson);
}

function addItem(){
    items.unshift({
        description:"",
        completed: false
    });
    setItems(items);
    refreshList();
}
function updateItem(item, key, value){
    item[key] = value;
    setItems(items);
    refreshList();
}
function refreshList(){
items.sort((a,b)=>{
    if(a.completed){
        return 1 ;
    }
    if(b.completed){
        return -1;
    }
    return a.description < b.description ? -1 : 1;
});
    ITEMS_CONTAINER.innerHTML = "";

    for (const item of items) {
        const itemElement = ITEM_TEMPLATE.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector(".item-completed");
        
        descriptionInput.value = item.description;
        completedInput.checked = item.completed;
descriptionInput.addEventListener("change", () =>{
updateItem(item,"description", descriptionInput.value);

});
completedInput.addEventListener("change", ()=>{
    updateItem(item, "completed", completedInput.checked);
});

        ITEMS_CONTAINER.append(itemElement);

    }
}
ADD_BUTTON.addEventListener("click", () =>{
    addItem();
});

refreshList();


const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */

function formatTime(date) {
    const hours12 = date.getHours() %12 || 12;
    const minutes = date.getMinutes();
    const isAm = date.getHours() < 12;

    return `${hours12.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")} ${isAm ? "AM" : "PM"}`;

}
/**
 * @param {Date} date
 */

function formatDate(date){
    const DAYs = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
];
const MONTHs = [  "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"];
return `${DAYs[date.getDay()]} , ${MONTHs[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
    }
setInterval (() =>{
const now = new Date()

timeElement.textContent = formatTime(now);
dateElement.textContent = formatDate(now);

}, 150);