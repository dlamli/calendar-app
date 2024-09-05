import { useDispatch, useSelector } from "react-redux";
import {
    handleDeleteEvent,
    handleNewEvent,
    handleSetActiveEvent,
    handleUpdateEvent,
} from "src/store";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(handleSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        if (calendarEvent._id) {
            //Update the active event
            dispatch(handleUpdateEvent({ ...calendarEvent }));
        } else {
            dispatch(
                handleNewEvent({ ...calendarEvent, _id: new Date().getTime() })
            );
        }
    };

    const startDeletingEvent = () => {
        dispatch(handleDeleteEvent());
    };

    return {
        // Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Methods
        setActiveEvent,
        startDeletingEvent,
        startSavingEvent,
    };
};
