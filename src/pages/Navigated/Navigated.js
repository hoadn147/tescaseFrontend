import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
function Navigated() {
    const navigate = useNavigate()
    const { require } = useParams()

    useEffect(() => {
        if(!!require) {
            navigate('/home/'+require)
        }
    }, [])
}

export default Navigated;