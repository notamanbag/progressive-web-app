import React,{useState} from 'react';
import {fetchWeather} from './API/weather'
import './App.css'


const App = ()=>{

    const [location,setLocation] = useState('');
    const [info,setInfo] = useState({})
    const search = async (e)=>{
        if(e.key=== 'Enter'){
            const data = await fetchWeather(location);
            setInfo(data);
            setLocation('') //reset after the location is searched
        } 
    }

    return(
        <div className ="main-container">
            <input type= "text" className ="search" placeholder ="Search.." value ={location} onChange ={(e)=>setLocation(e.target.value)} onKeyPress ={search}/>
            {info.main &&(
                <div className ="city">
                    <h2 className = "city-name"> 
                        <span>{info.name}</span>
                        <sup>{info.sys.country}</sup>
                    </h2>
                     <div className ="city-temp">
                        {Math.round(info.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className = 'info'>
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`} alt={info.weather[0].description} />
                            <p>{info.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;