import React from 'react';

import NewWeatherComponent from './Components/NewWeatherComponent';
import MainBG from './Components/MainBG';


const App = () => {
    return (
        <div className='main-app'>
            <MainBG/>
            <NewWeatherComponent/>
           
        </div>
    );
};

export default App;
