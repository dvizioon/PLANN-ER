import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const NODE_ENV = process.env.VITE_NODE_ENV || 'development';
const PORT = process.env.VITE_PORT || 5173;

app.use(express.static(path.join(__dirname, "dist")));

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Ambiente: ${NODE_ENV}`);
  console.log(`🚀 Frontend rodando na porta ${PORT}`);
});