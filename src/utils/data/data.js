import { addHours } from "date-fns";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const events = [
    {
        title: "Meeting Time",
        notes: "Make the meeting time",
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: "#fafafa",
        user: {
            _id: 123,
            name: "John",
        },
    },
];

const initialFormValues = {
    title: "Title example",
    notes: "Notes example",
    start: new Date(),
    end: addHours(new Date(), 2),
};

export { customStyles, initialFormValues, events };
