
export default function TodoList({title,status,id,handleToggle,handleDelete}){


    return(
        <div>
            <b>{title}</b>
            {status?"DONE":"NOT DONE"}
            <button onClick = {()=>handleToggle(id,!status)}>TOGGLE</button>
            <button onClick={()=>handleDelete(id)}>DEL</button>
        </div>
    )
}