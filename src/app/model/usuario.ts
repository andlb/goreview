export class Usuario {
  public nome: string;
  public ddd: string;
  public telefone: string;
  public mensagem: string;
  constructor(dadosjs: any) {
    if (!dadosjs) {
      return;
    }
    this.nome = dadosjs.nome;
    if (!dadosjs.ddd) {
      this.ddd = '17';
    } else {
      this.ddd = dadosjs.ddd;
    }
    this.telefone = dadosjs.telefone;
    this.mensagem = dadosjs.mensagem;
  }
}
