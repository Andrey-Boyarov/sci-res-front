import logo from './logo.svg';
import './App.css';
import Table from "./components/Table/Table";
import SendButton from "./components/SendButton/SendButton";
import {useState} from "react";
import InputContext from './context/InputContext'

function App() {
    const [headerColumns, setHeaderColumns] = useState(['Trait 1']);
    const [headerRows, setHeaderRows] = useState(['Object 1']);
    const [data, setData] = useState([[0.0]]);

    return (
    <div className="App">
        <InputContext.Provider value={{
            columnsState: [headerColumns, setHeaderColumns],
            rowsState: [headerRows, setHeaderRows],
            dataState: [data, setData]
        }}>
            <Table/>
            <SendButton text="Calculate"/>
        </InputContext.Provider>
    </div>
  );
}

export default App;
