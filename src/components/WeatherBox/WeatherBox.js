import {useCallback, useState} from 'react';
import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const handleCityChange = useCallback((city) => {
    setLoading(true);
    setWeather(null);
    setError(false);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18b9578d8ba090444f0b65402a33f541&units=metric`)
      .then(res=>res.json())
      .then(data=> {
        if (data.cod !== 200){
          setError(true);
          return;
        }
        const preparedData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };

        setWeather(preparedData);
      })

      .catch(err => {
        setError(true);
      })

      .finally(()=> {
        setLoading(false);
      })

  },[])

  return (
    <section>
      <PickCity onCity={handleCityChange} />
      {loading && <Loader/>}
      {error && !loading && <ErrorBox/>}
      {weather && <WeatherSummary {...weather}/>}
    </section>
  )
};

export default WeatherBox;