"use client"

import { useEffect, useRef, useState } from 'react'
import './todoList.scss'
import { Josefin_Sans } from 'next/font/google'

const data = [
    "Faire les course",
    "Répondre aux e-mails",
    "Terminer le rapport",
    "Préparer le diner",
    "Regarder un film",
]

const TodoList = ()=>{

    const [tasks, setTasks] = useState()
    const [loading, setLoading] = useState(true)
    const inputRef = useRef()

    const handleTaskValidation = (taskIndex) =>{
        const filterdTasks = tasks.filter((task, index) =>{
            return index !== taskIndex
        })
        setTasks(filterdTasks)        
    }

    const handleNewTask = () =>{
        const freshTasks = [...tasks, inputRef.current.value]

        if(inputRef.current.value !== ""){
            setTasks(freshTasks)
            inputRef.current.value = ""
        }else{
            alert("please write some shiiiiiit!")
        }
    }

    const handleResetButton = () =>{
        setTasks(data)
    }

    // Get and display data from localstorage
    useEffect(()=>{
        const localStorageData = localStorage.getItem('Test')

        if(localStorageData){
            setTasks(JSON.parse(localStorageData))
        }else{
            setTasks(data)
        }

        setLoading(false)
    }, [])

    // Save data in localStorage
    useEffect(()=>{
        localStorage.setItem('Test' , JSON.stringify(tasks))
    }, [tasks] )




    return (
        <>
            {!loading && (
                <main className="todoList">
                <div className="todoContainer">
                    <button onClick={handleResetButton}>Reset</button>
    
                    <ul className='todoListItems'>
    
                        {tasks.map((task, index) => (
    
                            
                            <li className='todoSection' key={index} onClick={()=>{handleTaskValidation(index)}}>
                                <p>{task}</p>
                            </li>
    
                        ))}
    
                    </ul>
    
                    <div className="todoListFunctions">
                        <input ref={inputRef} type="text" />
                        <button onClick={handleNewTask} >Ajouter</button>
                    </div>
                </div>
                
            </main>
            )}
        </>
    )
}

export default TodoList