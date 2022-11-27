import { useParams, useNavigate  } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './Home.module.css';
import Button from "../../components/Button";
import ResultItem from "./ResultItem";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Action from "./Action";

const cx = classNames.bind(styles)

function Home() {
    // const user = localStorage.getItem('user') 
    const [loading, setLoading] = useState(false)
    const [createStatus, setCreateStatus] = useState(false)
    const { require, id } = useParams()
    const parent_tab = require != undefined ? require : 'UNIT'
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        const check = localStorage.getItem('authenticated') || false
        if(check !== 'true') {
            navigate('/Login-page')
        }
        
        setLoading(true)
        const fetchApi = async () => {
            try {
                const result = await fetch(`http://localhost:8000/testcase?req_id=1&testcase_id=123&user_id=${user.id}&parent_tab_name=${parent_tab}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.json())
                setData(result.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchApi()
        
        setCreateStatus(false)

        // eslint-disable-next-line
    }, [require])
    const datas = id === undefined ? {} : {
        id : id,
        update: true,
    }
    if(loading) {
        return (
            <div className={cx('loading')}>
                <FontAwesomeIcon className={cx('icon-loading')} icon={faSpinner}/>
                <h3>Loading ...</h3>
            </div>
        )
    } else {
        return ( 
            <div className={cx('wrapper')}>
                {createStatus && (
                    <>
                        <Button outline to={'/home/'+require} onClick={() => setCreateStatus(false)}>Back</Button>
                        <Action data={data} {...datas}/>
                    </>
                )}
                <div className={cx('header')}>
                    <h1>{require || "Unit"}</h1>
                    <div className={cx('search')}>
                        <input className="input_value" type='text' placeholder="Search here ..."/>
                        <Button round>Search</Button>
                    </div>
                </div>
                <div className={cx("Content")}>
                    <div className={cx('action-head')}>
                        <select className={cx('input-filter')}>
                            <option>filter</option>
                            <option value="1">nani</option>
                            <option value="2">Okay</option>
                        </select>
                        <Button primary onClick={() => setCreateStatus(true)}>Create</Button>
                    </div>
                    <ResultItem data={data} onClick={() => setCreateStatus(true)}/>
                </div>
            </div>
        );
    }
}


export default Home;