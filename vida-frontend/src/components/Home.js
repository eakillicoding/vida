import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Paper, Typography, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

function Home() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        weight: "",
        calories: "",
        water: "",
        sleep: "",
        steps: "",
        comfort_level: "Comfortable"  // Default value
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleComfortChange = (event, newComfortLevel) => {
        if (newComfortLevel !== null) {
            setFormData({ ...formData, comfort_level: newComfortLevel });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/health-status", formData);
            localStorage.setItem("healthData", JSON.stringify(response.data));
            navigate("/healthstatus");
        } catch (error) {
            console.error("Error logging health data:", error);
        }
    };

    return (
        <Paper elevation={3} sx={{ padding: 3, margin: "auto", maxWidth: 500, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                Log Your Health Data
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField type="number" name="weight" label="Weight (lbs)" onChange={handleChange} required />
                <TextField type="number" name="calories" label="Calories" onChange={handleChange} required />
                <TextField type="number" name="water" label="Water (cups)" onChange={handleChange} required />
                <TextField type="number" name="sleep" label="Sleep (hours)" onChange={handleChange} required />
                <TextField type="number" name="steps" label="Steps" onChange={handleChange} required />

                {/* New Comfortable/Uncomfortable Toggle Button */}
                <Typography variant="h6">How do you feel?</Typography>
                <ToggleButtonGroup
                    value={formData.comfort_level}
                    exclusive
                    onChange={handleComfortChange}
                    sx={{ justifyContent: "center" }}
                >
                    <ToggleButton value="Comfortable">Comfortable</ToggleButton>
                    <ToggleButton value="Uncomfortable">Uncomfortable</ToggleButton>
                </ToggleButtonGroup>

                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Box>
        </Paper>
    );
}

export default Home;