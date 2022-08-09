import './App.scss';
// import A3 from './Components/016/A3';
import ContextABC from './Components/016/ContextABC';
function App() {


    return (
        <div className="App">
            <header className="App-header">
                <h1>Contex</h1>
                <ContextABC.Provider value={
                    {
                        text: 'ABC'
                    }
                    }>
                </ContextABC.Provider>
            </header>
        </div>
    );
}
export default App;