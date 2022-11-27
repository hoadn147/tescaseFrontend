import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import styles from './ResultItem.module.css';
import Button from "../../../components/Button";

const cx = classNames.bind(styles)

function ResultItem({ data = [] , onClick }) {
    const { require } = useParams() 
    const Delete = (id) => {
        
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
                                    <td>{value.requirementId}</td>
                                    <td>{value.testCasesId}</td>
                                    <td>{value.testResult}</td>
                                    <td>
                                        <Button primary to={'/home/'+require+'/'+value.requirementId} onClick={Delete(value.requirementId)}>Delete</Button>
                                        <Button outline to={'/home/'+require+'/'+value.requirementId} onClick={onClick}>Update</Button>
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