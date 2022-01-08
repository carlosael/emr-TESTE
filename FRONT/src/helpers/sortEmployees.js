const sortEmployees = {
    byBirthAsc: (a,b) => {
        const firstDate =  a.data_de_nascimento.split('/').reverse().join('');
        const secondDate = b.data_de_nascimento.split('/').reverse().join('');
        return firstDate < secondDate ? 1 : firstDate > secondDate ? -1 : 0;
    },
    byBirthDsc: (a,b) => {
        const firstDate =  a.data_de_nascimento.split('/').reverse().join('');
        const secondDate = b.data_de_nascimento.split('/').reverse().join('');
        return firstDate > secondDate ? 1 : firstDate < secondDate ? -1 : 0;
    },
    byAdmissionAsc: (a,b) => {
        const firstDate =  a.data_de_admissao.split('/').reverse().join('');
        const secondDate = b.data_de_admissao.split('/').reverse().join('');
        return firstDate < secondDate ? 1 : firstDate > secondDate ? -1 : 0;
    },
    byAdmissionDsc: (a,b) => {
        const firstDate =  a.data_de_admissao.split('/').reverse().join('');
        const secondDate = b.data_de_admissao.split('/').reverse().join('');
        return firstDate > secondDate ? 1 : firstDate < secondDate ? -1 : 0;
    }
}

export default sortEmployees;