import { IMedico } from 'app/shared/model/medico.model';
import { ITercerizado } from 'app/shared/model/tercerizado.model';
import { IConsultorio } from 'app/shared/model/consultorio.model';

export interface IFuncionario {
  id?: number;
  numeroRegistro?: number;
  medicos?: IMedico[];
  tercerizado?: ITercerizado;
  consultorios?: IConsultorio[];
}

export class Funcionario implements IFuncionario {
  constructor(
    public id?: number,
    public numeroRegistro?: number,
    public medicos?: IMedico[],
    public tercerizado?: ITercerizado,
    public consultorios?: IConsultorio[]
  ) {}
}
