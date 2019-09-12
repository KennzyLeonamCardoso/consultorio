import { IFuncionario } from 'app/shared/model/funcionario.model';
import { IConsulta } from 'app/shared/model/consulta.model';

export interface IMedico {
  id?: number;
  nome?: string;
  salario?: number;
  funcionario?: IFuncionario;
  consultas?: IConsulta[];
}

export class Medico implements IMedico {
  constructor(
    public id?: number,
    public nome?: string,
    public salario?: number,
    public funcionario?: IFuncionario,
    public consultas?: IConsulta[]
  ) {}
}
