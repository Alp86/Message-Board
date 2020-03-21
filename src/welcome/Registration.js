import React from "react";
import { Link } from 'react-router-dom';
import useStatefulFields from "../hooks/useStatefulFields";
import useAuthSubmit from "../hooks/useAuthSubmit";

export default function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [error, handleSubmit] = useAuthSubmit("/registration", values);

    return (
        <div>
            <h1>Registration</h1>
            { error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name="first" placeholder="first name"/>

                <input onChange={handleChange} type="text" name="last" placeholder="last name"/>

                <input onChange={handleChange} type="text" name="email" placeholder="email"/>

                <input onChange={handleChange} type="password" name="password" placeholder="password"/>

                <input onChange={handleChange} type="password" name="password2" placeholder="repeat password"/>

                <button type="submit">register</button>
            </form>
            <p>Already registered? <Link to="/login">Click here</Link> to log in.</p>
        </div>
    );
}
