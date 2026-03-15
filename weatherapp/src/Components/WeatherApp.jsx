import React, { useState, useEffect } from 'react'
import sunny from "../assets/images/sunny.jpg"

export default function WeatherApp() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState("")
    const api_key = 'd0ea436e1e2a1455a25ed765491a9b7b'

    //here to display the weather of a default location before user enters any location in the input field
    //we can modify useeffect hook to fetch weather data for a default location when a component mount   
    useEffect(() => {
        const fetchDefaultWeather = async () => {
            const defaultLocation = "Tbilisi"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${api_key}`
            const res = await fetch(url);
            const defaultData = await res.json();
            setData(defaultData);

        }
        fetchDefaultWeather();

    }, [])

    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }

    const search = async () => {
        if (location.trim() !== "") {
            //check if request contains empty location skip the api call
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}`
            const res = await fetch(url)
            const searchData = await res.json()
            if (searchData.cod !== 200) {
                setData({ notFound: true });
            } else {
                setData(searchData)
                setLocation('')
            }
            console.log(searchData)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter')
            search()
    }
    const currentDate = new Date();
    const daysOfWeek = ["Sun", "Tue", "Wen", "Thur", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const dayOfWeek = daysOfWeek[currentDate.getDay()]
    const month = months[currentDate.getMonth()]
    const dayOfMonth = currentDate.getDate()
    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`
    return (
        <div clsssName="container">
            <div clsssName="weather-app">
                <div className="search">
                    <div clsssName="search-top">
                        <i className="fa-solid fa-location-dot"></i>
                        <div className="location">{data.name}</div>
                    </div>
                    <div className="search-bar">
                        <input type='text' placeholder='Enter Location'
                            value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                        <i className="fa-solid fa-magnifying-glass"
                            onClick={search}></i>
                    </div>
                </div>
                {data.notFound ? (
                    <div className='not-found'>Not Found😒</div>) : (
                    <>
                <div className="weather">
                    <img src={sunny}></img>
                    <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
                    {/* <div className="temp">{data.main ? data.main.temp : null}&deg;</div> */}
                    <div className="temp">{data?.main?.temp || null}&deg;</div>
                </div>
                <div className="weather-date">
                    <p>{formattedDate}</p>
                </div>
                <div className="weather-data">
                    <div className="humidity">
                        <div className='data-name'>Humidity</div>
                        <i className="fa-solid fa-droplet"></i>
                        <div className='data'>{data.main ? data.main.humidity : null}%</div>
                    </div>
                    <div className="wind">
                        <div className='data-name'>Wind</div>
                        <i className="fa-solid fa-wind"></i>
                        <div className='data'>{data.wind ? data.wind.speed : null} km/hr</div>
                    </div>
                </div>
                </>)}
            </div>
        </div>
    )
}