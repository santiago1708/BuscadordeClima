import styles from './App.module.css'
import Form from './component/forms/Form'
import Spinner from './component/Spinner/Spinner.tsx'
import WeatherDetail from './component/WeatherDetail/WeatherDetail'
import useWeather from './Hooks/useWeather'



function App() {

  const {weather, loading, fetchWeather, hasWeatherData } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>
      <div className={styles.container}>
          <Form 
            fetchWeather = {fetchWeather}
          />
          {loading && <Spinner/> }
          {hasWeatherData && 
            <WeatherDetail
              weather = {weather}
            />
          }
      </div> 
    </>
  )
}

export default App
