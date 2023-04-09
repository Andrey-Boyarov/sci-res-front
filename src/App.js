import logo from './logo.svg';
import './App.css';
import Table from "./components/Table/Table";
import SendButton from "./components/SendButton/SendButton";

function App() {
  return (
    <div className="App">
      <Table/>
      <SendButton text="Calculate"/>
    </div>
  );
}

export default App;
