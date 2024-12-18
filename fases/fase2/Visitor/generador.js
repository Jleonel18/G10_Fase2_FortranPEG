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
        node.opciones.forEach(opcion => opcion.accept(this));
    }

}