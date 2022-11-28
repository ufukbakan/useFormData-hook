import React from 'react'
import './App.css'
import useForm from ".";

export default function App() {

    const formData = useForm();

    return (
        <div className='grid'>
            <div className="inputs">
                <form>
                    <label>name <input type="text"  name='name' /></label>
                    <label>birthDate <input type="date" name='birthDate' /></label>
                    <label>favColor <input type="color" name='favouriteColor' /></label>
                    <label>accept <input type="checkbox" defaultChecked name='accept' /></label>
                    <textarea name='comment'></textarea>
                </form>
            </div>
            <div className="output">
                <h4>useForm</h4>
                <div>{JSON.stringify(formData)}</div>
            </div>
        </div>
    )
}
