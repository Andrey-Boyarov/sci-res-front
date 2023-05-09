import logo from './logo.svg';
import './App.css';
import Table from "./components/Table/Table";
import SendButton from "./components/SendButton/SendButton";
import {useState} from "react";
import InputContext from './context/InputContext'
import AutoShrinkCheckBox from "./components/AutoShrinkCheckbox/AutoShrinkCheckBox";
import {ClimbingBoxLoader, RingLoader, ScaleLoader} from "react-spinners";
import AbortButton from "./components/AbortButton/AbortButton";

function App() {
    const [headerColumns, setHeaderColumns] = useState(['Trait 1']);
    const [headerRows, setHeaderRows] = useState(['Object 1']);
    const [data, setData] = useState([[0.0]]);
    const [autoShrink, setAutoShrink] = useState(true);
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    // const [abortController, setAbortController] = useState({})

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
    //
    // const renderAbortButton = () => {
    //     if (isLoading)
    //         return (<div className="AbortButtonContainer">
    //                     <AbortButton text="Abort"/>
    //                 </div>)
    // }

    const renderContent = content => {
        return content.map(c => {
            const value = Math.round(c.value * 10) / 10
            if (value > 0)
            return (<div className="ContentItem">
                        <div>{c.name}</div>
                        <div className="Value">{value}</div>
                    </div>)
            }
        )
    }

    const renderVolume = volume => {
        return volume.map(c => {
            const value = Math.round(c.value * 10) / 10
            if (value > 0)
            return (<div className="VolumeItem">
                        <div>{c.property}</div>
                        <div className="Value">{value}</div>
                    </div>)
            }
        )
    }

    const renderConcept = concept => {
        const {content, volume} = concept

        return (<div className="Concept">
                    <div className="Content">
                        {renderContent(content)}
                    </div>
                    <div className="Volume">
                        {renderVolume(volume)}
                    </div>
                </div>)
    }

    const renderResult = () => {
        return (
            <div className="ConceptsContainer">
                {response.map(renderConcept)}
            </div>
        )
    }

    return (
    <div className="App">
        <InputContext.Provider value={{
            columnsState: [headerColumns, setHeaderColumns],
            rowsState: [headerRows, setHeaderRows],
            dataState: [data, setData],
            autoShrink: [autoShrink, setAutoShrink],
            response: [response, setResponse],
            isLoading: [isLoading, setIsLoading],
            // abortController: [abortController, setAbortController]
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
                {
                    renderResult()
                }
                <div className="BottomSeparator"></div>
            </div>
        </InputContext.Provider>
    </div>
  );
}

export default App;
