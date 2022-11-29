import classNames from "classnames/bind";
import styles from './Signup.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";
const cx = classNames.bind(styles)


function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(username !== '' && password !== '' && repeatPassword !== '') {
            if(password === repeatPassword) {
                try {
                    const option = {
                        method: 'POST',
                        body: JSON.stringify({
                            username: username,
                            password: password,
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    const res = await fetch("http://localhost:8000/signup", option).then((res) => res.json())
                    if(res.data === null) {
                        setError(res.exception.username)
                    } else {
                        alert("Signup Success")
                        setUsername('')
                        setPassword('')
                        navigate('/Login-page');
                    }
        
                    

                } catch (error) {
                    console.log(error)
                    alert('Error, please try again later!!')
                }
            } else {
                setError("PassWord not match!!")
            }
        } else {
            setError("Please Fill The Form")
        }
    }

    return (
        <div className={cx('form-container')}>
            <div className={cx('box')}>
                <p>Welcome New User</p>
                <form onSubmit={handleSubmit}>
                    <h4 style={{ color: "red" }}>{error}</h4>
                    <div className={cx('input-form')}>    
                        <label form="Username">User Name</label> 
                        <br></br>
                        <input
                            type="text"
                            name="Username"
                            placeholder="Enter User Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={cx('input-form')}>    
                        <label form="Password">Password</label>
                        <br></br>
                        <input
                            type="password"
                            name="Password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={cx('input-form')}>    
                        <label form="RepeatPassword">Repeat Password</label>
                        <br></br>
                        <input
                            type="password"
                            name="RepeatPassword"
                            placeholder="Repeat Your Password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    </div>
                    <input type="submit" value="Singup"/>
                    <span>Already have account?<Button text to={"/Login-page"}>Login now</Button></span>
                </form>
            </div>
        </div>
    );
}

export default Signup;