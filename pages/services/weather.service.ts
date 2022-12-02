import { Weather } from "../../types";

const getWeather = async (city: string = 'abidjan '): Promise<Weather> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  try {
    const data = await fetch(url).then((res) => res.json());
    
    const results = {
        id: data.id,
        cityName: data.name,
        temp: Math.floor(data.main.temp),
        icon: data.weather[0].icon,
        main: data.weather[0].main,
        dt: data.dt,
        timezone: data.timezone,
        stats: [
          {
            id: 1,
            name: 'cloudy',
            value: data.clouds.all || null
          },
          {
            id: 2,
            name: 'humidity',
            value: data.main.humidity || null
          },
          {
            id: 3,
            name: 'wind',
            value: data.wind.speed || null
          },
          {
            id: 4,
            name: 'rain',
            value: (data.rain && data.rain['1h']) || null
          },
          {
            id: 5,
            name: 'snow',
            value: (data.snow && data.snow['1h']) || null
          }
        ]
    };
    
    return results
  } catch (error) {
    console.error(error);
    throw(error)
    
  }
}

export default getWeather;