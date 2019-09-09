import { IFuncionario } from 'app/shared/model/funcionario.model';

export interface ITercerizado {
  id?: number;
  nome?: string;
  salario?: number;
  funcionarios?: IFuncionario[];
}

export class Tercerizado implements ITercerizado {
  constructor(public id?: number, public nome?: string, public salario?: number, public funcionarios?: IFuncionario[]) {}
}
