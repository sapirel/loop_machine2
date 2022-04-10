
import Machine from './Components/Machine/Machine'
import palyList from "../src/Components/Utils/PadsList";
import './App.css';
import './Components/global-css/global.css'
function App() {
  return (
    <div className="App">
      <Machine palyList={palyList}/>
    </div>
  );
}

export default App;
