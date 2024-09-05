import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "src/hooks";

export const FabAddNew = () => {
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: "#fafafa",
            user: {
                _id: 123,
                name: "John",
            },
        });
        openDateModal();
    };

    return (
        <button
            className="btn btn-primary fab d-flex justify-content-center align-items-center"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    );
};
