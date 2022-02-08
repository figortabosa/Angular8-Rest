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

  students: Array<Usuario[]>;
  nome: String;
  total: number;

  constructor(private usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }


  deleteUsuario(id: Number,index) {

    if(confirm('Deseja realmente excluir o usuario?')){

    this.usuarioService.deleteUsuario(id).subscribe(data => {
     // console.log("retorno do metodo delete" + data);

     this.students.splice(index, 1);
      //this.usuarioService.getUsuarioList().subscribe(data => {
       // this.students = data;
     // });
    })
  }
  }

  consultarUser() {
    this.usuarioService.consultarUser(this.nome).subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    })
  }

  carregarPagina(pagina) {
    this.usuarioService.getUsuarioListPage(pagina-1).subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
    });
  }

  imprimeRelatorio() {
    return this.usuarioService.downloadPdfRelatorio();
  }
}
