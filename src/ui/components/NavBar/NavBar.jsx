import { useAuthStore } from "src/hooks";

export const NavBar = () => {
    const { starLogout, user } = useAuthStore();

    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <div className="d-flex gap-2 justify-content-center align-items-center">
                    <i className="fas fa-calendar-alt"></i>
                    <span>{user.name}</span>
                </div>
            </span>
            <button className="btn btn-outline-danger" onClick={starLogout}>
                <i className="fa fa-sign-out-alt"></i>
                &nbsp;
                <span>Logout</span>
            </button>
        </div>
    );
};
