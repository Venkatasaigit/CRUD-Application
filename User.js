async function displayData(){
    let res=await fetch("https://crud-application-132e.onrender.com/student")
    try{	
        if(!res.ok){
            throw new Error("Data Not Getting");
        }
        let data=await res.json();
        showdata(data)
    }catch(error){
        console.log(error)
    }
}

let container=document.getElementById("container")
function showdata(data){
    data.forEach(ele => {
    let item=document.createElement("div")
    item.innerHTML=`
    <p>Name:${ele.name}</p>
    <img src='${ele.image}'>
    `
        container.appendChild(item)
    });
}
addEventListener("DOMContentLoaded",displayData)