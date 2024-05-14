import React, { useState, useEffect  } from 'react';
import BookingForm from './components/BookingForm'
import FlightList from './components/FlightList';

function App() {
  
  return (  
    <div>
      
      <BookingForm/>
      <FlightList/>
    </div>
  )
}
export default App;
