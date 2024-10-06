import express from 'express';
import path from 'path';
import services from '../services/index.js';
const router = express.Router();
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//---------------------PAGES----------------------------
router.use('/', express.static(path.join(__dirname, '..', 'static', 'landing')));
router.use(express.static(path.join(__dirname, '..', 'static', 'build')));
router.get('/reset-password/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'build', 'index.html')));
router.get('/dashboard/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'build', 'index.html')));
router.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'build', 'index.html')));
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'build', 'index.html')));
router.get('/redirect/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'build', 'index.html')));
//router.use('^(?!/api)\w+$', express.static(path.join(__dirname, '..', 'static', 'build')));
//router.get('/landing', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'landing', 'index.html'))); //Landing
//router.get('^(?!/api)\w+$', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'portal', 'index.html'))); //Portal

router.all('', async (req, res, next) => {
  res.status(400).body = "Invalid path!";
  next();
});
router.get('/api/ipc', async (req, res, next) => {
  try {
    const result = await services.getHistoricoIPC();
    res.json(result); // Devuelve el resultado como JSON
  } catch (error) {
    next(error); // Maneja errores con el middleware 'next'
  }
});
export default router;