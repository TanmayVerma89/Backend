import { Router } from "express";
import { useGraph } from "../services/graph.service.js";
import { cohereModel, mistralModel, geminiModel } from "../services/ai.service.js";
import { HumanMessage } from "langchain";
const chatRouter = Router();
chatRouter.post("/message", async (req, res) => {
    const { message } = req.body;
    const humanMessage = new HumanMessage(message);
    const response = await geminiModel.invoke([humanMessage]);
    return res.status(200).json({
        success: true,
        result: response,
    });
});
chatRouter.post("/battle", async (req, res) => {
    const message = req.body.problem;
    const response = await useGraph(message);
    return res.status(200).json({
        success: true,
        result: response,
    });
});
chatRouter.get("/health", async (req, res) => {
    return res.status(200).json({
        message: `Health checked`,
    });
});
export default chatRouter;
