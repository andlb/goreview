import { Usuario } from './../model/usuario';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class UsuarioService {
  private usuarioRef = this.db.list('usuario');
  private mensageRef = this.db.object('mensagem');
  constructor(
    private db: AngularFireDatabase
  ) {}

  addUsuario(usuario: Usuario) {
    return this.usuarioRef.push(usuario);
  }

  addMessage(mensagem ){
    return this.mensageRef.set({message: mensagem});
  }

}
