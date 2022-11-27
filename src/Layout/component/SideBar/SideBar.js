import classNames from "classnames/bind";
import Button from "../../../components/Button";
import styles from './SideBar.module.css';


const cx = classNames.bind(styles)


function SideBar() {

    return (
        <div className={cx('side-bar')}>
            <div className={cx('btn-list')}>
                <ul>
                    <li><Button to='/home/unit' outline long className={cx('button-action')}>Unit</Button></li>
                    <li><Button to='/home/components' outline long className={cx('button-action')} >Component</Button></li>
                    <li><Button to='/home/domain' outline long className={cx('button-action')}>Domain</Button></li>
                    <li><Button to='/home/complete' outline long className={cx('button-action')}>Complete</Button></li>
                </ul>
            </div>
        </div>
    );
}

export default SideBar;