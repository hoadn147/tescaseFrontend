import classNames from "classnames/bind";
import styles from './Action.module.css';
import { useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { useLayoutEffect, useState, useRef, useEffect } from "react";

const cx = classNames.bind(styles)

function Action({ update = false, id, data = [] }) {
    const { require } = useParams()
    //form create test case
    const [valueRqId, setValueRqId] = useState('')
    const [valueTCId, setValueTCId] = useState('')
    const [valueTR, setValueTR] = useState('')
    //form create filter
    const [filter, setFilter] = useState('')
    const [addValue, setAddValue] = useState([])
    //from update
    const [requirementId, setRequirementId] = useState('')
    const [testCaseId, setTestCaseId] = useState('')
    const [testResult, setTestResult] = useState('')

    const [createType, setCreateType] = useState('')
    const [add, setAdd] = useState(false)

    //create test case action
    const btn_createTestCase = useRef()
    useLayoutEffect(() => {
        if(btn_createTestCase.current) {
            if(valueRqId !== '' && valueTCId !== '' && valueTR !== '') {
                btn_createTestCase.current.disabled = false
            } else {
                btn_createTestCase.current.disabled = true
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
            } else {
                btn_filter.current.disabled = true
            }
        }
    }, [addValue, filter])

    //update action
    const btn_update = useRef()
    useLayoutEffect(() => {
        if(btn_update.current) {
            if(requirementId !== '' && testCaseId !== '' && testResult !== '') {
                btn_update.current.disabled = false
            } else {
                btn_update.current.disabled = true
            }
        }
    }, [requirementId, testCaseId, testResult])

    if(update) { 
        // eslint-disable-next-line
        var data_update = data.find((value) => value.requirementId == id )
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
            setRequirementId(data_update.requirementId)
            setTestCaseId(data_update.testCasesId)
            setTestResult(data_update.testResult)
        }
            // eslint-disable-next-line
    }, [update])

    return (  
        <div className={cx('action-box')}>
            <div className={cx('btn-action')}>
                <Button long primary onClick={() => setCreateType('createCase')}>Create Test Case</Button>
                <Button long primary onClick={() => setCreateType('createFilter')}>Create Filter</Button>
            </div>
            <div className={cx('form-action')}>
                {createType === 'createCase' && (
                    <>
                        <h2>Create Test Case For {require}</h2>
                        <form>
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
                            <input type='submit' name='submit' value='Create' ref={btn_createTestCase} disabled/>
                        </form>
                    </>
                )}
                {createType === 'createFilter' && (
                    <>
                        <h2>Create Filter For {require}</h2>
                        <form>
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
                                                <input type='checkbox' name="add" checked={addValue.includes(value.requirementId)} onChange={() => handleChecked(value.requirementId)}/>
                                                <span>{value.testResult}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={cx('btn-create')}>
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
                            <div className={cx('input-value')}>
                                <label form="requireID">Requirement ID</label>
                                <br></br>
                                <input type='text'  value={requirementId}  onChange={(e) => setRequirementId(e.target.value)} name="requireID" required/>
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
                            <input type='submit' name='submit' value='Update' ref={btn_update} disabled/>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default Action;