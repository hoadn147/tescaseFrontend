import classNames from "classnames/bind";
import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button";

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
                const res = await fetch("http://localhost:8000/login", option).then((res) => res.json())
                const user = res.data || []
                console.log(user)
                if(user.length !== 0) {
                    localStorage.setItem("authenticated", true);
                    localStorage.setItem("user", JSON.stringify(user));
                    setUsername('')
                    setPassword('')

                    console.log('Login success')
                    navigate('/');
                } else {
                    setError("Wrong username or password!!")
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