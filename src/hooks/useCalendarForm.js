import { differenceInSeconds } from "date-fns";
import { useState, useMemo, useEffect } from "react";
import Swal from "sweetalert2";
import { useUiStore, useCalendarStore } from "src/hooks";

export const useCalendarForm = (initialValues) => {
    const [formSubmited, setFormSubmited] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const { closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const titleClass = useMemo(() => {
        if (!formSubmited) {
            return "";
        }

        return formValues.title.length > 0 ? "is-valid" : "is-invalid";
    }, [formValues.title, formSubmited]);

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent]);

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

    const handleSubmit = async (event) => {
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

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmited(false);
    };

    const handleRequestClose = () => closeDateModal();

    return {
        //Properties
        ...formValues,
        formValues,
        titleClass,

        // Methods
        handleInputChange,
        handleDateChange,
        handleSubmit,
        handleRequestClose,
    };
};
