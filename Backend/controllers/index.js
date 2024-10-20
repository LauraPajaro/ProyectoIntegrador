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
      return null; // Devuelve null si hay un error de validación
    } else {
      console.log(error);
      res.status(500).send('Internal server error');
      return null;
    }
  }
  return [req, res]; // Devuelve un array solo si todo está bien
};

//---------------------PAGES----------------------------
router.use('/', express.static(path.join(__dirname, '..', 'static', 'landing')));
router.use(express.static(path.join(__dirname, '..', 'static', 'build')));
router.get('/dashboard/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'build', 'index.html')));
router.get('/dashboard', (req, res) => res.sendFile(path.join(__dirname, '..', 'static', 'build', 'index.html')));

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
router.get('/api/barrios', async (req, res, next) => {
  try {
    const result = await services.getBarrios();
    res.json(result); // Devuelve el resultado como JSON
  } catch (error) {
    next(error); // Maneja errores con el middleware 'next'
  }
});
router.get('/api/tipos-prediccion', async (req, res, next) => {
  try {
    const result = await services.getTiposPrediccion();
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
    const result = await testZbody(req, res, bodyCriteria);
    if (!result) return; // Si testZbody devolvió null, no continúa
    const [reqValidated, resValidated] = result; // Desestructura solo si testZbody devuelve un array
    const consultaResult = await services.getConsulta(reqValidated.body); // Llama al servicio con el cuerpo validado
    resValidated.json(consultaResult); // Devuelve el resultado como JSON
  } catch (error) {
    next(error); // Maneja cualquier otro error
  }
});
export default router;