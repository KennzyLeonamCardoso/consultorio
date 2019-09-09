import { Moment } from 'moment';
import { IPagamento } from 'app/shared/model/pagamento.model';
import { IMedico } from 'app/shared/model/medico.model';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { IConsultorio } from 'app/shared/model/consultorio.model';

export const enum TipoProcedimento {
  LIMPEZA = 'LIMPEZA',
  OBTURACAO = 'OBTURACAO',
  EXTRACAO = 'EXTRACAO'
}

export interface IConsulta {
  id?: number;
  dataConsulta?: Moment;
  tipoProcedimento?: TipoProcedimento;
  pagamento?: IPagamento;
  medico?: IMedico;
  pessoas?: IPessoa[];
  consultorios?: IConsultorio[];
}

export class Consulta implements IConsulta {
  constructor(
    public id?: number,
    public dataConsulta?: Moment,
    public tipoProcedimento?: TipoProcedimento,
    public pagamento?: IPagamento,
    public medico?: IMedico,
    public pessoas?: IPessoa[],
    public consultorios?: IConsultorio[]
  ) {}
}
