import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { ResolutionState } from '../types/ResolutionState';
import { AppState } from '../types/AppState';
import { Reducers } from '../types/Reducers';
// import { WeatherResponse } from '../types/WeatherResponse';

export const fetch = createAsyncThunk(
    "weather/fetch",
    async (query: string) => {
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const appid = 'f00c38e0279b7bc85480c3fe775d518c';

        const params = {
            q: query,
            units: 'metric',
            appid: appid
        }

        try {
            const res = await axios.get(url, { params })
            return res.data

        } catch (err) {
            console.log(err);
            return undefined
        }
    })

const insertOrUpdate = (state: AppState, resolutionState: ResolutionState) => {
    const res = state.weather.findIndex((item: ResolutionState) => {
        return item.requestId === resolutionState.requestId
    })

    if (res === -1) {
        state.weather.push(resolutionState)
    } else {
        state.weather[res] = resolutionState
    }
}

export const weatherSlice = createSlice<AppState, Reducers>({
    name: 'weather',
    initialState: {
        query: "",
        // queryArray: [],
        weather: [],
    },
    reducers: {
        setQuery: (state: AppState, action: { payload: string }) => {
            state.query = action.payload
        },
        clearWeather: (state: AppState) => {
            state.weather = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetch.pending, (state, action) => {
            insertOrUpdate(state, {
                requestId: action.meta.requestId,
                loading: true,
                error: false,
                data: undefined
            })
        })
        builder.addCase(fetch.fulfilled, (state, action) => {
            insertOrUpdate(state, {
                requestId: action.meta.requestId,
                loading: false,
                error: false,
                data: action.payload
            })
        })
        builder.addCase(fetch.rejected, (state, action) => {
            insertOrUpdate(state, {
                requestId: action.meta.requestId,
                loading: false,
                error: true,
                data: undefined
            })
        })
    },
})


export const { setQuery, clearWeather } = weatherSlice.actions

export default weatherSlice.reducer