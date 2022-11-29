import React from 'react'
import useFormData from '.';
import './App.css'

export default function App() {

    const formData = useFormData();

    return (
        <div className='grid'>
            <div className="inputs">
                <form>
                    <label>name <input type="text"  name='name' /></label>
                    <label>birthDate <input type="date" name='birthDate' /></label>
                    <label>favColor <input type="color" name='favouriteColor' /></label>
                    <label>accept <input type="checkbox" defaultChecked name='accept' /></label>
                    <label>comment <textarea name='comment'></textarea></label>
                </form>
            </div>
            <div className="output">
                <h4>useForm</h4>
                <div>{JSON.stringify(formData)}</div>
            </div>
        </div>
    )
}
