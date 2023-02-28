import './App.css';

import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import MapWrapper from './components/MapWrapper'

const App = () => {

  // for use with themechange plugin – recommended by daisyui if we are using themes.
  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])


  return (
    <div className="App">
      {/* use geolocation from device and pass in lng,lat as props to center */}
      {/* center={{lat: , lng: }} */}
      <MapWrapper />
    </div>
  );
}

export default App;
