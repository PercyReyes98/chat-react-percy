import './App.css';
import io from 'socket.io-client'
import {useState, useEffect} from 'react'

//const socket = io('http://localhost:4000')
const socket = io()
function App() {
  const [mensaje, setMensaje] = useState('')
  const [mensajes, setMensajes] = useState([])
  const handleSubmit = (e)=>{
    e.preventDefault()
    socket.emit('mensaje', mensaje)
    const nuevoMensaje = {
      user: "Yo",
      mensaje: mensaje
    }
    setMensajes([nuevoMensaje,...mensajes])
    setMensaje('')
  }

  useEffect(()=>{
    const recibirMensaje = mensaje => {
      setMensajes([mensaje, ...mensajes])
    }
    socket.on('mensaje', recibirMensaje)
    return ()=> { 
      socket.off('mensaje', recibirMensaje)
    }
  }, [mensajes])
  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
          <h1 className='text-2xl font-bold my-2'>CHAT CON REACT-NODEJS</h1>
          <input className="border-2 border-zinc-500 p-2 text-black w-full" type="text" onChange={e=>setMensaje(e.target.value)} 
          value={mensaje}></input>
          <button className="bg-blue-500" b>Enviar</button>
         <ul className='h-80 overflow-y-auto'>
         {mensajes.map((mensaje, index)=>(
          <li key={index} className={`my-2 p-2 table text-sm rounded-md ${mensaje.user === "Yo" ? " bg-sky-700 ml-auto" : "bg-black"}`}> 
            <p> {mensaje.user} : {mensaje.mensaje}</p>
          </li>
))}
         </ul>
        </form>
    </div>
  );
}

export default App;
