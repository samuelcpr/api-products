import express, { request, response } from "express";
import swaggerUi from "swagger-ui-express"

import {router} from "./routes";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup())


app.get("/terms", (request, response)=> {
    return response.json({
        message: "Termos de serviço",
    });
});

app.use("/v1", router);

app.listen(3000, () => console.log("server is running on port 3000"))