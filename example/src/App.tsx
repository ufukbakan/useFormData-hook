import React, { useRef } from 'react'
import './App.css'
import useFormData from "useformdata-hook";

export default function App() {

    const formData = useFormData();

    const form2ref = useRef<HTMLFormElement>(null);
    const formData2 = useFormData({ form: form2ref.current as HTMLFormElement });

    return (
        <div className='grid'>
            <div className="inputs">
                <form>
                    <label>name <input type="text" name='name' /></label>
                    <label>birthDate <input type="date" name='birthDate' /></label>
                    <label>favColor <input type="color" name='favouriteColor' /></label>
                    <label>accept <input type="checkbox" defaultChecked name='accept' /></label>
                    <label>comment <textarea name='comment'></textarea></label>
                </form>

                <form ref={form2ref}>
                    <h2>form2</h2>
                    <label>name <input type="text" name='name' /></label>
                    <label>birthDate <input type="date" name='birthDate' /></label>
                    <label>favColor <input type="color" name='favouriteColor' /></label>
                    <label>accept <input type="checkbox" defaultChecked name='accept' /></label>
                    <label>comment <textarea name='comment'></textarea></label>
                </form>
            </div>
            <div className="output">
                <h4>useForm</h4>
                <div>
                    {JSON.stringify(formData)}
                </div>

                <h4>use secondary form</h4>
                <div>
                    {JSON.stringify(formData2)}
                </div>
            </div>
        </div>
    )
}
