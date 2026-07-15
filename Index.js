const API_BASE = window.location.origin + "/api";

async function fetchData() {
    try {
        let res = await fetch(`${API_BASE}/students`);
        if (!res.ok) {
            throw new Error("Data not fetching");
        }
        let data = await res.json();
        showdata(data);
    } catch (error) {
        console.log(error);
    }
}
function showdata(data){
    let container = document.getElementById("container");
    container.innerHTML = "";
    let item=document.createElement("div");
    item.innerHTML = data.map((student) => {
    return `
        <p>Id: ${student.id}</p>
        <p>Name: ${student.name}</p>
        <img src="${student.image}" width="100"><br>
        <button id="delete${student.id}">Delete</button>
        <button id="edit${student.id}">Edit</button>
    `;
}).join("");

    container.appendChild(item);
    data.forEach(student => {
        let deletebtn=document.getElementById(`delete${student.id}`)
        let editbtn=document.getElementById(`edit${student.id}`)
        deletebtn.onclick=()=>{
            deleteData(student.id);
        }
        editbtn.onclick=()=>{
            editData(student.id)

        }
    });
}

async function deleteData(id) {
    try {
        let res = await fetch(`${API_BASE}/students/${id}`, {
            method: "DELETE"
        });
        if (!res.ok) {
            throw new Error("Data not deleted");
        }
        alert("Data Deleted Successfully");
        await fetchData();
    } catch (error) {
        console.log(error);
    }
}
async function editData(id){
    
    let studentId=document.getElementById("id");
    let stName=document.getElementById("name");
    let image=document.getElementById("image");
    let res=await fetch(`${API_BASE}/students/${id}`)
        try{
    if(!res.ok){
            throw new Error("Data not getting in inputfields")
        }
        let data=await res.json();
        studentId.value=data.id;
        stName.value=data.name;
        image.value=data.image
    }catch(error){
        console.log(error)
    }
}

async function savedata() {

    let studentId = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let image = document.getElementById("image").value;

    let obj = {
        name: name,
        image: image
    };
    let studentMethod = studentId ? "PUT" : "POST";
    let URL = studentId ? `${API_BASE}/students/${studentId}` : `${API_BASE}/students`;

    try {

        let res = await fetch(URL, {
            method: studentMethod,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        if (!res.ok) {
            throw new Error("Data Not Updated");
        }
        alert("Data Saved Successfully");
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("image").value = "";

        fetchData();

    } catch (error) {

        console.log(error);

    }

    
}

addEventListener("DOMContentLoaded",fetchData)