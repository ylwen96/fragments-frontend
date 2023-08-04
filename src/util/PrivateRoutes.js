import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = (props) => {
    const { username } = props;
    // let auth = { 'token': false }
    return (
        // auth.token ? <Outlet /> : <Navigate to="/login" />
        username !== "" ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes