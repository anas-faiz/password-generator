import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [Numallowed, setNumallowed]= useState(false)
  const [Chrallowed, setCharallowed] = useState(false)
  const [password, setpassword ]= useState("")
//useref hook
  const passwordreff= useRef(null)

  const passwordgenrator = useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUBVWXYZabcdefghijklmnopqrstuvwxyz"
  if (Numallowed) str+="0123456789"
  if (Chrallowed) str+="!@#$%^&*()_+"


  for (let i = 1; i <=length; i++) {
    let char = Math.floor(Math.random() * str.length+1)
    pass += str.charAt(char)
    
  }
  setpassword(pass)

  }, [length,Numallowed,Chrallowed,setpassword])
  
  const copypasstoclip = useCallback(()=>{
    passwordreff.current?.select()
    window.navigator.clipboard.writeText(password)
  }
  , [password])

  useEffect( ()=> {
    passwordgenrator()
  }, [length,Numallowed,Chrallowed,passwordgenrator])
  
  return (
    
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
    <h1 className='text-white text-center my-4'>Password Generator </h1>
    <div className='flex  shadow rounded-lg overflow-hidden mb-4'>
    <input
    type="text"
    value={password}
    className='outline-none w-full py-1 px-3'
    placeholder='password'
    readOnly
    ref={passwordreff}
    />
    <button onClick={copypasstoclip} className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0'
    >copy</button>

    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
          />
          <label >length:{length}</label>
      </div>
      <div>
        <input 
        type="checkbox" 
        defaultChecked={Numallowed}
        id='numberinput'
        onChange={() => {
          setNumallowed((prev) => !prev)
        }}
       />
       <label >Numbers</label>
      </div>
      <div>
        <input 
        type="checkbox"
        defaultChecked={Chrallowed}
        id='characterinput'
        onChange={() => {
          setCharallowed((prev) => !prev)
        }}
        />
        <label >chracters</label>
      </div>
    </div>
      
    </div>
    </>
      


    
  )
}

export default App
