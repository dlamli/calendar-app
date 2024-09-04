export const NavBar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <div className="d-flex gap-2 justify-content-center align-items-center">
                    <i className="fas fa-calendar-alt"></i>
                    <span>CalendarApp</span>
                </div>
            </span>
            <button className="btn btn-outline-danger">
                <i className="fa fa-sign-out-alt"></i>
                <span>Logout</span>
            </button>
        </div>
    );
};
