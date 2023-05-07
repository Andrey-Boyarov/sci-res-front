import React, {useContext} from 'react';
import fetch_ from "../../tools/Interceptor";
import InputContext from "../../context/InputContext";
import "./SendButton.css"

function SendButton(props) {
    const {
        columnsState: [headerColumns, setHeaderColumns],
        rowsState: [headerRows, setHeaderRows],
        dataState: [data, setData],
        autoShrink: [autoShrink, setAutoShrink],
        response: [response, setResponse],
        isLoading: [isLoading, setIsLoading]
    } = useContext(InputContext)

    const handleClick = () => {
        setIsLoading(true)
        fetch_('fca/getConcepts', {
            method: 'POST',
            body: JSON.stringify({
                data: data,
                headerColumns: headerColumns,
                headerRows: headerRows,
                autoShrink: autoShrink
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false)
                setResponse(data)
            })
            .catch(error => console.error(error));
    };

    return (
        <button onClick={handleClick}>
            {props.text}
        </button>
    );
}

export default SendButton;
