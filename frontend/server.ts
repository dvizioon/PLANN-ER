import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname,"..", "dist");
const app = express();
const NODE_ENV = process.env.VITE_NODE_ENV || 'development';
const PORT = process.env.VITE_PORT || 5173;

app.use(express.static(distPath));

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Ambiente: ${NODE_ENV}`);
  console.log(`🚀 Frontend rodando na porta ${PORT}`);
});