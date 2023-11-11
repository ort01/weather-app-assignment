import { WeatherResponse } from "./WeatherResponse";

export type ResolutionState = {
    requestId: string;
    loading: boolean,
    data: undefined | WeatherResponse,
    error: boolean,
}