import React from "react";
import {UserContext} from "../Context";
import { checkAuth } from '../Api';

export const useLogout = (setErr) => {
    const [user, setUser] = React.useContext(UserContext);
    if (!user) {
        setErr('please log in');
        return;
    }
    checkAuth({ token: user.credential }).then(res => {
        if (res.error) {
            localStorage.removeItem('user');
            setUser(null);
            setErr('Session expired. Please log in again.');
        }
    }).catch(setErr);
};