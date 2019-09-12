import { IConsulta } from 'app/shared/model/consulta.model';

export const enum TipoPagamento {
  AVISTA = 'AVISTA',
  PLANOSAUDE = 'PLANOSAUDE'
}

export interface IPagamento {
  id?: number;
  valor?: number;
  tipoPagameno?: TipoPagamento;
  consultas?: IConsulta[];
}

export class Pagamento implements IPagamento {
  constructor(public id?: number, public valor?: number, public tipoPagameno?: TipoPagamento, public consultas?: IConsulta[]) {}
}
