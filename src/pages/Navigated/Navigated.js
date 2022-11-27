import { useParams, useNavigate } from "react-router-dom";

function Navigated() {
    const navigate = useNavigate()
    const { require } = useParams()

    const changePath = () => {
        if(require) {
            navigate('/home/'+require)
        }
    }
    changePath()
}

export default Navigated;