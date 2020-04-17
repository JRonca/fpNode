import { uuid } from 'uuidv4';
// Essa será nossa entidade de agendamento
class Appointment {
	// definindo os atributos
	id: string;

	provider: string;

	date: Date;

	// iniciando eles com o constructor,
	// para permitir, que isso ocorra, assim que um novo agendamento for criado
	constructor({ provider, date }: Omit<Appointment, 'id'>) {
		// Omit: omite o id na passagem de parametros
		this.id = uuid();
		this.provider = provider;
		this.date = date;
	}
}
export default Appointment;
