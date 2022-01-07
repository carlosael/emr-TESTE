const express = require('express');
const funcionarios = require('./controladores/funcionarios');
const cargos = require('./controladores/cargos');

const rotas = express();

rotas.get('/funcionarios', funcionarios.listarFuncionarios);
rotas.post('/funcionarios', funcionarios.cadastrarFuncionario);
rotas.patch('/funcionarios/:id', funcionarios.atualizarFuncionario);
rotas.delete('/funcionarios/:id', funcionarios.excluirFuncionario);

rotas.get('/cargos', cargos.listarCargos);
rotas.post('/cargos', cargos.cadastrarCargo);
rotas.patch('/cargos/:id', cargos.atualizarCargo);
rotas.delete('/cargos/:id', cargos.excluirCargo);

module.exports = rotas;
