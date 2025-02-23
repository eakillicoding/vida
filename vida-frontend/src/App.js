import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Typography } from "@mui/material";
import Home from "./components/Home";
import HealthStatus from "./components/HealthStatus";

function App() {
    return (
        <Router>
            {/* Navigation Header */}
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Vida Wellness Tracker
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/healthstatus">Health Status</Button>
                </Toolbar>
            </AppBar>

            {/* Page Content */}
            <Container sx={{ marginTop: 4 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/healthstatus" element={<HealthStatus />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;