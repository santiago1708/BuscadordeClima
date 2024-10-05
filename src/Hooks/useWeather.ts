import { Weather } from './../types/index';
import axios from "axios"
import { SearchType } from "../types"

// Esta función valida si la respuesta del API de OpenWeatherMap es un objeto con los datos esperados.
//Tipar el objeto esperado de la api para un autocompleato
function isWeatherResponse(weather : unknown)  {
    return(
        Boolean(weather) && 
        typeof weather === 'object' && 
        typeof (weather as Weather).name === 'string' && 
        typeof (weather as Weather).main.temp === 'number' && 
        typeof (weather as Weather).main.temp_max === 'number' && 
        typeof (weather as Weather).main.temp_min === 'number' 
    )
}


export default function useWeather() {

    const fetchWeather = async(search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY

        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&&appid=${appId}` //primer llamado para la latitud y longitud
            
            const {data} = await axios(geoUrl) //por default es get
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}` //segundo llamado
            const {data : weatherData} = await axios(weatherUrl) //{data : weatherData} esto renombra el nombre del data a weatherData
        
            const result = isWeatherResponse(weatherData)
            console.log(result)


        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}