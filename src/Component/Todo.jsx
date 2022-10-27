import { useEffect } from "react";
import { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

export default function Todo(){
    const [todos,setTodo] = useState([])
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)



   const getTodos = (page=1)=>{
    return fetch(`http://localhost:3000/tasks?_page=${page}&_limit=5`).then((res)=>res.json())
   }


   const addTodos = (todo)=>{
    return fetch("http://localhost:3000/tasks",{
        method : "POST",
        headers : {
            "Content-type" :"application/json"
        },
        body : JSON.stringify(todo)
    }).then((res)=>res.json())
   }

 const toggleTodos=(id, newStatus)=> {
        return fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ status: newStatus })
        }).then((res)=>res.json())
    }
    

   const deleteTodos =  (id)=>{
   return fetch(`http://localhost:3000/tasks/${id}`, {
           method: "DELETE",
           headers: {
               "Content-type": "application/json"
           },
       }).then((res)=>res.json())
   }
 

   const handleGetTodo=(page)=>{
    setLoading(true)
    getTodos(page).then((res)=>{
        setLoading(false)
        setTodo(res);
        console.log(res);
   })
   .catch((err)=>{
    console.log()
   }

   )
}

useEffect(()=>{
    setLoading(true)
   handleGetTodo(page)
   setLoading(false)
   },[page])

const handleSubmit = (text)=>{
    const newItem = {
        title : text,
        status : false
    }

    setLoading(true)
    addTodos(newItem).then((res)=>{
        handleGetTodo(page)
        setLoading(false)
        console.log(res)
   })
}

const handleToggle = (id,newStatus)=>{
    setLoading(true)
    toggleTodos(id,newStatus).then((res)=>{
        handleGetTodo(page)
        setLoading(false)
    }).catch((err)=>{
        console.log(err)
    })

}

const handleDelete = (id)=>{
    deleteTodos(id).then((res)=>{
        handleGetTodo()
    })
}

    return(
        <div>
            <div>{loading && "loading..."}</div>
        <AddTodo handleSubmit={handleSubmit}/>
        {

            todos.map((item)=>{
                return(
                <TodoList
                key = {item.id}
                title = {item.title}
                status = {item.status}
                id = {item.id}
                handleToggle = {handleToggle}
                handleDelete = {handleDelete}
                />
                )
            })

        }
        <button onClick = {()=>setPage((prev)=>prev-1)} disabled = {page==1}>Prev</button>
        <button>{page}</button>
        <button onClick = {()=>setPage((prev)=>prev+1)}>Next</button>
         
        </div>
    )
}