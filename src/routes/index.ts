import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();
routes.use('/appointments', appointmentsRouter);
// direcionando para a rota dos appoitments com o parametro /appointments
export default routes;
