import { useState } from "react"

export const WeatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather' //?q={city name}&appid={API key}
    const api_key = '3a50ee8972e031b2850d53015ca5ec96'
    const difKelvin = 273.15

    const [ciudad, setCiudad] = useState('')
    const [dataClima, setdataClima] = useState(null)


    const handleChangeCity = (e) => {
        setCiudad(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
            const data = await response.json()
            setdataClima(data)

        } catch (error) {
            console.error('Ha ocurrido un problema', error)

        }

    }


    return (
        <div className="container">
            <h1>Aplicación del Clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleChangeCity} />
                <button type="submit">Buscar</button>
            </form>
            {
                dataClima && (
                    <div>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
                        <p>Condición Meteorológica: {dataClima?.weather[0].description}</p>
                        
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                    </div>

                )
            }




        </div>
    )
}
