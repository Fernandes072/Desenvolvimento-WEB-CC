const _ = (id) => document.getElementById(id)

const form_validate = {
    err_msg: {
        'nome'    : 'Nome inválido!',
        'email'   : 'Email inválido!',
        'telefone': 'Telefone inválido!',
        'msg'     : 'Mensagem inválida!',
        'matricula': 'Matrícula inválida!',
        'cpf': 'CPF inválido!',
        'curso': 'Curso inválido!',
        'turma': 'Turma inválido!',
    },
    /** Função para validar nomes. */
    nome: function(s)  {
        let s_fmt = this.string_all_trim(s) // string formatada, tratada
        if ( !s_fmt ) // check string vazia (ou null)
            return false
        if ( s_fmt.split(' ').length < 2 ) // check para nome e sobrenome
            return false
        return true
    },
    email: function(s) {
        let regex_email = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
            s_fmt = this.string_all_trim(s)
        if ( !regex_email.test(s_fmt) )
            return false
        return true
    },
    telefone: function(s) {
        let regex_telf = /^\d{2}\d{4,5}\d{4}$/,
            s_fmt = this.string_all_trim(s)
        if ( !regex_telf.test(s_fmt) )
            return false
        return true
    },
    matricula: function(s) {
        let s_fmt = this.string_all_trim(s)
        if ( s_fmt.length < 10 )
            return false
        return true
    },
    cpf: function(s) {
        let regex_cpf = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/,
            s_fmt = this.string_all_trim(s)
        if ( !regex_cpf.test(s_fmt) )
            return false
        return true
    },
    curso: function(s) {
        if ( s.value == '' )
            return false
        return true
    },
    turma: function(s) {
        if ( s.value == '' )
            return false
        return true
    },
    msg: function(s) {
        let s_fmt = this.string_all_trim(s)
        if ( !s_fmt || s_fmt.length < 80 )
            return false
        return true
    },
    string_all_trim: function(s) {
        if ( !s ) // é o mesmo que ( (s === null) || (s === '') )
            return s
        // s.replace(/\s+/,' '), substitui espaçamentos duplos ou mais por simples ' '
        // s = s.replace(/^\s+|\s+$/,''), remove os espaçamentos antes ou depois da string
        return s.replace(/\s+/g,' ').replace(/^\s+|\s+$/g,'')
    }
}

const trim_inputs = ( inputs_lst ) => {
    const fn_trim_input = (ev) => { ev.target.value = form_validate.string_all_trim(ev.target.value) }
    for (const id of inputs_lst)
        _(id).addEventListener( 'change', fn_trim_input )
}

export { _, form_validate, trim_inputs }
