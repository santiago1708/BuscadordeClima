import axios from "axios"
import {z} from 'zod'
import { SearchType } from "../types"

//ZOD
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})

type Weather = z.infer<typeof Weather>


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
            
            //Zod
            const result = Weather.safeParse(weatherData)
            if(result.success) {
                console.log(result.data.name)
                console.log(result.data.main.temp)
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