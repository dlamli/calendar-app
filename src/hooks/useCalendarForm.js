import { differenceInSeconds } from "date-fns";
import { useState, useMemo } from "react";
import Swal from "sweetalert2";

export const useCalendarForm = (initialValues) => {
    const [isOpen, setIsOpen] = useState(true);
    const [formSubmited, setFormSubmited] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);

    const titleClass = useMemo(() => {
        if (!formSubmited) {
            return "";
        }

        return formValues.title.length > 0 ? "is-valid" : "is-invalid";
    }, [formValues.title, formSubmited]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const handleDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormSubmited(true);

        const dateDifference = differenceInSeconds(
            formValues.end,
            formValues.start
        );

        if (isNaN(dateDifference) || dateDifference <= 0) {
            Swal.fire(
                "Date incorrect",
                "Please check date registered",
                "error"
            );
            return;
        }

        if (formValues.title.length <= 0) return;
    };

    const handleRequestClose = () => {
        setIsOpen(false);
    };

    return {
        ...formValues,
        formValues,
        isOpen,
        titleClass,
        handleInputChange,
        handleDateChange,
        handleSubmit,
        handleRequestClose,
    };
};
