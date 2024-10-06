import axios from "axios"
import { z } from "zod"
import { SearchType } from "../types"
import { useMemo, useState } from "react"

//ZOD
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number(),
    })
})
export type Weather = z.infer<typeof Weather>

const INITIALSTATE = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}

export default function useWeather() {

    const [weather, setWeather] = useState(INITIALSTATE)
    const [loading, setLoading] = useState(false)
    const [noFound, setNoFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY

        setLoading(true)
        setWeather(INITIALSTATE)
        setNoFound(false)
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&&appid=${appId}` //primer llamado para la latitud y longitud

            const { data } = await axios(geoUrl) //por default es get

            if(!data[0]){ //Validar que si encuentre la ciudad 
                setNoFound(true)
                return
            }
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}` //segundo llamado
            const { data: weatherData } = await axios(weatherUrl) //{data : weatherData} esto renombra el nombre del data a weatherData

            //Zod
            const result = Weather.safeParse(weatherData)
            if (result.success) {
                setWeather(result.data)
            } else {
                console.log('La consulta fallo')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        loading,
        noFound,
        fetchWeather,
        hasWeatherData
    }
}