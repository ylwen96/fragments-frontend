import { Auth } from "./auth";
import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PrivateRoutes = (props) => {
    const [user, setUser] = useState({});
    const { onDataFromPrivateRoute } = props;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();
                setUser({
                    username: userInfo.username,
                    userId: userInfo.attributes.sub,
                    email: userInfo.attributes.email
                });
                onDataFromPrivateRoute(user);
            } catch (error) {
                console.log("Error fetching user info:", error);
            }
        }

        fetchUser();
        // eslint-disable-next-line
    }, []);

    return (
        user !== null ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;
