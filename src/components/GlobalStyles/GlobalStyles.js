import classNames from "classnames/bind";
import styles from './GlobalStyles.module.css';

const cx = classNames.bind(styles)

function GlobalStyles({children}) {
    return (<div className={cx('Container')}>
        {children}
    </div>);
}

export default GlobalStyles;