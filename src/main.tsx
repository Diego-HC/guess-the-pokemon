import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <div className="bg-slate-700 text-gray-300 h-screen flex-row items-center text-center justify-center font-bold text-2xl flex">
            <App />
        </div>
    </React.StrictMode>
);
