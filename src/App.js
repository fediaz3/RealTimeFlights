import './App.css';
import {ClientWS} from './components/ClientWebSocket/ClientWebSocket'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Real-Time Flights
        </p>
      </header>

      <div className="body">
        {/* <p>
          Body
        </p> */}
        <ClientWS/>
      </div>
    </div>
  );
}

export default App;
