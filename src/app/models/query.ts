export class QueryScheme {

  constructor(
    public Curso: string,
    public Clase: string,
    public Loc: {lat : number, lng: number },
    public Radio: number
  ) {  }

}
