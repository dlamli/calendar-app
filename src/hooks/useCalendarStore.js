import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "src/api";
import {
    handleDeleteEvent,
    handleLoadEvent,
    handleNewEvent,
    handleSetActiveEvent,
    handleUpdateEvent,
} from "src/store";
import { convertEventsToDate } from "src/utils";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
    const { events, activeEvent } = useSelector((state) => state.calendar);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const setActiveEvent = (calendarEvent) => {
        dispatch(handleSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent.id) {
                //Update the active event
                await calendarApi.put(
                    `/event/${calendarEvent.id}`,
                    calendarEvent
                );
                dispatch(handleUpdateEvent({ ...calendarEvent, user }));
                Swal.fire(
                    "Event Updated",
                    "Event updated successfully",
                    "success"
                );
                return;
            }
            const { data } = await calendarApi.post("/event", calendarEvent);
            const { ok, event } = data;
            dispatch(handleNewEvent({ ...calendarEvent, id: event.id, user }));
        } catch (error) {
            Swal.fire(
                "Error updating event",
                error.response.data?.msg,
                "error"
            );
        }
    };

    const startLoadingEvent = async () => {
        try {
            const { data } = await calendarApi.get("/event");
            const events = convertEventsToDate(data.events);
            dispatch(handleLoadEvent(events));
        } catch (error) {
            console.log(error.message);
        }
    };

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/event/${activeEvent.id}`);
            dispatch(handleDeleteEvent());
            Swal.fire("Event Removed", "Event removed successfully", "success");
        } catch (error) {
            Swal.fire(
                "Error deleting event",
                error.response.data?.msg,
                "error"
            );
        }
    };

    return {
        // Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Methods
        setActiveEvent,
        startLoadingEvent,
        startDeletingEvent,
        startSavingEvent,
    };
};
