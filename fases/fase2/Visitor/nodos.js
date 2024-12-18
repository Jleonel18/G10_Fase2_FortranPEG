
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
    
export default { Producciones }
