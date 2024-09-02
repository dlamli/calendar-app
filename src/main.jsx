import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import { CalendarApp } from "src/CalendarApp";
import "src/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CalendarApp />
    </React.StrictMode>
);
