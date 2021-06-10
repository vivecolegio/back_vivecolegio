import { registerEnumType } from 'type-graphql';

export enum Gender {
  Female = 'Female',
  Male = 'Male',
}

registerEnumType(Gender, {
  name: 'Gender', // this one is mandatory
});

export enum DocumentType {
  CC = 'Cédula de Ciudadanía',
  CE = 'Cédula de Extranjería',
  PA = 'Pasaporte',
  RC = 'Registro Civil',
  TI = 'Tarjeta de Identidad',
}

registerEnumType(DocumentType, {
  name: 'DocumentType', // this one is mandatory
});
