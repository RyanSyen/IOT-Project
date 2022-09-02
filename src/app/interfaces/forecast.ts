import { ICoordinates } from './coordinates';
import { IWeatherData } from './weather-data';

interface ICity {
    coord: ICoordinates;
    id: number;
    name: string;
    country: string;
}

export interface IForecast {
    list: IWeatherData[];
    city: ICity;
}
