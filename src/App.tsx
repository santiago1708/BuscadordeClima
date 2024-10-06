import styles from './App.module.css'
import Alert from './component/alert/Alert.tsx'
import Form from './component/forms/Form'
import Spinner from './component/Spinner/Spinner.tsx'
import WeatherDetail from './component/WeatherDetail/WeatherDetail'
import useWeather from './Hooks/useWeather'



function App() {

  const {weather, loading, noFound, fetchWeather, hasWeatherData } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>
      <div className={styles.container}>
          <Form 
            fetchWeather = {fetchWeather}
          />
          {loading && <Spinner/> }
          {hasWeatherData && <WeatherDetail weather = {weather}/>}
          {noFound && <Alert>Ciudad no encontrada</Alert>}
      </div> 
    </>
  )
}

export default App
