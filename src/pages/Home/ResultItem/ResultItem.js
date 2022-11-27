import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";
import styles from './ResultItem.module.css';
import Button from "../../../components/Button";

const cx = classNames.bind(styles)

function ResultItem({ data = [] , onClick }) {
    const { require } = useParams() 
    const user = JSON.parse(localStorage.getItem('user'))
    const negative = useNavigate()
    const deleteTestCase = async (id) => {
        try {
            const option = {
                method: 'DELETE',
                body: JSON.stringify({
                    user_id: user.id,
                    id: id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const res = await fetch("http://localhost:8000/testcase", option).then((res) => res.json())
            console.log(res.data.message)
            negative('/home/'+require)
        } catch (error) {
            console.log(error)
        }
    }
    return ( 
        <div className={cx('wrapper')}>
            <table className={cx('table-data')}>
                <thead>
                    <tr>
                        <td>Requirement ID</td>
                        <td>Test Cases ID</td>
                        <td>Test Result</td>
                        <td>Action</td>
                    </tr>
                </thead>
            </table>
            <div className={cx('scroll')}>
                <table className={cx('table-data')}>
                    <tbody>
                        {data.map((value, index) => {
                            return(
                                <tr key={index}>
                                    <td>{value.req_id}</td>
                                    <td>{value.testcase_id}</td>
                                    <td>{value.testcase_result}</td>
                                    <td>
                                        <div className={cx('action')}>
                                            <button className={cx('primary')} onClick={e => deleteTestCase(value.id)}>Delete</button>
                                            <Button outline to={'/home/'+require+'/'+value.req_id} onClick={onClick}>Update</Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default ResultItem;