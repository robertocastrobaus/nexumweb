import {Indicadores} from '../indicadores/indicadores'

export class Evaluacion{
    id : number;
    id_usuario : number;
    id_indicador : number;
    mes : number;
    anio : number;
    meta : number;
    real  : number;
    estado  : string;
    usuarioCrea  : string;
    fechaCrea :  string;
    usuarioMod : string;
    fechaMod : string;
    no_cia : string;
    peso : number;
    fechaCierre: string;
    cierre: string;
    cumplimiento: number;
    pesoReal : number;
    indicadorPe: Indicadores;
}