import express from 'express';
import path from 'path';
import { z, ZodError } from 'zod';
import services from '../services/index.js';
const router = express.Router();
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testZbody = async (req, res, criteria) => {
  const zObject = z.object(criteria);
  try {
    zObject.parse(req.body); // Valida el cuerpo de la solicitud
  } catch (error) {
    if (error instanceof ZodError) {
      console.log('Zod error');
      res.status(422).json({
        errors: error.issues.map(issue => ({
          path: issue.path,
          message: issue.message,
        })),
      });
      return; // Asegúrate de no continuar el flujo
    } else {
      console.log(error);
      res.status(500).send('Internal server error');
      return;
    }
  }
  return [req, res];
};

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
router.post('/api/consulta', async (req, res, next) => {
  const bodyCriteria = {
    precio: z.number(),
    barrio: z.string(),
    indice: z.string(),
    cadencia: z.number(),
    cantidadAmb: z.number(),
    fechaInicioContrato: z.string(),
  };

  try {
    const [reqValidated, resValidated] = await testZbody(req, res, bodyCriteria);
    if (!reqValidated) return; // Si la validación falló, no continúa
    const result = await services.getConsulta(req.body); // Llama al servicio con el cuerpo validado
    res.json(result); // Devuelve el resultado como JSON
  } catch (error) {
    next(error); // Maneja cualquier otro error
  }
});
export default router;