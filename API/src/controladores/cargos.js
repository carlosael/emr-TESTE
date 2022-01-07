const knex = require('../conexao');

const listarCargos = async (req,res) => {
    try {
        const cargos = await knex('cargos')
        return res.status(200).json(cargos)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const cadastrarCargo = async (req, res) => {
    const {
        cargo,
        descricao,
        atividades
     } = req.body;

     if (!descricao || !atividades || !cargo) {
        return res.status(404).json("Todos os campos são obrigatórios");
     }

     try {
         const novoCargo = await knex('cargos').insert({
            cargo,
            descricao,
            atividades
         }).returning('*')

        if (!novoCargo) {
            return res.status(400).json("O cargo não foi cadastrado.");
        }

         return res.status(200).json("O cargo foi cadastrado com sucesso!")
     } catch (error) {
        return res.status(400).json(error.message)
     }
}

const atualizarCargo = async (req, res) => {
    const { id } = req.params;

    const {
        cargo,
        descricao,
        atividades
     } = req.body;

     if (!descricao && !atividades && !cargo) {
        return res.status(404).json("É obrigatório informar ao menos um campo para atualização");
     }

     try {
         const cargoAtualizado = await knex('cargos').where({id}).update({
            cargo,
            descricao,
            atividades
         })
    
        if (!cargoAtualizado) {
            return res.status(400).json("O cargo não foi atualizado.");
        }

        return res.status(200).json("O cargo foi atualizado com sucesso.");
     } catch (error) {
        return res.status(400).json(error.message)
     }
}

const excluirCargo = async (req, res) => {
    const { id } = req.params;

    try {
        const funcionarioExiste = await knex('cargos').where({id})

        if (!funcionarioExiste) {
            return res.status(400).json("O cargo não foi encontrado.");
        }

        const funcionarioExcluido = await knex('cargos').where({id}).del()

        if (!funcionarioExcluido) {
            return res.status(400).json("O cargo não foi excluído.");
        }

        return res.status(200).json("O cargos foi excluído com sucesso.")
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    listarCargos,
    cadastrarCargo,
    atualizarCargo,
    excluirCargo
}

