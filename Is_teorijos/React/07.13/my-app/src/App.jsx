import './App.scss';
import A4 from './Components/016/A4';
// import A3 from './Components/016/A3';
import ContextABC from './Components/016/ContextABC';
function App() {


    return (
        <div className="App">
            <header className="App-header">
                <h1>Context</h1>
                <ContextABC.Provider value={
                    {
                        text: 'ABCdef',
                        a2: 'A2 tekstas'
                    }
                    }>
             <A4 />

                </ContextABC.Provider>

            </header>
        </div>
    );
}
export default App;