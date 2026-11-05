import { Inscriptions } from "./inscriptions.class.js";
import { Validation } from "./inscriptions.validations.js";
import { Router } from "express";

const routes = Router();

routes.get("/", async (req, res, next) => {
    try {
        const inscriptions = new Inscriptions();
        const result = await inscriptions.findAll();

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
        const inscriptions = new Inscriptions({ id: req.params.id });
        await new Validation(inscriptions).verifyId();

        const [result] = await inscriptions.findById();

        return res.status(200).json({
            success: true,
            content: result
        });
    } catch (error) {
        next(error);
    }
});

routes.get("/:id_activity/:id_participant", async (req, res, next) => {
    try {
        const inscriptions = new Inscriptions({
            id_activity: req.params.id_activity,
            id_participant: req.params.id_participant
        });

        const [result] = await inscriptions.findCreated();

        if (!result) {
            return res.status(206).json({
                success: false,
            });
        }

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
        const inscriptions = new Inscriptions(req.body);
        await new Validation(inscriptions).verifyCapacity();
        await new Validation(inscriptions).verifyCreated();

        await inscriptions.create();

        return res.status(201).json({
            success: true,
            id: inscriptions.id,
            message: "Registro cadastrado com sucesso."
        });
    } catch (error) {
        next(error);
    }
});

routes.put("/", async (req, res, next) => {
    try {
        const inscriptions = new Inscriptions(req.body);
        await new Validation(inscriptions).verifyId();
        await new Validation(inscriptions).verifyCreated();

        const [result] = await inscriptions.findById();

        const isSameActivity = req.body.id_activity === result.id_activity;
        const isDifferentParticipant = req.body.id_participant !== result.id_participant;
        
        if (!(isSameActivity && isDifferentParticipant)) {
            await new Validation(inscriptions).verifyCapacity();
        }

        await inscriptions.update();

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
        const inscriptions = new Inscriptions({ id: req.params.id });
        await new Validation(inscriptions).verifyId();

        await inscriptions.delete();

        return res.status(200).json({
            success: true,
            message: "Registro excluído com sucesso."
        });
    } catch (error) {
        next(error);
    }
});

export default routes;