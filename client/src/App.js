import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//import * as React from 'react';
import React, { useEffect } from 'react';
import LocoCard from './LocoCard'
import CarCard from './CarCard'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';

import './App.css';

let host_endpoint = 'http://rpi9.kouba.xyz:8001';

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

function SilenceBachmann623() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch(
        host_endpoint+'/trains/dcc/5/8/1',
        requestOptions
    )
    .then(response => response.json())
}

function LightAllOn() {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch(
        host_endpoint+'/neopixel/all/255',
        requestOptions
    )
    .then(response => response.json())
}
function LightAllOff() {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch(
        host_endpoint+'/neopixel/all/0',
        requestOptions
    )
    .then(response => response.json())
}

function App() {
  useEffect(() => {
	  PowerOn();
          SilenceBachmann623();
  });
  return (
    <>
      <ButtonGroup>
        <Button value="light" aria-label="light" onClick={LightAllOn}>
          <LightbulbCircleIcon color="success" />
        </Button>
        <Button value="light" aria-label="light" onClick={LightAllOff}>
          <LightbulbCircleIcon color="error" />
        </Button>
      </ButtonGroup>
      <Divider />
      <LocoCard 
        dcc_id="2"
        sound="false"
        loco_img={require('./imgs/loco_br_185.jpg')}
        loco_title="Elektrická lokomotiva řady 185"
        loco_details=""
      />
      <LocoCard 
        dcc_id="3"
        sound="false"
        loco_img={require('./imgs/loco_114_298-3.jpg')} 
        loco_title="Dieselová lokomotiva řady 114 Deutsche Reichsbahn" 
        loco_details="Původní řada 110 byla vyvinuta pro osobní a nákladní vlakovou dopravu a jako 
        varianta pro použití v posunovacích službách pro DR. Maximální rychlost byla 
        100 km / h s výkonem 1 000 koní. V letech 1983 až 1991 byly do některých 
        strojů instalovány nové motory s nominálním výkonem 1 500 koní a překresleny 
        jako BR 114."
      />
      <LocoCard 
        dcc_id="4"
        sound="true"
        loco_img={require('./imgs/loco_br_170.jpg')} 
        loco_title="el. lokomotiva BR 170 DB-AG Polska"
        loco_details="Varianta lokomotivy Vectron pro DB Schenker Rail Polska 
        je určena pro provoz v polské stejnosměrné síti a je vybavena příslušným 
        vlakovým zabezpečovacím zařízením.
        " 
      />
      <LocoCard 
        dcc_id="5"
        sound="true"
        unmute_function="8"
        loco_img={require('./imgs/bachmann-623.jpg')} 
        loco_title=""
        loco_details="
        " 
      />
      <LocoCard 
        dcc_id="6"
        sound="true"
        loco_img={require('./imgs/sbb-re460.jpg')} 
        loco_title=""
        loco_details="
        " 
      />
      <CarCard 
        dcc_id="10"
        under_light="false"
        car_img={require('./imgs/roco-54169.jpg')}
        car_title="osobní vůz ČD Amz 1.tř Najbrt"
        car_details="Čtyřnápravový vůz 1. třídy ve zkrácené verzi 1:100"
      />
      <CarCard
        dcc_id="11"
        under_light="false"
        car_img={require('./imgs/roco-54171.jpg')}
        car_title="jídelní vůz ČD WRmz Najbrt"
        car_details="Čtyřnápravový vůz 2. třídy uváděný jako ve zkrácené verzi 1:100, vhodné na menší kolejiště s menšími poloměry oblouků."
      />
      <CarCard
        dcc_id="12"
        under_light="true"
        car_img={require('./imgs/piko-58769.jpg')}
        car_title="ČSD kotlový vůz"
        car_details="Spolek pro chemickou a hutní výrobu - Ústí nad Labem"
      />
      <CarCard
        dcc_id="13"
        under_light="true"
        car_img={require('./imgs/roco-76731.jpg')}
        car_title="Gondolas, Ecco Rail"
        car_details="2 piece set Gondolas type Eaos of the Wagon rental company Axbnet hired out to the Ecco Rail."
      />
      <CarCard
        dcc_id="14"
        under_light="true"
        car_img={require('./imgs/roco-76699.jpeg')}
        car_title=""
        car_details=""
      />
      <CarCard
        dcc_id="15"
        under_light="false"
        car_img={require('./imgs/roco-76012.jpg')}
        car_title=""
        car_details=""
      />
      <CarCard
        dcc_id="16"
        under_light="true"
        car_img={require('./imgs/roco-56272.jpg')}
        car_title=""
        car_details=""
      />
      <CarCard
        dcc_id="17"
        under_light="true"
        car_img={require('./imgs/igra-96110016.jpg')}
        car_title=""
        car_details=""
      />
      <CarCard
        dcc_id="18"
        under_light="true"
        car_img={require('./imgs/piko-58960.jpg')}
        car_title=""
        car_details=""
      />
      <CarCard
        dcc_id="19"
        under_light="true"
        car_img={require('./imgs/roco-76780.jpg')}
        car_title=""
        car_details=""
      />
      <CarCard
        dcc_id="20"
        under_light="true"
        car_img={require('./imgs/piko-97164.jpg')}
        car_title=""
        car_details=""
      />
      <CarCard
        dcc_id="21"
        under_light="false"
        car_img={require('./imgs/piko-57611.jpg')}
        car_title=""
        car_details=""
      />
      <CarCard
        dcc_id="22"
        under_light="false"
        car_img={require('./imgs/piko-58688.jpg')}
        car_title="osobní vůz 1. Klasse Newlook SBB Ep. VI"
        car_details=""
      />
      <CarCard
        dcc_id="23"
        under_light="false"
        car_img={require('./imgs/piko-58689.jpg')}
        car_title="osobní vůz 2.tř. Newlook SBB Ep. VI"
        car_details=""
      />
      <CarCard
        dcc_id="24"
        under_light="false"
        car_img={require('./imgs/_vyr_115617106.jpg')}
        car_title=""
        car_details=""
      />
      <CarCard
        dcc_id="25"
        under_light="false"
        car_img={require('./imgs/_vyr_256517807.jpg')}
        car_title="Bachmann HO 40' Single-Dome Tank Car - Alaska Railroad"
        car_details=""
      />
      <CarCard
        dcc_id="26"
        under_light="false"
        car_img={require('./imgs/piko-72226.jpg')}
        car_title="Cisterna Zacens VKS"
        car_details=""
      />
      <CarCard
        dcc_id="27"
        under_light="false"
        car_img={require('./imgs/trix-24169.png')}
        car_title="Agrorail výsypné vozy"
        car_details=""
      />
      <CarCard
        dcc_id="28"
        under_light="false"
        car_img={require('./imgs/roco-76574.webp')}
        car_title="Plošinový vůz se dřevem Rs, SBB"
        car_details=""
      />
      <CarCard
        dcc_id="29"
        under_light="false"
        car_img={require('./imgs/roco-56250.webp')}
        car_title="vůz na štěrk Talbot ČSD, krátký výsypný"
        car_details=""
      />
   </>
  );
}

export default App;
