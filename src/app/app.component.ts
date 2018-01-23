'use strict';

import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Usuario } from './model/usuario';
import { UsuarioService } from './usuario/usuario.service';
import { WindowRef } from './service/windowref';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  processando = 1;
  usuario: Usuario;
  nativeWindow: any;
  items: Observable<any[]>;
  @ViewChild('nome') nome: ElementRef;

  constructor(
    public snackBar: MatSnackBar,
    private usarioService: UsuarioService,
    private winRef: WindowRef,
    private db: AngularFireDatabase
  ) {
    this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() {
    this.usuario = new Usuario({});
    this.db.object('mensagem').snapshotChanges().subscribe(action => {
      this.usuario.mensagem = action.payload.val().message;
      this.nome.nativeElement.focus();
      this.processando = 0;
    });
  }

  onLimpar() {
    let oUsuario = {};
    if (this.usuario.mensagem) {
      oUsuario = {mensagem: this.usuario.mensagem};
    }
    this.usuario = new Usuario(oUsuario);
    this.nome.nativeElement.focus();
  }

  onSalvar(f) {
    this.processando = 1;
    if (!f.valid) {
      this.processando = 0;
      this.nome.nativeElement.focus();
      this.snackBar.open(
        'Os campos em vermelhor precisam ser preenchido(s)',
        '',
        {
          duration: 3000,
          extraClasses: ['alert-snackbar']
        }
      );
    } else {
      const mensagem = this.usuario.mensagem.replace('%nome', this.usuario.nome);
      const telefone = '55' + this.usuario.ddd + this.usuario.telefone;

      this.usarioService.addUsuario(this.usuario).then(ref => {
        const newWindow = this.nativeWindow.open('https://api.whatsapp.com/send?phone=' + telefone + '&text=' + mensagem);
        this.onLimpar();
        this.processando = 0;
      });
      this.usarioService.addMessage(this.usuario.mensagem);
    }
  }
}
