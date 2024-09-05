import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
    _id: new Date().getTime(),
    title: "Meeting Time",
    notes: "Make the meeting time",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
        _id: 123,
        name: "John",
    },
};

const updateEvent = (state, payload) => {
    return state.events.map((event) => {
        if (event._id === payload._id) {
            return payload;
        }

        return event;
    });
};
const deleteEvent = (state) => {
    return state.events.filter((event) => event._id !== state.activeEvent._id);
};

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        events: [tempEvent],
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
    },
});

export const {
    handleDeleteEvent,
    handleNewEvent,
    handleSetActiveEvent,
    handleUpdateEvent,
} = calendarSlice.actions;
