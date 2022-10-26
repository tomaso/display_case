import * as React from 'react';
import Radio from '@mui/material/Radio';

export default function RadioButtons(inputProps) {
    const [selectedValue, setSelectedValue] = React.useState('0');
 
    function callApi(val) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ r: val, g: val, b: val })
        };
        fetch('http://172.17.0.16:8001/neopixel/'+inputProps.item, requestOptions)
            .then(response => response.json())
    }
      
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
      callApi(event.target.value);
    };
  
    return (
      <div>
        <div>
            <span>{inputProps.item}</span>
            <Radio
            checked={selectedValue === '0'}
            onChange={handleChange}
            value="0"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
            />
            <Radio
            checked={selectedValue === '255'}
            onChange={handleChange}
            value="255"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'B' }}
            />
        </div>
      </div>
    );
  }