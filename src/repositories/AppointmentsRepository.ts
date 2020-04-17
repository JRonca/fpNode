import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreatAppointmentDTO {
	provider: string;
	date: Date;
}
class AppointmentsRepository {
	// responsavel por criar, armazenar, ler, deletar, editar
	private appointments: Appointment[];

	constructor() {
		this.appointments = [];
	}

	public all(): Appointment[] {
		return this.appointments;
	}

	public findByDate(date: Date): Appointment | null {
		// procura essa date nos appointments
		const findAppointment = this.appointments.find(appointment =>
			isEqual(date, appointment.date),
		); // varre os agendamentos, verificando se há algum na mesma data
		return findAppointment || null;
	}

	public create({ provider, date }: CreatAppointmentDTO): Appointment {
		// método publico que retorna um Appointment
		const appointment = new Appointment({ provider, date });
		this.appointments.push(appointment);
		// cria o agendamento e joga ele dentro do vetor
		return appointment;
	}
}
export default AppointmentsRepository;
