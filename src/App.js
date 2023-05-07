import logo from './logo.svg';
import './App.css';
import Table from "./components/Table/Table";
import SendButton from "./components/SendButton/SendButton";
import {useState} from "react";
import InputContext from './context/InputContext'
import AutoShrinkCheckBox from "./components/AutoShrinkCheckbox/AutoShrinkCheckBox";
import {ClimbingBoxLoader, RingLoader, ScaleLoader} from "react-spinners";

function App() {
    const [headerColumns, setHeaderColumns] = useState(['Trait 1']);
    const [headerRows, setHeaderRows] = useState(['Object 1']);
    const [data, setData] = useState([[0.0]]);
    const [autoShrink, setAutoShrink] = useState(true);
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const renderSendPanel = () => {
        if (!isLoading)
            return (<div className="SendButtonContainer">
                <SendButton text="Calculate"/>
                <AutoShrinkCheckBox text="Auto clustering"/>
            </div>)
    }

    const renderLoadingHolder = () => {
        if (isLoading)
            return (<div className="LoadingContainer">
                <ScaleLoader className="Loader" color="#DCEDC8"/>
                <div>Data is processing...</div>
            </div>)
    }

    return (
    <div className="App">
        <InputContext.Provider value={{
            columnsState: [headerColumns, setHeaderColumns],
            rowsState: [headerRows, setHeaderRows],
            dataState: [data, setData],
            autoShrink: [autoShrink, setAutoShrink],
            response: [response, setResponse],
            isLoading: [isLoading, setIsLoading]
        }}>
            <div className="MainContainer">
                <div className="TableContainer">
                    <Table/>
                </div>
                {
                    renderSendPanel()
                }
                {
                    renderLoadingHolder()
                }
            </div>
        </InputContext.Provider>
    </div>
  );
}

export default App;
