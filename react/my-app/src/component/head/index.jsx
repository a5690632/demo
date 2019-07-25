import React, { useState, useEffect } from 'react';

function Example({ initialState }) {
    // Declare a new state variable, which we'll call "count"
    let [value, setValue] = useState(initialState)
    useEffect(() => {
        console.log("asd1")
    })
    return (
        <div>
            {value}
            <button onClick={() => setValue(2)}>按钮</button>
        </div>
    );

}
export default Example