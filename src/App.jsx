import { useState } from 'react'
import './App.css'
import Allrouter from './Router/Allrouter'
import Navbar from './Component/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Allrouter/>
      </>
  )
}

export default App