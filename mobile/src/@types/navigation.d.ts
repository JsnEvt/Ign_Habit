//neste objeto colocamos quais parametros queremos transferir entre as telas.
//nao e indicado passar muitas funcoes nem objetos complexos.

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      new: undefined;
      habit: {
        date: string
      }
    }
  }
}