import express from "express";
import cors from "cors";

import participants from "./src/module/participants/participants.routes.js";
import activities from "./src/module/activities/activities.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/participants", participants);
app.use("/activities", activities);

app.use(async (error, req, res, next) => {
    return res.status(error.status || 500).json({
        success: false,
        message: error.status ? error.message : "Não foi possível concluir a operação."
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});