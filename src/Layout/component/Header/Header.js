import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

import classNames from "classnames/bind";
import styles from './Header.module.css';
import images from "../../../asset/images";
import Button from "../../../components/Button";
const cx = classNames.bind(styles)

function Header() {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    const [action, setAction] = useState('/Login')

    const logout = () => {
        localStorage.setItem("authenticated", false);
        localStorage.setItem("user", false);
        navigate('/Login')
    }

    const change = () => {
        setAction(action === '/Login' ? '/Signup' : '/Login')
    }

    useEffect(() => {
        const check = localStorage.getItem('authenticated') || false
        
        if(check === 'true') {
            setAction('/')
        } else {
            setAction('/Signup')
        }
    }, [])

    return ( 
        <div className={cx('Wrapper')}>
            <div className={cx('Logo')}>
                <img src={images.logo} alt='Logo'/>
                <h3>Case Tracking</h3>
            </div>
            {action === '/' ? (
                <div className={cx('Info')}>
                    <img src={images.user} alt="Avatar"/>
                    <h3>{user.username}</h3>
                    <Button outline rightIcon={<FontAwesomeIcon icon={faRightFromBracket}/>} onClick={logout}>Logout</Button>
                </div>
            ) : (
                <div className={cx('Info')}>
                    <Button onClick={change} primary to={action}>{action === '/Login' ? 'Login' : 'Signup'}</Button>
                </div>
            )}

        </div>
     );
}

export default Header;