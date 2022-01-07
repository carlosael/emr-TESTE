CREATE DATABASE registros;

create table if not exists funcionarios (
    id serial primary key,
    nome text not null,
  	sobrenome text not null,
    cargo text not null,
    data_de_nascimento text not null,
  	data_de_admissão text not null,
  	salario int not null
);

create table if not exists cargos (
    id serial primary key,
    descricao text not null,
    atividades text not null
);