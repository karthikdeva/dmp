import React from "react";
import { createRoot } from 'react-dom/client';

import { HashRouter as Router } from "react-router-dom";
//HashRouter BrowserRouter
import App from "./App.jsx"

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import "./assets/styles/style.scss";
import "./assets/styles/sidebar.scss";
import "./assets/styles/404.scss";
import configureStore from "./components/redux/configureStore";
import { Provider } from "react-redux";

import { ApolloProvider } from "./lib/context/ApolloProvider";
import { AuthProvider } from "./lib/context/AuthProvider";

const store = configureStore();
const DashBoardApp = () => {
    return (
            <React.StrictMode>
                <AuthProvider>
                    <ApolloProvider>
                        <Provider store={store}>
                            <Router>
                                <App /> 
                            </Router>
                        </Provider>
                    </ApolloProvider>
                </AuthProvider>
            </React.StrictMode>
    )
}
const root = createRoot(document.getElementById("root"));

root.render(<DashBoardApp />);
console.log("%chttps://goinfiniti.in/","font-size:30px;background:yellow");
console.log("%cFor Business enquiry: karthikdeva.blr@gmail.com","font-size:30px;background:yellow");

