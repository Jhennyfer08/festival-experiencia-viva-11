import { Inscriptions } from "../inscriptions/inscriptions.class.js";
import { Activities } from "./activities.class.js";
import { Validation } from "./activities.validations.js";
import { Router } from "express";

const routes = Router();

routes.get("/", async (req, res, next) => {
    try {
        const activities = new Activities();
        const result = await activities.findAll();

        return res.status(200).json({
            success: true,
            content: result
        });
    } catch (error) {
        next(error);
    }
});

routes.get("/inscripted", async (req, res, next) => {
    try {
        const activities = new Activities();
        const result = await activities.findInscripted();

        return res.status(200).json({
            success: true,
            content: result
        });
    } catch (error) {
        next(error);
    }
});

routes.get("/:id", async (req, res, next) => {
    try {
        const activities = new Activities({ id: req.params.id });
        await new Validation(activities).verifyId();

        const [result] = await activities.findById();

        return res.status(200).json({
            success: true,
            content: result
        });
    } catch (error) {
        next(error);
    }
});

routes.post("/", async (req, res, next) => {
    try {
        const activities = new Activities(req.body);
        await new Validation(activities).verifyCapacity();

        await activities.create();

        return res.status(201).json({
            success: true,
            id: activities.id,
            message: "Registro cadastrado com sucesso."
        });
    } catch (error) {
        next(error);
    }
});

routes.put("/", async (req, res, next) => {
    try {
        const activities = new Activities(req.body);
        await new Validation(activities).verifyId();
        await new Validation(activities).verifyCapacity();

        await activities.update();

        return res.status(200).json({
            success: true,
            message: "Registro atualizado com sucesso."
        });
    } catch (error) {
        next(error);
    }
});

routes.delete("/:id", async (req, res, next) => {
    try {
        const activities = new Activities({ id: req.params.id });
        await new Validation(activities).verifyId();

        await activities.delete();

        return res.status(200).json({
            success: true,
            message: "Registro excluído com sucesso."
        });
    } catch (error) {
        next(error);
    }
});

export default routes;