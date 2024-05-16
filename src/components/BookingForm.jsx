import React, { useState, useEffect } from 'react';
import styles from '../styles/BookingForm.css';

function BookingForm() {
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [dia, setDia] = useState('');
    const [suggestionsOrigen, setSuggestionsOrigen] = useState([]);
    const [suggestionsDestino, setSuggestionsDestino] = useState([]);
    const [showSuggestionsOrigen, setShowSuggestionsOrigen] = useState(false);
    const [showSuggestionsDestino, setShowSuggestionsDestino] = useState(false);
    const [activeSuggestionIndexOrigen, setActiveSuggestionIndexOrigen] = useState(-1);
    const [activeSuggestionIndexDestino, setActiveSuggestionIndexDestino] = useState(-1);
    const apiUrl = "https://reservas-avion-back.vercel.app";

    const [flights, setFlights] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Enviar datos al backend
        const response = await fetch(`${apiUrl}/v1/crearViajes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ origen, destino, dia }),
        });
        const data = await response.json();
        console.log(data);
    };
    const fetchFlights = async () => {
        try {
            const response = await fetch(`${apiUrl}v1/listarViajes`);
            if (response.ok) {
                const data = await response.json();
                setFlights(data);
            } else {
                console.error('Error al obtener la lista de vuelos');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    // Llamar a fetchFlights una vez al cargar el componente
    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchSuggestions = async (input, setSuggestions, setShowSuggestions, setActiveSuggestionIndex) => {
        try {
            const response = await fetch(`${apiUrl}v1/getSuggestions?query=${input}`);
            if (response.ok) {
                const data = await response.json();
                setSuggestions(data);
                setShowSuggestions(true);
            } else {
                console.error('Error al obtener las sugerencias');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };
    

    const handleOriginChange = async (event) => {
        const inputValue = event.target.value;
        setOrigen(inputValue);
        fetchSuggestions(inputValue, setSuggestionsOrigen, setShowSuggestionsOrigen, setActiveSuggestionIndexOrigen);
    };

    const handleDestinationChange = async (event) => {
        const inputValue = event.target.value;
        setDestino(inputValue);
        fetchSuggestions(inputValue, setSuggestionsDestino, setShowSuggestionsDestino, setActiveSuggestionIndexDestino);
    };

    const handleSuggestionClick = (index, setOrigen, setDestino, showSuggestionsOrigen, setShowSuggestionsOrigen) => {
        const selectedSuggestion = suggestionsOrigen[index];
        setOrigen(selectedSuggestion.name); // Actualiza el estado de origen
        setShowSuggestionsOrigen(false); // Oculta las sugerencias de origen
    };
      
    
    useEffect(() => {
        // Código a ejecutar cuando el componente se monta
        console.log('El componente se ha montado');
    }, []);
    return (
        <div className="bookingFormContainer">
            <h1 className='titulo'>Aviones Alejo</h1>
            <h2>Crear Vuelos</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Origen:
                    <input type="text" className="inputField" value={origen} onClick={() => setShowSuggestionsOrigen(true)} onBlur={() => setTimeout(() => setShowSuggestionsOrigen(false), 100)} onChange={handleOriginChange} />
                    <div className="suggestionList">
                        {showSuggestionsOrigen && (
                            <ul>
                                {suggestionsOrigen.map((suggestion, index) => (
                                    <li key={index}
                                        className={`suggestionItem ${activeSuggestionIndexOrigen === index? 'active' : ''}`}
                                        onClick={() => handleSuggestionClick(index)}>
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </label>
                <label>
                    Destino:
                    <input type="text" className="inputField" value={destino} onClick={() => setShowSuggestionsDestino(true)} onBlur={() => setTimeout(() => setShowSuggestionsDestino(false), 100)} onChange={handleDestinationChange} />
                    <div className="suggestionList">
                        {showSuggestionsDestino && (
                            <ul>
                                {suggestionsDestino.map((suggestion, index) => (
                                    <li key={index}
                                        className={`suggestionItem ${activeSuggestionIndexDestino === index? 'active' : ''}`}
                                        onClick={() => handleSuggestionClick(index, setDestino, setShowSuggestionsDestino)}>
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </label>
                <label>
                    Día:
                    <input type="date" className="dayInput" value={dia} onChange={(e) => setDia(e.target.value)} />
                </label>
                <button type="submit" className="button">Guardar</button>
            </form>
        </div>
    );
}

export default BookingForm;