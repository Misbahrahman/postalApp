
let ip;
window.addEventListener("load", () => {
    fetch("https://api.ipify.org?format=json")
       .then(res => {
         if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
          }
          return res.json();
       })
       .then(data => {
          ip = data.ip;
          let ele = document.getElementById("ip");
          ele.innerText = `Your Current IP Address is ${ip}`
       })
       .catch((error) => {
         console.error('Error during fetch:', error);
         alert('There was an error fetching data. Please try again later.');
       });
 });

 let ele = document.getElementById("start-btn");
 ele.addEventListener("click" , ()=>{
    window.location.href = `location.html?ip=${ip}`;
 })
 