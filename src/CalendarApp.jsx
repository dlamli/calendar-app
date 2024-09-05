import { Provider } from "react-redux";
import { AppRouter } from "src/router";
import { store } from "src/store";

export const CalendarApp = () => {
    return (
        <>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </>
    );
};
