
import './App.css'
import{FaPlus,FaPencilAlt,FaTrash}from 'react-icons/fa';
import{useState,useEffect} from 'react';
import{db} from './firebase';
import{addDoc,collection,doc, updateDoc, onSnapshot, deleteDoc} from 'firebase/firestore';



function App() {

  const[todos,setTodos]=useState([
  ]);
  const[input,setInput]=useState('');
  const[editIndex,setEditIndex]=useState(-1);

  useEffect (() => {
    const unsubscribe = onSnapshot (collection (db, 'todos'), (snapshot) => {
    setTodos (snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo})));
    });
    return () => unsubscribe();
    }, []);

  const setEdit=(index)=>{
    setInput(todos[index].todo);
    setEditIndex(index);
  };
const addTodo=async() => {
try{
if(input.trim()!=='') {
 // setTodos([...todos,{id:new Date(), todo:input}]);
 await addDoc(collection(db,'todos'),{todo:input});
  setInput('')
}
} catch(error){
console.error(error.message);
}
}

const updateTodo = async() => {
  try{
    if(input.trim()!=='') {
      const todoDocRef=doc(db,'todos',todos[editIndex].id);
      await updateDoc(todoDocRef,{todo:input});

      
      
      setEditIndex(-1);
      setInput('');
    }
    } catch(error){
    console.error(error.message);
    }
}

const removeTodo=async(id)=>{
try{
await deleteDoc(doc(db,'todos',id));
}
catch(error){
  console.error(error.message);
}



}




return (
    <>
      <div className='min-h-screen flex items-center flex-col justify-center gap-4 p-4 bg-custom-background bg-center bg-cover rounded'>
        <div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-lg '>
        <h1 className='text-3xl font-bold text-center mb-4'>To Do List</h1>
        
      <div className='flex'>


        <input
        type="text"
        placeholder="Add a target"
        className='py-2 px-4 border rounded w-full focus:outline-none mr-2'
        value={input}
        onChange={(e)=>setInput(e.target.value)}></input>
      <button onClick={editIndex === -1 ? addTodo:updateTodo} className='p-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white py-1 px-4 rounded hover:from-blue-500 hover:to-blue-700'>
      {editIndex===-1?<FaPlus/>:<FaPencilAlt/>}
      
      
      </button>
      
      
      </div>
        
        
        
        </div>
{todos.length>0&&(


<div className='bg-gray-100 p-6 rounded shadow-md w-full max-w-lg '>

<ul>
{todos.map((todo,index)=>(

<li key={index} className='flex items-center justify-between bg-white p-3 rounded shadow-md mb-3'>
    <span className='text-lg'>{todo.todo}</span>
   <div> <button onClick={()=>setEdit(index)} className='mr-2 p-2 bg-gradient-to-r from-gray-400 to-gray-600 text-white py-1 px-4 rounded hover:from-gray-500 hover:to-gray-700 '><FaPencilAlt/> </button>
    <button onClick={()=>removeTodo(todo.id)} className='mr-2 p-2 bg-gradient-to-r from-red-400 to-red-600 text-white py-1 px-4 rounded hover:from-red-500 hover:to-red-700 '><FaTrash/> </button>
</div>
  
  </li>





))} 
</ul>

</div>
)}




      </div>
    </>
  )

}
export default App
