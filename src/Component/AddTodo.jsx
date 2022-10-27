import { useState } from "react";

export default function AddTodo({handleSubmit}){
const[text,setText] = useState("")

const handleChange = (e)=>{
    setText(e.target.value)
}

return(
    <div>
        <input onChange = {handleChange} placeholder = "Add Text"/>
        <button onClick={()=>handleSubmit(text)}>ADD</button>

    </div>
)
}