import { BaseVisitor } from './visitor.js';


export class GeneradorVisitor extends BaseVisitor {

    constructor() { 
        super();
        this.code = '';
        this.funciones = ''
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

        node.exp.accept(this)

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
            this.code += `\n if (cursor + ${node.valor.length-1} <= len(input)) then
                if (ToLower(input(cursor:cursor+${node.valor.length-1})) == ToLower("${node.valor}")) then
                    token = "cadena | ${node.valor}"
                    has_token = .true.
                    cursor = cursor + ${node.valor.length}
                    return
                end if
            end if \n`

            this.funciones += `\n
            function ToLower(str) result(lowerStr)
                character(len=*), intent(in) :: str
                character(len=len(str)) :: lowerStr
                integer :: i

                ! Inicializar la cadena de salida
                lowerStr = str

                ! Convertir a minúsculas
                do i = 1, len_trim(str)
                    if (ichar(str(i:i)) >= ichar('A') .AND. ichar(str(i:i)) <= ichar('Z')) THEN
                        lowerStr(i:i) = char(ichar(str(i:i)) + 32)
                    end if
                end do
            end function ToLower\n
            `
        }
        
        
    }

}