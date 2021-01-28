import React from "react";
import Twitter from './twitter';
import { BrowserRouter as Router, Route } from "react-router-dom";

function AppRouter() {
    return (
        <Router>
            <div>
            <Route exact path="/" component={Twitter} />
            </div>
        </Router>
    );
};

export default AppRouter;

