import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "src/api";
import {
    handleChecking,
    handleClearErrorMessage,
    handleLogin,
    handleLogout,
    handleLogoutCalendar,
} from "src/store";
import Swal from "sweetalert2";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(handleChecking());
        try {
            const { data } = await calendarApi.post("/auth", {
                email,
                password,
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(handleLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(handleLogout("Credentials incorrect"));
            setTimeout(() => {
                dispatch(handleClearErrorMessage());
            }, 10);
        }
    };

    const startLogout = () => {
        localStorage.clear();
        dispatch(handleLogout());
        dispatch(handleLogoutCalendar());
    };

    const startRegister = async ({ name, email, password }) => {
        dispatch(handleChecking());
        try {
            const { data } = await calendarApi.post("/auth/new", {
                name,
                email,
                password,
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(
                handleLogin({
                    uid: data.uid,
                    name: data.name,
                    token: data.token,
                })
            );

            Swal.fire(
                "Account registration",
                "Registration successful",
                "success"
            );
        } catch ({ response }) {
            dispatch(
                handleLogout(
                    response.data?.msg ||
                        "Contact administration for management of error"
                )
            );
            setTimeout(() => {
                dispatch(handleClearErrorMessage());
            }, 10);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            dispatch(handleLogout());
        }

        try {
            const { data } = await calendarApi.get("/auth/renew");
            localStorage.setItem("token", token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(handleLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            // localStorage.clear();
            dispatch(handleLogout());
        }
    };

    return {
        // Properties
        status,
        user,
        errorMessage,
        // Methods
        checkAuthToken,
        startLogout,
        startLogin,
        startRegister,
    };
};
