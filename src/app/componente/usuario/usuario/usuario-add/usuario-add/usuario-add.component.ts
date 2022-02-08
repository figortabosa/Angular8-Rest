import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Profissao } from 'src/app/model/profissao';
import { Telefone } from 'src/app/model/telefone';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new Usuario();
  telefone = new Telefone();
  profissoes : Array<Profissao>;

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {

this.userService.getProfissaoList().subscribe(data => {
  this.profissoes = data;
  console.log(this.profissoes);
});

    let id = this.routeActive.snapshot.paramMap.get('id');

    if(id != null){
      this.userService.consultarUserPorId(id).subscribe(data =>{
        this.usuario = data;
      });
    }
  }

  salvarUser(){
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.userService.atualisarUsuario(this.usuario).subscribe(data =>{
        this.novo();
        console.info("Usuario atualizado: " + data);
      });
    }else {
      this.userService.salvarUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info("Salvou com sucesso: " + data);
      });
    }
  }

  deletarTelefone(id, i){
if(id === null) {
  this.usuario.telefones.splice(i,1);
  return;
}

    if(id !== null && confirm("Deseja remover?")) {
      this.userService.removerTelefone(id).subscribe(data => {

        this.usuario.telefones.splice(i,1);
      });
    }
  }

  addFone() {
    if(this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }
    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }
  novo() {
    this.usuario = new Usuario();
    this.telefone = new Telefone();
  }

}
