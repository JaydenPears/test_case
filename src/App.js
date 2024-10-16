// import libs:
import Create from './pages/Create';
import Editor from './pages/Editor';
import MainTable from './pages/MainTable';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<MainTable />}/>
                <Route exact path="/view/:id" element={<Editor />}/>
                <Route exact path="/create" element={<Create />}/>
            </Routes>
        </div>
    );
}

export default App;
