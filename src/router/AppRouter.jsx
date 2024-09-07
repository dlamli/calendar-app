import { useEffect } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from "react-router-dom";
import { useAuthStore } from "src/hooks";

import { CalendarPage, LoginPage } from "src/pages";
import {
    AUTH_LOGIN,
    AUTH_PATH,
    CHECKING,
    HOME_PATH,
    NOT_AUTHENTICATED,
} from "src/utils";

// const authStatus = "not_authenticated";
// const authStatus = "authenticated";

export const AppRouter = () => {
    const { checkAuthToken, status } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === CHECKING) {
        return <h3>Loading....</h3>;
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                {status === NOT_AUTHENTICATED ? (
                    <>
                        <Route path={AUTH_PATH} element={<LoginPage />} />
                        <Route
                            path={HOME_PATH}
                            element={<Navigate to={AUTH_LOGIN} />}
                        />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<CalendarPage />} />
                        <Route path={HOME_PATH} element={<Navigate to="/" />} />
                    </>
                )}
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};
