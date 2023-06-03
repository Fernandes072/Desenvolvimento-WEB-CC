import { _, form_validate, trim_inputs } from './ifs_libs.js'

class ContactForm {

    constructor( form_id ) {
        this.form = _(form_id)
        this.create_events()
    }

    create_events() {
        trim_inputs( ['nome', 'email', 'telefone', 'msg'] )
        // ISSO FUNCIONA
        this.form.addEventListener( 'submit', (ev) => {
            if ( this.validar() )
                return true
            ev.preventDefault()  // interrompe o submit no caso de erro no form
            ev.stopPropagation()
            return false
        })
        // ISSO NÃO FUNCIONA
        // this.form.addEventListener( 'submit', this.on_submit ) // PQ isso não funciona????????? Vale 1,0 ponto
    }

    on_submit( ev ) {
        if ( this.validar() )
            return true
        ev.preventDefault()  // interrompe o submit no caso de erro no form
        ev.stopPropagation()
        return false
    }

    validar() {
        const form_data = new FormData( this.form ) // console.log( JSON.stringify(Object.fromEntries(form_data)) )
        let ok = true
        for (const vet of form_data.entries()) {
            let key = vet[0], value = vet[1],
                is_valid = form_validate[key](value)
            _(key + '_err').innerText = ( is_valid ? '' : form_validate.err_msg[key] )
            if ( is_valid )
                _(key).classList.remove('is-invalid')
            else
                _(key).classList.add('is-invalid')
            if ( !is_valid )
                ok = false
        }
        return ok    
    }

}

export default ContactForm
