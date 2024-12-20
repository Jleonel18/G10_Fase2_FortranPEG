import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/+esm';
import { parse } from './parser/gramatica.js';
import { ErrorReglas } from './parser/error.js';
import { GeneradorVisitor } from './Visitor/generador.js';


export let ids = []
export let usos = []
export let errores = []

const btnDescargar = document.getElementById('descargar');

// Crear el editor principal
const editor = monaco.editor.create(
    document.getElementById('editor'), {
        value: '',
        language: 'java',
        theme: 'tema',
        automaticLayout: true
    }
);

// Crear el editor para la salida
const salida = monaco.editor.create(
    document.getElementById('salida'), {
        value: '',
        language: 'java',
        readOnly: true,
        automaticLayout: true
    }
);

let decorations = [];
let codigoFuente = ``;

// Descargar archivo
btnDescargar.addEventListener('click', () => {
    const contenido = codigoFuente
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tokenizer.f90';
    a.click();
});

// Analizar contenido del editor
const analizar = () => {
    const entrada = editor.getValue();
    ids.length = 0
    usos.length = 0
    errores.length = 0
    try {
        const cst = parse(entrada)

        const generador = new GeneradorVisitor()

        cst.prod.forEach(sent => sent.accept(generador))


        if(errores.length > 0){
            salida.setValue(
                `Error: ${errores[0].message}`
            );
            return
        }else{
            salida.setValue("Análisis Exitoso");
            console.log(generarFortran(generador.code))
        }

        // salida.setValue("Análisis Exitoso");
        // Limpiar decoraciones previas si la validación es exitosa
        decorations = editor.deltaDecorations(decorations, []);
    } catch (e) {
        console.log(e)
        if(e.location === undefined){
            
            salida.setValue(
                `Error: ${e.message}`
            );

        }else {

        

            // Mostrar mensaje de error en el editor de salida
            salida.setValue(
                `Error: ${e.message}\nEn línea ${e.location.start.line} columna ${e.location.start.column}`
            );

            // Resaltar el error en el editor de entrada
            decorations = editor.deltaDecorations(decorations, [
                {
                    range: new monaco.Range(
                        e.location.start.line, 
                        e.location.start.column, 
                        e.location.start.line, 
                        e.location.start.column + 1
                    ),
                    options: {
                        inlineClassName: 'errorHighlight', // Clase CSS personalizada para cambiar color de letra
                    }
                },
                {
                    range: new monaco.Range(
                        e.location.start.line, 
                        e.location.start.column, 
                        e.location.start.line, 
                        e.location.start.column
                    ),
                    options: {
                        glyphMarginClassName: 'warningGlyph', // Clase CSS para mostrar un warning en el margen
                    }
                }
            ]);
        }
        
    }
};

// Escuchar cambios en el contenido del editor
editor.onDidChangeModelContent(() => {
    analizar();
});

// CSS personalizado para resaltar el error y agregar un warning
const style = document.createElement('style');
style.innerHTML = `
    .errorHighlight {
        color: red !important;
        font-weight: bold;
    }
    .warningGlyph {
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="orange" d="M8 1l7 14H1L8 1z"/></svg>') no-repeat center center;
        background-size: contain;
    }
`;
document.head.appendChild(style);

const generarFortran=(code)=>{
    codigoFuente = `
    module tokenizer
    
        implicit none

        contains

        function nextsym(input, cursor) result(token)

            character(len=*), intent(in) :: input
            integer, intent(inout) :: cursor
            character(len=:), allocatable :: token
            integer :: start_cursor, repeat_count
            character(len=:), allocatable :: temp_string
            character(len=:), allocatable :: original_string, new_string
            integer :: i
        
            logical :: has_token
        
            token = ""
            has_token = .false.

            if(cursor > len_trim(input)) then
                token = "EOF"
                has_token = .true.
                return
            else

                ${code}

                if (.not. has_token) then
                print *, "ERROR LEXICO -> ", '"'// input(cursor:cursor) // '"'
                token = "ERROR"
                cursor = cursor + 1
                return
            end if

            end if
    
        end function nextsym

        function ToLower(str) result(lowerStr)
                character(len=*), intent(in) :: str
                character(len=len(str)) :: lowerStr
                integer :: i

                ! Inicializar la cadena de salida
                lowerStr = str

                ! Convertir a minúsculas
                do i = 1, len_trim(str)
                    if (ichar(str(i:i)) >= ichar('A') .AND. ichar(str(i:i)) <= ichar('Z')) then
                        lowerStr(i:i) = char(ichar(str(i:i)) + 32)
                    end if
                end do
        end function ToLower

    end module tokenizer`

    return codigoFuente
}