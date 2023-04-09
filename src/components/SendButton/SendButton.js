import React from 'react';
import fetch_ from "../../tools/Interceptor";

function SendButton(props) {
    const handleClick = () => {
        fetch_('calculate', { method: 'POST' })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };

    return (
        <button onClick={handleClick}>
            {props.text}
        </button>
    );
}

export default SendButton;
