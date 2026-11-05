import { Participants } from "./participants.class.js";
import { Validation } from "./participants.validations.js";
import { encrypt } from "../../config/encrypt.js";
import { Router } from "express";

const routes = Router();

routes.get("/", async (req, res, next) => {
    try {
        const participants = new Participants();
        const result = await participants.findAll();

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
        const participants = new Participants({ id: req.params.id });
        await new Validation(participants).verifyId();

        const [result] = await participants.findById();

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
        req.body.password = await encrypt.encrypt(req.body.password);
        const participants = new Participants(req.body);
        await participants.create();

        return res.status(201).json({
            success: true,
            id: participants.id,
            message: "Registro cadastrado com sucesso."
        });
    } catch (error) {
        next(error);
    }
});

routes.post("/login", async (req, res, next) => {
    try {
        const participants = new Participants(req.body);
        const result = await participants.login();

        const validPassword = await encrypt.compare(req.body.password, result[0].password);
        if (validPassword && result.length > 0) {
            return res.status(200).json({
                success: true,
                id: result[0].id,
                role: result[0].admin ? "admin" : "user",
                message: "Login realizado com sucesso."
            });
        }

        return res.status(402).json({
            success: false,
            message: "Email ou senha inválidos."
        });
    } catch (error) {
        next(error);
    }
});

routes.put("/", async (req, res, next) => {
    try {
        req.body.password = await encrypt.encrypt(req.body.password);
        const participants = new Participants(req.body);
        await new Validation(participants).verifyId();

        await participants.update();

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
        const participants = new Participants({ id: req.params.id });
        await new Validation(participants).verifyId();

        await participants.delete();

        return res.status(200).json({
            success: true,
            message: "Registro excluído com sucesso."
        });
    } catch (error) {
        next(error);
    }
});

export default routes;