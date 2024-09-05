import { es } from "date-fns/locale/es";

import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";

import "sweetalert2/dist/sweetalert2.min.css";
import "react-datepicker/dist/react-datepicker.css";

import { useCalendarForm, useUiStore } from "src/hooks";
import { customStyles, initialFormValues } from "src/utils";

registerLocale("es", es);

Modal.setAppElement("#root");

export const CalendarModal = () => {
    const {
        formValues,
        titleClass,
        handleRequestClose,
        handleDateChange,
        handleInputChange,
        handleSubmit,
    } = useCalendarForm(initialFormValues);

    const { isDateModalOpen } = useUiStore();

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={handleRequestClose}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> New Event </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                    <label>Date and hour start</label>
                    <br />
                    <DatePicker
                        selected={formValues.start}
                        onChange={(event) => handleDateChange(event, "start")}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        // locale="es"
                        // timeCaption="Hora"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Date and hour finish</label>
                    <br />
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(event) => handleDateChange(event, "end")}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        // locale="es"
                        // timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Title and notes</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        Simple description
                    </small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">
                        Additional Information
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>
            </form>
        </Modal>
    );
};
