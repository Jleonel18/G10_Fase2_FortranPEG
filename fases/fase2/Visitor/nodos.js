
/**
 * @typedef {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
*/
    

/**
 * @typedef {import('./visitor').BaseVisitor} BaseVisitor
 */

export class Producciones  {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la producción
 * @param {Expresion|undefined} options.alias Alias del no terminal
 * @param {Expresion} options.opciones Arreglo de opciones
    */
    constructor({ id, alias, opciones }) {
        
        
        /**
         * Identificador de la producción
         * @type {string}
        */
        this.id = id;


        /**
         * Alias del no terminal
         * @type {Expresion|undefined}
        */
        this.alias = alias;


        /**
         * Arreglo de opciones
         * @type {Expresion}
        */
        this.opciones = opciones;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitProducciones(this);
    }
}
    
export class Opciones  {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.opciones Arreglo de opciones
    */
    constructor({ opciones }) {
        
        
        /**
         * Arreglo de opciones
         * @type {Expresion[]}
        */
        this.opciones = opciones;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOpciones(this);
    }
}
    
export class Union  {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.expresiones Arreglo de expresiones
    */
    constructor({ expresiones }) {
        
        
        /**
         * Arreglo de expresiones
         * @type {Expresion[]}
        */
        this.expresiones = expresiones;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitUnion(this);
    }
}
    
export class Expression  {

    /**
    * @param {Object} options
    * @param {string|object|undefined} options.prev Previo a la expresion
 * @param {Expresion} options.exp Expresion
 * @param {string|undefined} options.post Posterior a la expresion
    */
    constructor({ prev, exp, post }) {
        
        
        /**
         * Previo a la expresion
         * @type {string|object|undefined}
        */
        this.prev = prev;


        /**
         * Expresion
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Posterior a la expresion
         * @type {string|undefined}
        */
        this.post = post;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpression(this);
    }
}
    
export class Literal  {

    /**
    * @param {Object} options
    * @param {string} options.valor Valor del literal
    */
    constructor({ valor }) {
        
        
        /**
         * Valor del literal
         * @type {string}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLiteral(this);
    }
}
    
export default { Producciones, Opciones, Union, Expression, Literal }
