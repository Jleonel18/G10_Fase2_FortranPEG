import { BaseVisitor } from './visitor.js';
import { cerraduras } from './utilidades.js';


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
                        this.code += `\n if (cursor + ${expresion.exp.length-1} <= len(input)) then
                            if (input(cursor:cursor+${expresion.exp.length-1}) == "${expresion.exp}") then
                                token = "cadena | ${expresion.exp}"
                                has_token = .true.
                                cursor = cursor + ${expresion.exp.length}
                                return
                            end if
                        end if \n`
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
                    if(expresion.sense == undefined){
                        this.code += cerraduras(node.post,expresion.exp)
                    }
                }

                break;
            case 'corchetes':
                //Cuando me viene un rango facil de la manera [x-x]
                if(node.exp.exp[0].rango != undefined){

                    this.code += `\n ! Crear una cadena temporal para comparar
                        if ((iachar(input(cursor:cursor)) >= iachar('${node.exp.exp[0].contenido.charAt(0)}') .and. iachar(input(cursor:cursor)) <= iachar('${node.exp.exp[0].contenido.charAt(2)}'))) then
                        !Capturar todo el rango de caracteres consecutivos
                        start_cursor = cursor
                            
                        !Continuar mientras los caracteres estén en el rango [a-b]
                            do while (cursor <= len(input) .and. &
                                    (iachar(input(cursor:cursor)) >= iachar('${node.exp.exp[0].contenido.charAt(0)}') .and. &
                                    iachar(input(cursor:cursor)) <= iachar('${node.exp.exp[0].contenido.charAt(2)}')))
                                cursor = cursor + 1
                            end do

                            ! Verificar si es un dígito [a-b] o [a-b]?
                            if (iachar(input(cursor:cursor)) >= iachar('${node.exp.exp[0].contenido.charAt(0)}') .and. iachar(input(cursor:cursor)) <= iachar('${node.exp.exp[0].contenido.charAt(2)}')) then
                                token = "cadena[a-b](?) | "// input(cursor:cursor)
                                has_token = .true.
                                cursor = cursor + 1
                                return
                            end if
                            
                            ! Extraer el token completo
                            token = "numero[0-9](*+) | "// input(start_cursor:cursor-1)
                            has_token = .true.
                            return
                        end if
                \n`
                    
                } 
                //Cuando me viene un rango combinado con caracters
                else{
           
                }
                break;
            
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

}