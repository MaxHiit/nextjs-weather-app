import { Weather } from "../types";

export const getWeather = async (city: string = 'cork'): Promise<any> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  try {
    const res = await fetch(url)
    if (!res.ok) {
      // You can do your error handling here
      console.log('Not Successfull');
      return 'qzdlfjhqdlfkujhg';
    } 

    // Call the .json() method on your response to get your JSON data
    const data = await res.json();  
    const results = {
        id: data.id,
        city: data.name,
        temp: Math.floor(data.main.temp),
        icon: data.weather[0].icon,
        main: data.weather[0].main,
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
    }
    return results
    
  } catch (error) {
    console.error(error);
    throw(error)
  }
}

export const getUserLocationWeather = async (lat: number, lon: number): Promise<Weather> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.NEXT_PUBLIC_API_KEY}`;

  try {
    const data = await fetch(url).then((res) => res.json());  
    
    const results = {
        id: data.id,
        city: data.name,
        temp: Math.floor(data.main.temp),
        icon: data.weather[0].icon,
        main: data.weather[0].main,
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
};