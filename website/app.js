let temperature;
let baseURL = 'http://localhost:8000';
let weatherBaseURL = 'https://api.openweathermap.org/data/2.5/';
let apiKey = '84b9f88850da73d87b3bc5ddb1cd1f86';

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', handleGenerateClick);

function handleGenerateClick(e){
    let zip = document.getElementById('zip').value;
    getWeather(zip)
    .then(data=>{
        const payLoad = {
            temperature: data.main.temp,
            date: newDate,
            userInput: document.getElementById('feelings').value
        };
        postUserData(payLoad)
        .then(()=>{
            retrieveInputData()
            .then(data=>{
                let entry = data[0];
                document.getElementById('temp').innerHTML = entry.temperature;
                document.getElementById('content').innerHTML = entry.userInput;
                document.getElementById('date').innerHTML = entry.date;
                
            })
        })
    })
    
};

const getWeather = async (zip)=>{
    const compoundURL = `${weatherBaseURL}weather?zip=${zip}&appid=${apiKey}`;
    const res = await fetch(compoundURL);

    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log('error',error);
    }
}

const postUserData = async (payLoad)=>{
    const URL = `${baseURL}/user/input`;
    const res = await fetch(URL, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payLoad), 
      });
      try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log('error',error);
    }
};

const retrieveInputData = async ()=>{
    const URL = `${baseURL}/all`;
    const res = await fetch(URL);

    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log('error',error);
    }
}