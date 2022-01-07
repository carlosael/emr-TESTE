const knex = require('../conexao');

const listarFuncionarios = async (req,res) => {
    try {
        const funcionarios = await knex('funcionarios').join('cargos', 'funcionarios.cargo_id', 'cargos.id').select('funcionarios.*','cargos.cargo')

        return res.status(200).json(funcionarios)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const cadastrarFuncionario = async (req, res) => {
    const {
        nome,
        sobrenome,
        cargo_id,
        data_de_nascimento,
        data_de_admissao,
        salario
     } = req.body;

     if (!nome || !sobrenome || !cargo_id || !data_de_nascimento || !data_de_admissao || !salario) {
        return res.status(404).json("Todos os campos são obrigatórios");
     }

     try {
         const funcionario = await knex('funcionarios').insert({
            nome,
            sobrenome,
            cargo_id,
            data_de_nascimento,
            data_de_admissao,
            salario
         }).returning('*')

        if (!funcionario) {
            return res.status(400).json("O funcionário não foi cadastrado.");
        }

         return res.status(200).json("O funcionário foi cadastrado com sucesso!")
     } catch (error) {
        return res.status(400).json(error.message)
     }
}

const atualizarFuncionario = async (req, res) => {
    const { id } = req.params;

    const {
        nome,
        sobrenome,
        cargo_id,
        data_de_nascimento,
        data_de_admissao,
        salario
     } = req.body;

     if (!nome && !sobrenome && !cargo_id && !data_de_nascimento && !data_de_admissao && !salario) {
        return res.status(404).json("É obrigatório informar ao menos um campo para atualização");
     }

     try {
         const funcionarioAtualizado = await knex('funcionarios').where({id}).update({
            nome,
            sobrenome,
            cargo_id,
            data_de_nascimento,
            data_de_admissao,
            salario
         })
    
        if (!funcionarioAtualizado) {
            return res.status(400).json("O funcionário não foi atualizado.");
        }

        return res.status(200).json("O funcionário foi atualizado com sucesso.");
     } catch (error) {
        return res.status(400).json(error.message)
     }
}

const excluirFuncionario = async (req, res) => {
    const { id } = req.params;

    try {
        const funcionarioExiste = await knex('funcionarios').where({id})

        if (!funcionarioExiste) {
            return res.status(400).json("O funcionário não foi encontrado.");
        }

        const funcionarioExcluido = await knex('funcionarios').where({id}).del()

        if (!funcionarioExcluido) {
            return res.status(400).json("O funcionário não foi excluído.");
        }

        return res.status(200).json("O funcionário foi excluído com sucesso.")
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    listarFuncionarios,
    cadastrarFuncionario,
    atualizarFuncionario,
    excluirFuncionario
}