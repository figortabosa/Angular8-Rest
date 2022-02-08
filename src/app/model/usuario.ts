import { Data } from "@angular/router";
import { Profissao } from "./profissao";
import { Telefone } from "./telefone";

export class Usuario {

	id: Number;
	login: String;
	nome: String;
	cpf: String;
  nascimento: string;

  profissao : Profissao = new Profissao();
  salario : DoubleRange;

  telefones: Array<Telefone>;
}

