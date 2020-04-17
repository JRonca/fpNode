import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
	// recebimento de informações
	provider: string;
	date: Date;
}
class CreateAppointmentService {
	private appointmentsRepository: AppointmentsRepository;

	constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository;
	}

	public execute({ provider, date }: Request): Appointment {
		const appointmentDate = startOfHour(date);
		// zera os minutos e segundos
		// não permitindo agendamentos em datas quebradas
		const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
			appointmentDate,
		); // verifica a validade da data
		if (findAppointmentInSameDate) {
			throw Error('This appointment is already booked');
		} // caso não seja valida ele executa a exceção que será tratada na rota
		const appointment = this.appointmentsRepository.create({
			provider,
			date: appointmentDate,
		}); // cria o appointment usando o repositório
		return appointment; // retorna o appointment para as rotas
	}
}
export default CreateAppointmentService;
