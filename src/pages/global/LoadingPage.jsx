import { Spinner } from "react-bootstrap";

export const LoadingPage = () => {
    return (
        <div className="loading-bg">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <p className="fw-bold">Loading</p>
                <Spinner
                    animation="border"
                    className="spinner-loading"
                    role="status"
                    variant="primary"
                >
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </div>
    );
};
