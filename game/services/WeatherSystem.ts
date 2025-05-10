
export enum Weather {
    SUNNY,
    RAINY,
    CLOUDY
}

export class WeatherSystem {
    private currentWeather: Weather = Weather.SUNNY;
    private changeCallback: (weather: Weather) => void;

    constructor(changeCallback: (weather: Weather) => void) {
        this.changeCallback = changeCallback;
        this.startWeatherCycle();
    }

    private startWeatherCycle(): void {
        setInterval(() => {
            this.updateWeather();
        }, 300000); // Muda a cada 5 minutos
    }

    private updateWeather(): void {
        const weathers = Object.values(Weather);
        this.currentWeather = weathers[Math.floor(Math.random() * weathers.length)];
        this.changeCallback(this.currentWeather);
    }
}
