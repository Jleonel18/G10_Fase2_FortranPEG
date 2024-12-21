import { BaseVisitor } from './visitor.js';
import { cerraduras, generarCaracteres, generarCaracteres_i, cerradurasI } from './utilidades.js';
import { Rango } from './nodos.js';


export class GeneradorVisitor extends BaseVisitor {

    constructor() { 
        super();
        this.code = '';
    }

    
    /**
     * @type {BaseVisitor['visitProducciones']}
     */
    visitProducciones(node) {
        
        node.opciones.accept(this);
    }

    /**
     * @type {BaseVisitor['visitOpciones']}
     */
    visitOpciones(node) {
        node.opciones.map(opcion => opcion.accept(this)).join('\n');
    }

    /**
     * @type {BaseVisitor['visitUnion']}
     */
    visitUnion(node) {
        node.expresiones.map(expresion => expresion.accept(this)).join(' | ');
    }

    /**
     * @type {BaseVisitor['visitExpression']}
     */
    visitExpression(node) {

        const expresion = node.exp

        switch(expresion.tipo) {
            case 'literal':
                if(node.post == undefined){
                    if(expresion.sense == undefined){
                        if(expresion.exp == " "){
                            this.code += `\n
                            if (cursor <= len_trim(input) .and. input(cursor:cursor) == " ") then
                                token = "whitespace | " // '"' // input(cursor:cursor) // '"'
                                cursor = cursor + 1
                            return  ! Exit the function after detecting space
                            end if
                            \n`
                        }else{
                            this.code += `\n 
                            if (cursor + ${expresion.exp.length-1} <= len(input)) then
                                if (input(cursor:cursor+${expresion.exp.length-1}) == "${expresion.exp}") then
                                    token = "cadena | ${expresion.exp}"
                                    has_token = .true.
                                    cursor = cursor + ${expresion.exp.length}
                                    return
                                end if
                            end if \n`
                        }
                    }else{
                        this.code += `\n ! Crear una cadena temporal para comparar
                        if (cursor + ${expresion.exp.length-1} <= len_trim(input)) then
                            temp_string = ToLower(input(cursor:cursor+${expresion.exp.length-1}))
                            original_string = input(cursor:cursor+${expresion.exp.length-1})
                            if (temp_string == "${expresion.exp}") then
                                token = "cadena | "//trim(original_string)  ! Mantener el formato original
                                has_token = .true.
                                cursor = cursor + ${expresion.exp.length}
                                return
                            end if
                        end if\n`
            
                    }
                }else{
                    if(expresion.sense == undefined && expresion.exp != " "){
                        this.code += cerraduras(node.post,expresion.exp)
                    }else if(expresion.exp == " "){
                        this.code += `\n
                        if (cursor <= len_trim(input) .and. input(cursor:cursor) == " ") then
                            start_cursor = cursor
                            repeat_count = 0
                            
                            ! Contar cuántos espacios consecutivos hay
                            do while (cursor <= len_trim(input) .and. input(cursor:cursor) == " ")
                                cursor = cursor + 1
                                repeat_count = repeat_count + 1
                            end do
                            
                            ! Construir el token con los espacios encontrados
                            token = "whitespace | " // '"' // repeat(" ", repeat_count) // '"'
                            return
                        end if
                        \n`
                    }else{
                        this.code += cerradurasI(node.post,expresion.exp)
                    }
                }

                break;
            case 'corchetes':

                if(expresion.sense == undefined){
                    this.code += `
                    i = cursor
                    ${generarCaracteres(expresion.exp.filter((node) => typeof node === 'string'))}
                    ${expresion.exp.filter((node) => node instanceof Rango)
                        .map((rango) => rango.accept(this))
                        .join('\n')}
                    `
                }else{
                    this.code += `
                    i = cursor
                    ${generarCaracteres_i(expresion.exp.filter((node) => typeof node === 'string'))}
                    ${expresion.exp.filter((node) => node instanceof Rango)
                        .map((rango) => rango.accept(this))
                        .join('\n')}
                    `
                }

                break;
                
            case 'punto':
                if(node.post == undefined){
                    this.code += `
                    token = input(cursor:cursor)
                    cursor = cursor + 1
                    has_token = .true.
                    return
                    `
                }else{
                    if(node.post != "?"){

                        this.code +=`
                        do while (cursor <= len(input))
                            token = token // input(cursor:cursor)
                            cursor = cursor + 1
                            has_token = .true.
                        end do
                        `

                    }else{
                        this.code += `
                        token = input(cursor:cursor)
                        cursor = cursor + 1
                        has_token = .true.
                        return
                        `
                    }
                }
                

                break
            
        }

        // node.exp.accept(this)

    }

    /**
     * @type {BaseVisitor['visitExpresiones']}
     */
    visitExpresiones(node) {
        node.exp.accept(this)
    }

    /**
     * @type {BaseVisitor['visitLiteral']}
     */
    visitLiteral(node) {

        if(node.sense == undefined){
            this.code += `\n if (cursor + ${node.valor.length-1} <= len(input)) then
                if (input(cursor:cursor+${node.valor.length-1}) == "${node.valor}") then
                    token = "cadena | ${node.valor}"
                    has_token = .true.
                    cursor = cursor + ${node.valor.length}
                    return
                end if
            end if \n`
        }else{
            this.code += `\n ! Crear una cadena temporal para comparar
            if (cursor + ${node.valor.length-1} <= len_trim(input)) then
                temp_string = ToLower(input(cursor:cursor+${node.valor.length-1}))
                original_string = input(cursor:cursor+${node.valor.length-1})
                if (temp_string == "${node.valor}") then
                    token = "cadena | "//trim(original_string)  ! Mantener el formato original
                    has_token = .true.
                    cursor = cursor + ${node.valor.length}
                    return
                end if
            end if\n`

        }
        
        
    }

    /**
     * @type {BaseVisitor['visitRango']}
     */
    visitRango(node) {
        return `
        if (input(i:i) >= "${node.inicio}" .and. input(i:i) <= "${node.fin}") then
            token = input(cursor:i)
            cursor = i + 1
            has_token = .true.
            return
        end if
        `
    }

}