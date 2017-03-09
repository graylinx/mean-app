export class ProfesorScheme {

  constructor(
    public Email: string,
    public Password: string,
    public Nombre: string,
    public Apellidos: string,
    public Edad: Date,
    public Loc: {lat : number, lng: number },
    public Curso: string,
    public Clase: string,
    public Path: string
  ) {  }

}
