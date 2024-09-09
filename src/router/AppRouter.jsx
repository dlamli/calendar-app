import { useEffect } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from "react-router-dom";
import { useAuthStore } from "src/hooks";

import { CalendarPage, LoadingPage, LoginPage } from "src/pages";
import {
    AUTH_LOGIN,
    AUTH_PATH,
    CHECKING,
    HOME_PATH,
    NOT_AUTHENTICATED,
} from "src/utils";

export const AppRouter = () => {
    const { checkAuthToken, status } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    if (status === CHECKING) {
        return <LoadingPage />;
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
