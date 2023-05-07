import {useContext} from "react";
import InputContext from "../../context/InputContext";

function AutoShrinkCheckBox({text}) {
    const {
        autoShrink: [autoShrink, setAutoShrink]
    } = useContext(InputContext)
    return (
        <div className="AutoShrinkCheckBox">

        </div>
    );
}