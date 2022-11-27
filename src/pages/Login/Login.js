import classNames from "classnames/bind";
import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import * as request from "../../utils/request";

const cx = classNames.bind(styles)


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username !== '' && password !== '') {
            try{ 
                const res = await request.post("/login",
                    {
                        username: username,
                        password: password,
                    }
                )
                const user = res.data || []
                if(user.length > 0) {
                    localStorage.setItem("authenticated", true);
                    localStorage.setItem("user", JSON.stringify(user));
                    setUsername('')
                    setPassword('')
        
                    alert('Login success');
                    navigate('/');
                }
            } catch (error) {
                console.log(error)
                setError("Wrong username or password!!")
            } 
        } else {
            setError("Please Fill The Form")
        }
        };
    return (
        <div className={cx('form-container')}>
            <div className={cx('box')}>
                <p>Welcome Back</p>
                <form  onSubmit={handleSubmit}>
                    <h4 style={{ color: "red" }}>{error}</h4>
                    <div className={cx('input-form')}>    
                        <label form="Username">User Name</label> 
                        <br></br>
                        <input
                            type="text"
                            name="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter User Name"
                        />
                    </div>
                    <div className={cx('input-form')}>    
                        <label form="Password">Password</label>
                        <br></br>
                        <input
                            type="password"
                            name="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                        />
                    </div>
                    <input type="submit" value="Login" />
                    <span>Dont have account?<Button text to={"/Signup"}>Signup now</Button></span>
                </form>
            </div>
        </div>
    );
}

export default Login;