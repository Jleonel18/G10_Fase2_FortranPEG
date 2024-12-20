
/**

 * @typedef {import('./nodos').Producciones} Producciones


 * @typedef {import('./nodos').Opciones} Opciones


 * @typedef {import('./nodos').Union} Union


 * @typedef {import('./nodos').Expression} Expression


 * @typedef {import('./nodos').Literal} Literal


 * @typedef {import('./nodos').Expresiones} Expresiones


 * @typedef {import('./nodos').Rango} Rango

 */


/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {Producciones} node
     * @returns {any}
     */
    visitProducciones(node) {
        throw new Error('Metodo visitProducciones no implementado');
    }
    

    /**
     * @param {Opciones} node
     * @returns {any}
     */
    visitOpciones(node) {
        throw new Error('Metodo visitOpciones no implementado');
    }
    

    /**
     * @param {Union} node
     * @returns {any}
     */
    visitUnion(node) {
        throw new Error('Metodo visitUnion no implementado');
    }
    

    /**
     * @param {Expression} node
     * @returns {any}
     */
    visitExpression(node) {
        throw new Error('Metodo visitExpression no implementado');
    }
    

    /**
     * @param {Literal} node
     * @returns {any}
     */
    visitLiteral(node) {
        throw new Error('Metodo visitLiteral no implementado');
    }
    

    /**
     * @param {Expresiones} node
     * @returns {any}
     */
    visitExpresiones(node) {
        throw new Error('Metodo visitExpresiones no implementado');
    }
    

    /**
     * @param {Rango} node
     * @returns {any}
     */
    visitRango(node) {
        throw new Error('Metodo visitRango no implementado');
    }
    
}
