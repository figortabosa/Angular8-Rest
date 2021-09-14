import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  students: Observable<Usuario[]>;

  nome: String;

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.students = data;
    });
  }


  deleteUsuario(id: Number) {
    this.usuarioService.deleteUsuario(id).subscribe(data => {
      console.log("retorno do metodo delete" + data);

      this.usuarioService.getUsuarioList().subscribe(data => {
        this.students = data;
      });
    })
  }

  consultarUser() {
    this.usuarioService.consultarUser(this.nome).subscribe(data => {
      this.students = data;
    })
  }
}
