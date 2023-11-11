import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux'
import { fetch, clearWeather, setQuery } from '../redux/fetchData';
import { useAppDispatch } from '../redux/store';
import { ResolutionState } from '../types/ResolutionState';
import { CityWeather } from './CityWeather';

const Weather: FunctionComponent = () => {
  //redux
  const dispatch = useAppDispatch()

  const query = useSelector((state: any) => state.weather.query)
  const weather: ResolutionState[] = useSelector((state: any) => state.weather.weather)

  const search = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      dispatch(clearWeather())
      query.split(',').forEach((q: string) => {
        dispatch(fetch(q))
      });
    }
  };

  return (
    <div>
      <h1 className="app-name">
        Weather App<span>🌤</span>
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Search City.."
          name="query"
          value={query}
          onChange={(event) => dispatch(setQuery(event.target.value))}
          onKeyDown={search}
        />
      </div>
      {
        weather.map((state: ResolutionState) => (<CityWeather state={state} />))
      }

    </div>
  );
}

export default Weather;
