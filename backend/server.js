import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

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