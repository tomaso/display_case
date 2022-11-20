import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import RB from './Rb';
import LocoCard from './LocoCard'

import './App.css';

let host_endpoint = 'http://rpi1.kouba.xyz:8001';

function PowerOn() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch(
        host_endpoint+'/trains/dcc/power/1',
        requestOptions
    )
    .then(response => response.json())
}

function App() {
  useEffect(() => {
	  PowerOn();
  });
  return (
    <>
      <LocoCard 
        dcc_id="3" 
        loco_img="/client/loco_114_298-3.jpg" 
        loco_title="Dieselová lokomotiva řady 114 Deutsche Reichsbahn" 
        loco_details="Původní řada 110 byla vyvinuta pro osobní a nákladní vlakovou dopravu a jako 
        varianta pro použití v posunovacích službách pro DR. Maximální rychlost byla 
        100 km / h s výkonem 1 000 koní. V letech 1983 až 1991 byly do některých 
        strojů instalovány nové motory s nominálním výkonem 1 500 koní a překresleny 
        jako BR 114."
      />
      <LocoCard 
        dcc_id="4" 
        loco_img="/client/loco_br_170.jpg" 
        loco_title="el. lokomotiva BR 170 DB-AG Polska"
        loco_details="Varianta lokomotivy Vectron pro DB Schenker Rail Polska 
        je určena pro provoz v polské stejnosměrné síti a je vybavena příslušným 
        vlakovým zabezpečovacím zařízením.
        " 
      />
   </>
  );
}

export default App;
