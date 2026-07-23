import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Frontend rodando na porta ${PORT}`);
});