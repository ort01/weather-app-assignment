import { FunctionComponent } from 'react';
import { toDate } from './tools';
import { InfinitySpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { ResolutionState } from '../types/ResolutionState';



export const CityWeather: FunctionComponent<{ state: ResolutionState }> = ({ state }) => {



  return (
    <div>
      {state.loading && (
        <>
          <br />
          <br />
          <InfinitySpin width='100px' />
        </>
      )}
      {state.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: '20px' }}> Sorry, City not found</span>
          </span>
        </>
      )}

      {state.data && state.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {state.data.name}, <span>{state.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDate()}</span>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${state.data.weather[0].icon}@2x.png`}
              alt={state.data.weather[0].description}
            />
            {Math.round(state.data.main.temp)}
            <sup className="deg">&deg;C</sup>
          </div>
          <div className="des-wind">
            <p>{state.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {state.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  )

}

