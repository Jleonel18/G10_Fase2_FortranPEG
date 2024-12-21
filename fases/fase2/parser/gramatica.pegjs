{{
    // let identificadores = []

    // import { identificadores } from '../index.js'

    import { ids, usos} from '../index.js'
    import { ErrorReglas } from './error.js';
    import { errores } from '../index.js'
}}

{
    const nuevoNodo =(tipoNodo, props) => {
        const tipos = {
            'producciones': nodos.Producciones,
            'opciones': nodos.Opciones,
            'union': nodos.Union,
            'expresion': nodos.Expression,
            'literal': nodos.Literal,
            'expresiones': nodos.Expresiones,
            'rango': nodos.Rango
        }

        const nodo = new tipos[tipoNodo](props)
        nodo.location = location()
        return nodo
    }

}

gramatica = _ prod:producciones+ _ {

    let duplicados = ids.filter((item, index) => ids.indexOf(item) !== index);
    if (duplicados.length > 0) {
        errores.push(new ErrorReglas("Regla duplicada: " + duplicados[0]));
    }

    // Validar que todos los usos están en ids
    let noEncontrados = usos.filter(item => !ids.includes(item));
    if (noEncontrados.length > 0) {
        errores.push(new ErrorReglas("Regla no encontrada: " + noEncontrados[0]));
    }

    return { prod }
}

producciones = _ id:identificador _ alias:(literales)? _ "=" _ opciones:opciones (_";")? { ids.push(id); return nuevoNodo("producciones", { id, alias,opciones }) }

opciones = primero:union mas:(_ "/" _ @union)* { return nuevoNodo("opciones", { opciones:[primero, ...mas] }) }

union = primero:expresion mas:(_ @expresion !(_ literales? _ "=") )* { return nuevoNodo("union", { expresiones:[primero, ...mas] }) }

expresion  = prev:(etiqueta/varios)? _ exp:expresiones _ post:(@[?+*]/conteo)? { return nuevoNodo("expresion", { prev, exp, post } ) }

etiqueta = pluck:("@")? _ id:identificador _ ":" simb:(varios)? { return { pluck: pluck ? true : false, id, simb } }

varios = op:("!"/"$"/"@"/"&") { return op }

expresiones  =  id:identificador { usos.push(id) ; return { tipo:'identificador', id } }
                / exp:literales sense:"i"? { return { tipo:'literal', exp, sense } }
                / "(" _ opciones _ ")" {return {tipo:"grupo"}}
                / exp1:corchetes sense:"i"? { 
                    console.log(exp1)
                   const array= exp1.map (exp=>{
                        console.log(exp)
                        if(exp.inicio!=undefined ){
                            console.log("Entra a rango")
                            return nuevoNodo("rango", { inicio:exp.inicio, fin:exp.fin,sense })
                        }else{
                            return exp 
                        }
                    })
                    console.log(array)
                    return { tipo:'corchetes', exp:array, sense }
                    } 
                / "."
                / "!."

// conteo = "|" parteconteo _ (_ delimitador )? _ "|"

conteo = "|" _ (numero / id:identificador) _ "|"
        / "|" _ (numero / id:identificador)? _ ".." _ (numero / id2:identificador)? _ "|"
        / "|" _ (numero / id:identificador)? _ "," _ opciones _ "|"
        / "|" _ (numero / id:identificador)? _ ".." _ (numero / id2:identificador)? _ "," _ opciones _ "|"

// parteconteo = identificador
//             / [0-9]? _ ".." _ [0-9]?
// 			/ [0-9]

// delimitador =  "," _ expresion

// Regla principal que analiza corchetes con contenido
corchetes
    = "["  @contenido+ "]" 

contenido = inicio:$[^\[\]] "-" fin:$[^\[\]] {
            if (inicio.charCodeAt(0) > fin.charCodeAt(0)) {
                throw new Error(`Rango inválido: [${inicio}-${fin}]`);
            }

            return  { inicio, fin }
        }
        / $[^\[\]] 

// Regla para validar un rango como [A-Z]
// rango
//     = inicio:caracter "-" fin:caracter {
//         if (inicio.charCodeAt(0) > fin.charCodeAt(0)) {
//             throw new Error(`Rango inválido: [${inicio}-${fin}]`);

//         }
//         return {contenido:`${inicio}-${fin}`,rango:true};
//     }
//[0,2,4,a,-,z]
// Regla para caracteres individuales
// caracter
//     = [a-zA-Z0-9_ ] { return text()}

// Coincide con cualquier contenido que no incluya "]"
// contenido
//     = (corchete / texto)+

// corchete
//     = "[" contenido "]"   

// texto
//     = [^\[\]]+

literales = '"' value:stringDobleComilla* '"' { return value.join("") }
            / "'" value:stringSimpleComilla* "'" { return value.join("") }

stringDobleComilla = !('"' / "\\" / finLinea) . { return text() }
                    / "\\" esc:escape { return esc }
                    / continuacionLinea

stringSimpleComilla = !("'" / "\\" / finLinea) . { return text() }
                    / "\\" esc:escape { return esc }
                    / continuacionLinea

continuacionLinea = "\\" secuenciaFinLinea

finLinea = [\n\r\u2028\u2029]

escape = "'"
        / '"'
        / "\\"
        / "b"
        / "f"
        / "n"
        / "r"
        / "t"
        / "v"
        / "u"

secuenciaFinLinea = "\r\n" / "\n" / "\r" / "\u2028" / "\u2029"

// literales = 
//     "\"" [^"]* "\""
//     / "'" [^']* "'"
    

numero = [0-9]+

identificador = [_a-z]i[_a-z0-9]i* { return text() }


_ = (Comentarios /[ \t\n\r])*


Comentarios = 
    "//" [^\n]* 
    / "/*" (!"*/" .)* "*/"
