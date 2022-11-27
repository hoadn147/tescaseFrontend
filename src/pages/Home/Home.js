import { useData, actions } from "../../data";
import { constants } from "../../data";
import { useParams, useNavigate  } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './Home.module.css';
import Button from "../../components/Button";
import ResultItem from "./ResultItem";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Action from "./Action";

const UNIT_DATA = [
    {
        requirementId: 1,
        testCasesId : 1,
        testResult : "Haha",
    },
    {
        requirementId: 2,
        testCasesId : 2,
        testResult : "Haha",
    },
    {
        requirementId: 3,
        testCasesId : 3,
        testResult : "Haha",
    },
    {
        requirementId: 4,
        testCasesId : 4,
        testResult : "Haha",
    },
    {
        requirementId: 5,
        testCasesId : 5,
        testResult : "Haha",
    },
    {
        requirementId: 6,
        testCasesId : 6,
        testResult : "Haha",
    },
    {
        requirementId: 7,
        testCasesId : 7,
        testResult : "Haha",
    },
    {
        requirementId: 8,
        testCasesId : 8,
        testResult : "Haha",
    },
]

const COMPONENTS_DATA = [
    {
        requirementId: 1,
        testCasesId : 1,
        testResult : "HUHU",
    },
    {
        requirementId: 2,
        testCasesId : 2,
        testResult : "HUHU",
    },
    {
        requirementId: 3,
        testCasesId : 3,
        testResult : "HUHU",
    },
    {
        requirementId: 4,
        testCasesId : 4,
        testResult : "HUHU",
    },
    {
        requirementId: 5,
        testCasesId : 5,
        testResult : "HUHU",
    },
    {
        requirementId: 6,
        testCasesId : 6,
        testResult : "HUHU",
    },
    {
        requirementId: 7,
        testCasesId : 7,
        testResult : "HUHU",
    },
    {
        requirementId: 8,
        testCasesId : 8,
        testResult : "HUHU",
    },
]

const DOMAIN_DATA = [
    {
        requirementId: 1,
        testCasesId : 1,
        testResult : "HIHI",
    },
    {
        requirementId: 2,
        testCasesId : 2,
        testResult : "HIHI",
    },
    {
        requirementId: 3,
        testCasesId : 3,
        testResult : "HIHI",
    },
    {
        requirementId: 4,
        testCasesId : 4,
        testResult : "HIHI",
    },
    {
        requirementId: 5,
        testCasesId : 5,
        testResult : "HIHI",
    },
    {
        requirementId: 6,
        testCasesId : 6,
        testResult : "HIHI",
    },
    {
        requirementId: 7,
        testCasesId : 7,
        testResult : "HIHI",
    },
    {
        requirementId: 8,
        testCasesId : 8,
        testResult : "HIHI",
    },
]

const COMPLETE_DATA = [
    {
        requirementId: 1,
        testCasesId : 1,
        testResult : "HEHE",
    },
    {
        requirementId: 2,
        testCasesId : 2,
        testResult : "HEHE",
    },
    {
        requirementId: 3,
        testCasesId : 3,
        testResult : "HEHE",
    },
    {
        requirementId: 4,
        testCasesId : 4,
        testResult : "HEHE",
    },
    {
        requirementId: 5,
        testCasesId : 5,
        testResult : "HEHE",
    },
    {
        requirementId: 6,
        testCasesId : 6,
        testResult : "HEHE",
    },
    {
        requirementId: 7,
        testCasesId : 7,
        testResult : "HEHE",
    },
    {
        requirementId: 8,
        testCasesId : 8,
        testResult : "HEHE",
    },
]



const cx = classNames.bind(styles)

function Home() {
    // const user = localStorage.getItem('user') 
    const [loading, setLoading] = useState(false)
    const [createStatus, setCreateStatus] = useState(false)
    const { require, id } = useParams()
    const navigate = useNavigate();
    const [state, dispacth] = useData()
    const data = state || UNIT_DATA
    useEffect(() => {
        const check = localStorage.getItem('authenticated') || false
        if(check !== 'true') {
            console.log(true + "huhu")
            navigate('/Login')
        }
        setLoading(true)
        setTimeout(() => {
            switch(require) {
                case 'unit':
                    dispacth(actions.setData(constants.SET_DATA_UNIT, UNIT_DATA))
                    break;
                case 'components':
                    dispacth(actions.setData(constants.SET_DATA_COMPONENT, COMPONENTS_DATA))
                    break;
                case 'domain':
                    dispacth(actions.setData(constants.SET_DATA_DOMAIN, DOMAIN_DATA))
                    break;
                case 'complete':
                    dispacth(actions.setData(constants.SET_DATA_COMPLETE, COMPLETE_DATA))
                    break;
                default:
                    dispacth(actions.setData(constants.SET_DATA_UNIT, UNIT_DATA))
                    break;
            }
            setLoading(false)
            setCreateStatus(false)
        }, 2000)

        // eslint-disable-next-line
    }, [require, dispacth])
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