
import Chat from './components/Chat'
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import SignUp from './components/signUp';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={SignUp} />
        <Route path='/login' Component={Login} />
        <Route path='/chat' Component={Chat} />
      </Routes>
    </BrowserRouter>
  )
}

export default App