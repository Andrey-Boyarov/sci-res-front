import React, {useContext} from 'react';
import fetch_ from "../../tools/Interceptor";
import InputContext from "../../context/InputContext";

function SendButton(props) {
    const {
        columnsState: [headerColumns, setHeaderColumns],
        rowsState: [headerRows, setHeaderRows],
        dataState: [data, setData]
    } = useContext(InputContext)

    const handleClick = () => {
        fetch_('calculate', {
            method: 'POST',
            body: {
                objects: headerRows,
                traits: headerColumns,
                data: data
            }
        })
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
