import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';

function App() {
  return(
   <Router>
    <Navbar/>
    <div>
       <Routes>
        <Route path='register' element={<Register/>}/>
       </Routes>
      </div>
   </Router>
  )
}

export default App;
