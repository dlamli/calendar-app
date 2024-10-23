import { useEffect } from "react";
import { useAuthStore, useForm } from "src/hooks";
import { loginFormFields, registerFormFields } from "src/utils";
import Swal from "sweetalert2";

export const LoginPage = () => {
    const { startLogin, startRegister, errorMessage } = useAuthStore();
    const {
        loginEmail,
        loginPassword,
        onInputChange: onLoginInputChange,
        onResetForm: onResetLoginForm,
    } = useForm(loginFormFields);

    const {
        registerName,
        registerEmail,
        registerPassword,
        registerPasswordRepeat,
        onInputChange: onRegisterInputChange,
        onResetForm: onResetRegisterForm,
    } = useForm(registerFormFields);

    const loginSubmit = (e) => {
        e.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        if (registerPassword !== registerPasswordRepeat) {
            Swal.fire(
                "An error ocurred to register",
                "Password must match",
                "error"
            );
            return;
        }

        startRegister({
            name: registerName,
            email: registerEmail,
            password: registerPassword,
        });

        onResetRegisterForm();
    };

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire("Error in authentication", errorMessage, "error");
        }
    }, [errorMessage]);

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2 mt-4 d-flex justify-content-center">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat Password"
                                name="registerPasswordRepeat"
                                value={registerPasswordRepeat}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2 mt-4 d-flex justify-content-center">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Create account"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
