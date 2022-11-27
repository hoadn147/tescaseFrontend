import classNames from "classnames/bind";
import styles from './Action.module.css';
import { useParams, useNavigate } from "react-router-dom";

import Button from "../../../components/Button";
import { useLayoutEffect, useState, useRef, useEffect } from "react";

const cx = classNames.bind(styles)

function Action({ update = false, id, data = [] }) {
    const { require } = useParams()
    const navigate = useNavigate()
    //form create test case
    const [valueRqId, setValueRqId] = useState('')
    const [valueTCId, setValueTCId] = useState('')
    const [valueTR, setValueTR] = useState('')

    //form create filter
    const [filter, setFilter] = useState('')
    const [addValue, setAddValue] = useState([])

    //from update
    const [req_id, setReq_id] = useState('')
    const [testCaseId, setTestCaseId] = useState('')
    const [testResult, setTestResult] = useState('')

    //notification
    const [notification, setNotification] = useState('Fill the form to submit')
    const [error, setError] = useState()

    const user = JSON.parse(localStorage.getItem('user'))
    const [createType, setCreateType] = useState('')
    const [add, setAdd] = useState(false)

    //create test case action
    const btn_createTestCase = useRef()
    useLayoutEffect(() => {
        if(btn_createTestCase.current) {
            if(valueRqId !== '' && valueTCId !== '' && valueTR !== '') {
                btn_createTestCase.current.disabled = false
                setNotification("")
            } else {
                btn_createTestCase.current.disabled = true
                setNotification("Fill the form to submit")
            }
        }
    }, [valueRqId, valueTCId, valueTR])

    //create filter action
    const btn_filter = useRef()
    const handleChecked = (id) => { 
        setAddValue(prev => {
            const checked = addValue.includes(id)
            if(checked) {
                return addValue.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })   
    }
    useEffect(() => {
        if(btn_filter.current) {
            if(filter !== '' && addValue.length !== 0) {
                btn_filter.current.disabled = false
                setNotification("")
            } else {
                btn_filter.current.disabled = true
                setNotification("Fill the form to submit")
            }
        }
    }, [addValue, filter])

    //update action
    const btn_update = useRef()
    useLayoutEffect(() => {
        if(btn_update.current) {
            if(req_id !== '' && testCaseId !== '' && testResult !== '') {
                btn_update.current.disabled = false
                setNotification("")
            } else {
                btn_update.current.disabled = true
                setNotification("Fill the form to submit")
            }
        }
    }, [req_id, testCaseId, testResult])

    if(update) { 
        // eslint-disable-next-line
        var data_update = data.find((value) => value.req_id == id )
    }

    useEffect(() => {
        setAdd(false)
        setAddValue([])
    }, [createType, data])

    useLayoutEffect(() => { 
        setAdd(false)
        setCreateType('')
        if(update) {
            setCreateType('update') 
            setReq_id(data_update.req_id)
            setTestCaseId(data_update.testcase_id)
            setTestResult(data_update.testcase_result)
        }
            // eslint-disable-next-line
    }, [update])


    const handleCreateTestCase = async (e) => {
        e.preventDefault()
        try {
            const option = {
                method: 'POST',
                body: JSON.stringify({
                    testcase_id: valueTCId,
                    req_id: valueRqId,
                    testcase_result: valueTR,
                    parent_tab_name: require,
                    user_id : user.id,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await fetch("http://localhost:8000/testcase", option).then((res) => res.json())
            if(res.data === null) {
                console.log(res.exception.username)
                setError(res.exception.username)
            } else {
                navigate('/home/'+require);
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (  
        <div className={cx('action-box')}>
            <div className={cx('btn-action')}>
                <Button long primary onClick={() => setCreateType('createCase')}>Test Case</Button>
                <Button long primary onClick={() => setCreateType('createFilter')}>Filter</Button>
            </div>
            <div className={cx('form-action')}>
                {createType === '' && (
                    <div className={cx('title')}>
                        <p>
                            Creat, UpDate Data here
                        </p>
                    </div>
                )}
                {createType === 'createCase' && (
                    <>
                        <h2>Create Test Case For {require}</h2>
                        <form onSubmit={handleCreateTestCase}>
                            <h4 style={{ color: "red" }}>{error}</h4>
                            <div className={cx('input-value')}>
                                <label form="requireID">Requirement ID</label>
                                <br></br>
                                <input type='text' value={valueRqId} onChange={(e) => setValueRqId(e.target.value)} name="requireID" placeholder="Enter requirement ID" required/>
                            </div>
                            <div className={cx('input-value')}>
                                <label form="tCId">Test Cases ID</label>
                                <br></br>
                                <input type='text' value={valueTCId} onChange={(e) => setValueTCId(e.target.value)} name="tCId" placeholder="Enter Test Case ID" required/>
                            </div>
                            <div className={cx('input-value')}>
                                <label form="tRsult">Test Result</label>
                                <br></br>
                                <input type='text' value={valueTR} onChange={(e) => setValueTR(e.target.value)} name="tRsult" placeholder="Enter Test Result" required/>
                            </div>
                            <div>
                                {notification} <br/><br/>
                                <input type='submit' name='submit' value='Create' ref={btn_createTestCase} disabled/>
                            </div>
                        </form>
                    </>
                )}
                {createType === 'createFilter' && (
                    <>
                        <h2>Create, Update Filter For {require}</h2>
                        <form>
                        <h4 style={{ color: "red" }}>{error}</h4>
                        <div className={cx('input-value')}>
                            <label form="filterName">Filter Name</label>
                            <br></br>
                            <input type='text' value={filter} onChange={(e) => setFilter(e.target.value)} name="filterName" placeholder="Enter Filter Name" required/>
                        </div> 
                        <div className={cx('btn-add')}>
                            <button type='button' onClick={() => setAdd(add ? false : true)}>{add ? 'Cancel' : 'Add'}</button>
                        </div>
                            {add && (
                                <>
                                    <div className={cx('input-value', 'scroll' )}>
                                        {data.map((value, index) => (
                                            <div className={cx('checkbox')} key={index}>
                                                <input type='checkbox' name="add" value={value.id} checked={addValue.includes(value.req_id)} onChange={() => handleChecked(value.req_id)}/>
                                                <span>{value.req_id}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={cx('btn-create')}>
                                        {notification} <br/><br/>
                                        <input type='submit' name='submit' value='Create' ref={btn_filter} disabled/>
                                    </div>
                                </>
                            )}
                        </form>
                    </>
                )}
                {id !== undefined && createType === 'update' && (
                    <>
                        <h2>Update</h2>
                        <form>
                            <h4 style={{ color: "red" }}>{error}</h4>
                            <div className={cx('input-value')}>
                                <label form="requireID">Requirement ID</label>
                                <br></br>
                                <input type='text'  value={req_id}  onChange={(e) => setReq_id(e.target.value)} name="requireID" required/>
                            </div>
                            <div className={cx('input-value')}>
                                <label form="tCId">Test Cases ID</label>
                                <br></br>
                                <input type='text' value={testCaseId}  onChange={(e) => setTestCaseId(e.target.value)} name="tCId" required/>
                            </div>
                            <div className={cx('input-value')}>
                                <label form="tRsult">Test Result</label>
                                <br></br> 
                                <input type='text' value={testResult}  onChange={(e) => setTestResult(e.target.value)} name="tRsult" required/>
                            </div>
                            <div>
                                {notification} <br/><br/>
                                <input type='submit' name='submit' value='Update' ref={btn_update} disabled/>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default Action;