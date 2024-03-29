import React from "react";

import '../DarkMode/DarkMode.css';

const DarkMode = ({toggleTheme , isChecked}) => {
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                checked={isChecked}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>

            </label>
        </div>
    );
};

export default DarkMode;
