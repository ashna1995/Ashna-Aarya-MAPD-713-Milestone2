/**
 * WellCare Hospital Management System - Server
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This is the main server file for the WellCare hospital management system.
 * It sets up the Express application, configures middleware, establishes database connection,
 * and initializes Swagger documentation. The server handles API routes for managing
 * patient clinical data and provides a user-friendly API documentation interface.
 */

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import routes from "./routes/hospitalRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Swagger configuration
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Patient Clinical Data Management API",
        version: "1.0.0",
        description: "API for managing patient clinical data for healthcare providers",
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 5000}`,
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"], // Path to the API routes
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api", routes);

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
    });

export default app;