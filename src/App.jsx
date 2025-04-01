import { useState , useEffect } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([]) // stores all todos
  const [showFinished , setshowFinished] = useState(true)

  useEffect (() => {
    let todostring = localStorage.getItem("todos")
    if(todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, []) 
  
  const saveToLS = () => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  }
  
  const togglefinished = () => {
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    settodos([...todos , {id : uuidv4() ,todo , isCompleted : false}])
    settodo("")
    console.log(todos)
    saveToLS() // causing delay last not dont get saves as save to LS occur first when settodo is already working
  }
  const handleEdit = (e , id) => {
    let t = todos.filter (i => i.id === id)  // we have created a new array with condition stisfy
    settodo(t[0].todo) // accessing the tood in adding option 
    // for deleting the said todo to edit 
    let newtodos = todos.filter (item => {
      return item.id !== id 
    })
    settodos(newtodos)
    saveToLS()
  }

  const handleDelete = (e , id) => {
    //.filter  : A method that creates a new array by keeping only those items that satisfy the given condition.
    let newtodos = todos.filter (item => { 
      return item.id !== id // This condition ensures that all items except the one with the matching id are kept.
    })
    settodos(newtodos)
    saveToLS()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name 
    // console.log(id)
    let index = todos.findIndex (item => {
      return item.id === id ;
    })
    let newtodos = [...todos] // creating a new array with same reference
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    saveToLS()
  }
  

  return (
    <>
      <div className='min-h-screen my-1 flex items-center justify-center'>
        <div className='container rounded-xl  bg-violet-100 md:w-[60vw] mx-auto  py-8 px-5 md:px-15 min-h-[80vh]'>
          <h1 className='text-center text-3xl font-bold pb-4'>Manage your Tasks at one Place</h1>
          <h1 className='text-2xl font-bold '>Add a ToDo</h1>
          <div className="addToDo flex gap-7 mt-5 mb-2">
            <input onChange={handleChange} value={todo} className='bg-white rounded-lg w-3/4  p-2' type="text" />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 disabled:bg-violet-500 hover:bg-violet-900 rounded-md py-2.5 px-6 font-bold text-white'>Add</button>
          </div>
          <input className='ml-2' type="checkbox" onChange={togglefinished} checked={showFinished} /> Show Finished
          <div>
            <h1 className='text-2xl font-bold mt-5 mb-2'>Your ToDo's</h1>
          </div>
          <div className="yourToDO">

            {/* Not a AND operator (&&) it works like if statement */}
            {todos.length === 0 && <div>No Todos to Display !!</div>}
            {todos.map(item => {
                
                return (showFinished || !item.isCompleted) && (
                <div key={item.id} className="TodoCard flex justify-between my-3 gap-10 text-[17px]">
                    <div className='flex items-center gap-5'>
                      <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} type="checkbox" />
                      <div className={item.isCompleted?"line-through":""} >{item.todo}</div>
                    </div>
                    <div className="button flex gap-3">
                      <button onClick={(e)=>handleEdit(e , item.id)} className='bg-violet-800 h-9 text-[14px] text-center hover:bg-violet-900 rounded-md py-2 px-4 font-bold text-white'>Edit</button>
                      <button onClick={(e)=>handleDelete(e , item.id)} className='bg-violet-800 h-9 text-[18px] text-center hover:bg-violet-900 rounded-md py-2 px-4 font-bold text-white'><MdDelete /></button>
                    </div>
                </div>
                )
            })}
            
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
