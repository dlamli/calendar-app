import { useCalendarStore } from "src/hooks";

export const FabDelete = () => {
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();
    const handleClickDelete = () => startDeletingEvent();

    return (
        <button
            className={`btn btn-danger fab-danger d-flex justify-content-center align-items-center ${
                hasEventSelected ? "d-block" : "d-none"
            }`}
            onClick={handleClickDelete}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    );
};
