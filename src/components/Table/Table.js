import React, {useContext, useEffect, useState} from 'react';
import './Table.css';
import InputContext from "../../context/InputContext";

const Table = () => {
    const {
        columnsState: [headerColumns, setHeaderColumns],
        rowsState: [headerRows, setHeaderRows],
        dataState: [data, setData]
    } = useContext(InputContext)

    useEffect(() => {
        const hc = window.localStorage.getItem('headerColumns')
        const hr = window.localStorage.getItem('headerRows')
        const d = window.localStorage.getItem('data')
        if (hc && hr && d) {
            setHeaderColumns(JSON.parse(hc));
            setHeaderRows(JSON.parse(hr));
            setData(JSON.parse(d));
        } else {
            setHeaderColumns(['Trait 1']);
            setHeaderRows(['Object 1']);
            setData([[0.0]]);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('headerColumns', JSON.stringify(headerColumns));
        window.localStorage.setItem('headerRows', JSON.stringify(headerRows));
        window.localStorage.setItem('data', JSON.stringify(data));
    }, [data, headerColumns, headerRows]);

    function validate(str) {
        str = str.trim();
        const regex = /^\d+(\.\d{1,2})?$/;
        return regex.test(str);
    }


    const addColumn = () => {
        // const newHeader = prompt('Enter header for new column:');
        const newHeader = "Trait " + (headerColumns.length + 1);
        if (newHeader) {
            setHeaderColumns([...headerColumns, newHeader]);
            setData(data.map(row => [...row, 0.0]));
        }
        console.log(data)
    };

    const removeColumn = () => {
        const newHeaders = [...headerColumns]
        newHeaders.pop()
        setHeaderColumns(newHeaders);
        setData(data.map(row => {
            const nr = [...row]
            nr.pop()
            return nr
        }));
    };

    const addRow = () => {
        // const newRowHeader = prompt('Enter header for new row:');
        const newRowHeader = "Object " + (headerRows.length + 1);
        if (newRowHeader) {
            setHeaderRows([...headerRows, newRowHeader]);
            setData([...data, Array(headerColumns.length).fill(0.0)]);
        }
    };

    const removeRow = () => {
        const newHeaders = [...headerRows]
        newHeaders.pop()
        setHeaderRows(newHeaders);
        const nd = [...data]
        nd.pop()
        setData(nd);
    };

    const handleDataChange = (rowIndex, columnIndex, newValue) => {
        const newData = [...data];
        newData[rowIndex][columnIndex] = parseFloat(newValue) || 0.0;
        setData(newData);
    };

    return (
        <table className="Table">
            <thead>
            <tr>
                <div className="ButtonsContainer">
                    <div className="buttons">
                        <button className="add-button" onClick={addRow}>+</button>
                        <button className="remove-button" onClick={removeRow}>-</button>
                    </div>
                    <div className="buttons">
                        <button className="add-button" onClick={addColumn}>+</button>
                        <button className="remove-button" onClick={removeColumn}>-</button>
                    </div>
                </div>
                {headerColumns.map((header, columnIndex) => (
                    <th key={columnIndex}>
                        <input
                            type="text"
                            value={header}
                            onChange={event => {
                                const newHeaderColumns = [...headerColumns];
                                newHeaderColumns[columnIndex] = event.target.value;
                                setHeaderColumns(newHeaderColumns);
                            }}
                        />
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {headerRows.map((rowHeader, rowIndex) => (
                <tr key={rowIndex}>
                    <th>
                        <input
                            type="text"
                            value={rowHeader}
                            onChange={event => {
                                const newHeaderRows = [...headerRows];
                                newHeaderRows[rowIndex] = event.target.value;
                                setHeaderRows(newHeaderRows);
                            }}
                        />
                    </th>
                    {headerColumns.map((header, columnIndex) => (
                        <td key={`${rowIndex}-${columnIndex}`}>
                            <input
                                type="text"
                                value={data[rowIndex][columnIndex]}
                                onChange={event => {
                                    if (validate(event.target.value)) {
                                        let v = event.target.value
                                        while (v.charAt(0) === '0') {
                                            v = v.substring(1)
                                        }
                                        handleDataChange(rowIndex, columnIndex, v)
                                    }
                                }}
                            />
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Table;
