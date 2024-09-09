import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: "Meeting Time",
//     notes: "Make the meeting time",
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: "#fafafa",
//     user: {
//         _id: 123,
//         name: "John",
//     },
// };

const updateEvent = (state, payload) => {
    return state.events.map((event) => {
        if (event.id === payload.id) {
            return payload;
        }

        return event;
    });
};
const deleteEvent = (state) => {
    return state.events.filter((event) => event.id !== state.activeEvent.id);
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        events: [
            // tempEvent
        ],
        isLoadingEvents: true,
        activeEvent: null,
    },
    reducers: {
        handleSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        handleNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        handleUpdateEvent: (state, { payload }) => {
            state.events = updateEvent(state, payload);
        },
        handleDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = deleteEvent(state);
                state.activeEvent = null;
            }
        },
        handleLoadEvent: (state, { payload }) => {
            state.isLoadingEvents = false;
            payload.forEach((event) => {
                const exist = state.events.some(
                    (dbEvent) => dbEvent.id === event.id
                );

                if (!exist) {
                    state.events.push(event);
                }
            });
        },
        handleLogoutCalendar: (state) => {
            (state.events = []),
                (state.isLoadingEvents = true),
                (state.activeEvent = null);
        },
    },
});

export const {
    handleDeleteEvent,
    handleLoadEvent,
    handleLogoutCalendar,
    handleNewEvent,
    handleSetActiveEvent,
    handleUpdateEvent,
} = calendarSlice.actions;
