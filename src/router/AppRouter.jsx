import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from "react-router-dom";

import { CalendarPage, AuthPage } from "src/pages";
import { AUTH_LOGIN, AUTH_PATH, HOME_PATH, NOT_AUTHENTICATED } from "src/utils";

const authStatus = "not_authenticated";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {
                authStatus === NOT_AUTHENTICATED
                ? (<Route path={AUTH_PATH} element={<AuthPage />} />)
                : (<Route path={HOME_PATH} element={<CalendarPage />} />)
            }
            <Route path={HOME_PATH} element={<Navigate to={AUTH_LOGIN} />} />
        </Route>
    )
);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
