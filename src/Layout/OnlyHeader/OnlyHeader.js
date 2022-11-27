import classNames from "classnames/bind";
import Header from "../component/Header";
import styles from './OnlyHeader.module.css';

const cx = classNames.bind(styles)

function OnlyHeader({children, action}) {
    return (
        <div className={cx('Wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default OnlyHeader;