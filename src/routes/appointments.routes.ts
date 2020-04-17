import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router(); // Criando a rota
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
	const appointments = appointmentsRepository.all();
	// sempre que precisarmos de uma informação dos agendamentos, recorrer ao repositorio
	return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
	try {
		// método post
		const { provider, date } = request.body; // pegando os parametro da requisição no corpo
		const parsedDate = parseISO(date); // Transforma a ISO em date

		const createAppointment = new CreateAppointmentService(
			appointmentsRepository,
		); // criando o service e passando o repositório
		const appointment = createAppointment.execute({
			date: parsedDate,
			provider,
		}); // criando o appointment com o service
		return response.json(appointment); // retornando o appointment
	} catch (err) {
		return response.status(400).json({ error: err.message });
		// pega o message da classe global Error passada no throw do service
	}
});

export default appointmentsRouter;
