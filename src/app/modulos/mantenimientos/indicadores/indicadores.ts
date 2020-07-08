import {Usuario} from '../usuarios/usuario'

export class Indicadores{
   id : number;
   codigo:string;
   nombre:string;
   estado:string;
   usuarioCrea:string;
   usuarioMod:string;
   fechaCrea:string;
   fechaMod:string;
   formula :string;
   medida :string;
   factor: number;
   tipo :string;
   idUsuario: number;
   nbrTipo: string;
   usuarioPe: Usuario;
   noCias: String;
   
}