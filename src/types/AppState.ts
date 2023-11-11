import { ResolutionState } from "./ResolutionState";

export type AppState = {
    query: string,
    weather: ResolutionState[]
}