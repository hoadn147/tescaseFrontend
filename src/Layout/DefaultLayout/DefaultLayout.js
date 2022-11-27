import classNames from "classnames/bind";
import Header from "../component/Header";
import SideBar from "../component/SideBar";
import styles from './DefaultLayout.module.css';

const cx = classNames.bind(styles)

function DefaultLayout({children}) {
    return (
        <div className={cx('Wrapper')}>
            <Header/>
            <div className={cx('container')}>
                <SideBar/>
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;