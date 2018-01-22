'use strict';

import { Component,  OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Usuario } from './model/usuario';
import { UsuarioService } from './usuario/usuario.service';
import { WindowRef } from './service/windowref';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usuario;
  nativeWindow: any;
  constructor(
    public snackBar: MatSnackBar,
    private usarioService: UsuarioService,
    private winRef: WindowRef
  ) {
    this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() {
    this.usuario = new Usuario({});
  }

  onSalvar(f) {
    console.log(this.usuario);
    if (!f.valid) {
      this.snackBar.open(
        'Os campos em vermelhor precisam ser preenchido(s)',
        '',
        {
          duration: 3000,
          extraClasses: ['alert-snackbar']
        }
      );
    } else {
      const mensagem = this.usuario.mensagem;
      const telefone = '55' + this.usuario.ddd + this.usuario.telefone;
      const newWindow = this.nativeWindow.open('https://api.whatsapp.com/send?phone=' + telefone + '&text=' + mensagem);
    }
  }


}
