
window.addEventListener("load", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const ip = urlParams.get("ip");
  if (ip == "undefined") {
    alert("Unable to fetch IP");
  } else {
    fetch(`https://ipapi.co/${ip}/json/ `)
    .then((res) => {
        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.status}`);
          }
          return res.json();
    })
    .then((data) => {
      RenderDetailsPanel(data);
      RenderMapsSection(data);
      RenderTimeSection(data);
      RenderPostOfficeSection(data);
      RenderSearch(data);
    }).catch((error) => {
        console.error('Error during fetch:', error);
        alert('There was an error fetching data. Please try again later.');
      });
  }
});

function RenderDetailsPanel(data){
    let lat = data.latitude;
    let long = data.longitude;
    let city = data.city;
    let region = data.region;
    let org = data.org;
    // let hostname = data.hostname;

    // console.log(lat , long , city , region , org , hostname);
    let details_container = document.getElementById("details");
    details_container.innerHTML = `
            <div>
                <h2>Lat : ${lat}</h2>
                <h2>Long : ${long}</h2>
            </div>

            <div>
                <h2>City : ${city}</h2>
                <h2>Region : ${region} </h2>
            </div>

            <div>
                <h2>Oragnisation : ${org}</h2>
                <h2>HostName: Laptop </h2>
            </div>
    `
}

function RenderMapsSection(data){
    let ele = document.getElementById("mapContainer");
    ele.innerHTML += `
    <iframe width="70%" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/?q=${data.latitude},${data.longitude}&output=embed"></iframe>
    `
}

function RenderTimeSection(data){
    let time = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });
    let date = time;
    let pin = data.postal;
    let ele = document.getElementById("timePanel");
    ele.innerHTML = `
            <h2>
                Time Zone: ${data.timezone}
            </h2>
            <h2>
                Date and Time: ${time}
            </h2>
            <h2>
                Pincode: ${pin}
            </h2>
        `
}

function RenderPostOfficeSection(data) {
    
    let ele = document.getElementById("holder");
    let pin = data.postal;
    let url = `https://api.postalpincode.in/pincode/${pin}`;

    fetch(url).then(res => res.json()).then(obj => {
        let arr = obj[0].PostOffice;
        arr.forEach(element => {
            ele.innerHTML += `
                <div>
                    <h3>Name:${element.Name}</h3>
                    <h3>Branch Type: ${element.BranchType}</h3>
                    <h3>Delivery Status: ${element.DeliveryStatus} </h3>
                    <h3>District: ${element.District}</h3>
                    <h3>Division: ${element.Division}</h3>
                </div>
            `
        });
    })   
}

function RenderSearch(data) {
    let searchBtn = document.getElementById("srachBtn");
searchBtn.addEventListener("click" , ()=>{
    let text = document.getElementById("search").value;
    search(text);
});

function search(text) {
    let ele = document.getElementById("holder");
    let pin = data.postal;
    let url = `https://api.postalpincode.in/pincode/${pin}`;
    ele.innerHTML = "";

    fetch(url).then(res => res.json()).then(obj => {
        let arr = obj[0].PostOffice;
        arr.forEach(element => {
            if(element.Name == text){
                ele.innerHTML += `
                <div>
                    <h3>Name:${element.Name}</h3>
                    <h3>Branch Type: ${element.BranchType}</h3>
                    <h3>Delivery Status: ${element.DeliveryStatus} </h3>
                    <h3>District: ${element.District}</h3>
                    <h3>Division: ${element.Division}</h3>
                </div>
            `
            }
            
        });
    })   
}
}




