import express from "express";
import {PrismaClient} from "@prisma/client";

const app = express();

app.use(express.json());

app.use(routes)

app.listen(3000, () => console.log("Server is running."));