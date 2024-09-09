import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
    CalendarEvent,
    CalendarModal,
    FabAddNew,
    FabDelete,
    NavBar,
} from "src/ui/components";
import { lastViewLocalStorage, localizer } from "src/utils";
import { getMessagesES } from "src/utils/helpers/getMessages";
import { useAuthStore, useCalendarStore, useUiStore } from "src/hooks";

export const CalendarPage = () => {
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();
    const [lastView, setLastView] = useState(lastViewLocalStorage);
    const { user } = useAuthStore();

    const handleEventStyleGetter = (event, start, end, isSelected) => {
        const isMyEvent =
            user.uid === event.user._id || user.uid === event.user.uid;
        const style = {
            backgroundColor: isMyEvent ? "#347CF7" : "#465660",
            borderRadius: "0px",
            opacity: 0.8,
            color: "white",
        };

        return { style };
    };

    const handleDoubleClick = () => openDateModal();

    const handleSelect = (event) => {
        setActiveEvent(event);
    };

    const handleViewChange = (event) => {
        localStorage.setItem("lastView", event);
        setLastView(event);
    };

    useEffect(() => {
        startLoadingEvent();
    }, []);

    return (
        <>
            <NavBar />
            <Calendar
                culture="es"
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                className="calendar__section"
                defaultView={lastView}
                messages={getMessagesES()}
                eventPropGetter={handleEventStyleGetter}
                components={{
                    event: CalendarEvent,
                }}
                onDoubleClickEvent={handleDoubleClick}
                onSelectEvent={handleSelect}
                onView={handleViewChange}
            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    );
};
