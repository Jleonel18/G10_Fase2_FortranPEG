import { BaseVisitor } from './visitor.js';


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
        }
        
    }

}