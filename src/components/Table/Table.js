import React, { useState } from 'react';
import './Table.css';

const Table = () => {
    const [headerColumns, setHeaderColumns] = useState(['Trait 1']);
    const [headerRows, setHeaderRows] = useState(['Object 1']);
    const [data, setData] = useState([[0.0]]);

    const addColumn = () => {
        // const newHeader = prompt('Enter header for new column:');
        const newHeader = "Trait " + (headerColumns.length + 1);
        if (newHeader) {
            setHeaderColumns([...headerColumns, newHeader]);
            setData(data.map(row => [...row, 0.0]));
        }
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
                <th />
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
                <div className="buttons">
                    <button className="add-button" onClick={addColumn}>+</button>
                    <button className="remove-button" onClick={removeColumn}>-</button>
                </div>
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
                                type="number"
                                step="0.01"
                                value={data[rowIndex][columnIndex]}
                                onChange={event =>
                                    handleDataChange(rowIndex, columnIndex, event.target.value)
                                }
                            />
                        </td>
                    ))}
                </tr>
            ))}
            <div className="buttons">
                <button className="add-button" onClick={addRow}>+</button>
                <button className="remove-button" onClick={removeRow}>-</button>
            </div>
            </tbody>
        </table>
    );
};

export default Table;
