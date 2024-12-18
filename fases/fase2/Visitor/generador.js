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
     * @type {BaseVisitor['visitLiteral']}
     */
    visitLiteral(node) {
        this.code += `if ( "${node.valor}" == input(cursor:cursor + ${node.valor.length - 1 } )) then
            allocate( character(len=${node.valor.length}) :: lexeme)
            lexeme = input(cursor:cursor + ${node.valor.length - 1 })
            cursor = cursor + ${node.valor.length}}
            return
        end if`
        
    }

}