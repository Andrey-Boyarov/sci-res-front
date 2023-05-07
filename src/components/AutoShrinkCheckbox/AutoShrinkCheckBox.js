import {useContext} from "react";
import InputContext from "../../context/InputContext";
import "./AutoShrinkCheckBox.css";

function AutoShrinkCheckBox({text}) {
    const {
        autoShrink: [autoShrink, setAutoShrink]
    } = useContext(InputContext)
    return (
        <div className="AutoShrinkCheckBox">
            <input className="Box" type="checkbox" checked={autoShrink} onChange={() => setAutoShrink(!autoShrink)}/>
            <p>{text}</p>
        </div>
    );
}

export default AutoShrinkCheckBox;