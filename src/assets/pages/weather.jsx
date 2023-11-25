import React, { useEffect } from 'react'
import { Button,Card, Space, Input, Typography, Image } from 'antd';
import axios from 'axios';
import { useState } from "react";


const { Search } = Input;
const { Text } = Typography;

export default function Weather() {

    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false)

    const getWeatherData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(
                `https://api.weatherstack.com/current?access_key=e901cb23b7fb2a2a38015d62639d27a3&query=${city}`
            );
            
            
            if(response?.data){
                setTimeout(()=>{
                    setLoading(false)
                    console.log("__________response here")
                    console.log(response?.data)
                    setWeatherData(response?.data);
                    console.log("______end response here")
                }, 2000)
               
            }

        } catch (error) {
            setLoading(false)
            console.log("_______failed here")
            console.error('Error fetching weather data:', error);
        }
    };

    

    
  return (
    <Card  title={<Text style={{color: "white"}}>WEATHER APP</Text>} style={{width: "500px", height: "600px", backgroundColor: "#141463"}}>
        <div>
            <Space.Compact style={{ width: '100%' }}>
                <Input type='text' placeholder='Enter the location Name' value={city} onChange={(e)=>setCity(e.target.value)}  />
                <Button onClick={getWeatherData} type="primary" loading={loading}>Search</Button>
            </Space.Compact>

            

            {weatherData && (
                <div>
                    <div style={{marginTop: 30}}>
                        <Image width={130} src={weatherData?.current?.weather_icons} />
                    </div>
                    <h1 style={{color: "white"}}>
                        {weatherData?.current?.temperature}°C
                    </h1>

                    <div>
                        <h3 style={{color: "white"}}>{weatherData?.location?.name}, {weatherData.location?.country}</h3>
                    </div>

                    <div>
                        <h5 style={{color: "white"}}>{weatherData?.current?.weather_descriptions[0]}</h5>
                        <h5 style={{color: "white"}}>wind Speed: {weatherData?.current?.wind_speed}</h5>
                        <h5 style={{color: "white"}}>Humidity: {weatherData?.current?.humidity}</h5>
                    </div>
                </div>
            )}
        </div>
    </Card>
  )
}
