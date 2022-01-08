CREATE DATABASE registros;

CREATE TABLE IF NOT EXISTS funcionarios (
    id serial primary key,
    nome text not null,
  	sobrenome text not null,
    cargo text not null,
    data_de_nascimento text not null,
  	data_de_admissão text not null,
  	salario int not null
);

CREATE TABLE IF NOT EXISTS cargos (
    id serial primary key,
    descricao text not null,
    atividades text not null
);