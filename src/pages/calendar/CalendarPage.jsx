import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarEvent, CalendarModal, NavBar } from "src/ui/components";
import { events, lastViewLocalStorage, localizer } from "src/utils";
import { getMessagesES } from "src/utils/helpers/getMessages";
import { useState } from "react";

export const CalendarPage = () => {
    const [lastView, setLastView] = useState(lastViewLocalStorage);

    const handleEventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: "#347CF7",
            borderRadius: "0px",
            opacity: 0.8,
            color: "white",
        };

        return { style };
    };

    const handleDoubleClick = (event) => {
        // console.log({ doubleClick: event });
    };
    const handleSelect = (event) => {
        // console.log({ select: event });
    };
    const handleViewChange = (event) => {
        localStorage.setItem("lastView", event);
        setLastView(event);
    };

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
        </>
    );
};
