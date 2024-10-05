import axios from "axios"
import {object, string, number, InferOutput, parse} from 'valibot'
import { SearchType } from "../types"

//ZOD
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number(),
    })
})

type Weather = InferOutput<typeof WeatherSchema>


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
            
            //Valibot
            const result = parse(WeatherSchema, weatherData)
            if(result) {
                console.log(result.name)
                console.log(result.main.temp)
            }else {
                console.log('La consulta fallo')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return {
        fetchWeather
    }
}