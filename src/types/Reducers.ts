import { AppState } from "./AppState"

export type Reducers = {
    setQuery: (state: AppState, action: { payload: string }) => void,
    clearWeather: (state: AppState) => void
}