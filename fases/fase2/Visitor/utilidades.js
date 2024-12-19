export const cerraduras =(cerradura,expresion)=>{
    let codigo = ``
    switch(cerradura){
        case '*':
            return `\n
            if (cursor + ${expresion.length-1} <= len(input)) then
                start_cursor = cursor
                repeat_count = 0
                
                ! Contar cuántas veces se repite "${expresion}"
                do while (cursor + 3 <= len(input) .and. input(cursor:cursor+${expresion.length-1}) == "${expresion}")
                    cursor = cursor + ${expresion.length}
                    repeat_count = repeat_count + 1
                end do
                
                ! Si se repite al menos una vez, es un token válido
                if (repeat_count > 1) then
                    token = "cadena+ | " // repeat("${expresion}", repeat_count)
                    has_token = .true.
                    return
                else
                    ! Restaurar el cursor si no se encontró repetición
                    cursor = start_cursor
                end if
            end if \n`;
        case '+':
            return `\n
            if (cursor + ${expresion.length-1} <= len(input)) then
                start_cursor = cursor
                repeat_count = 0
                
                ! Contar cuántas veces se repite "${expresion}"
                do while (cursor + 3 <= len(input) .and. input(cursor:cursor+${expresion.length-1}) == "${expresion}")
                    cursor = cursor + ${expresion.length}
                    repeat_count = repeat_count + 1
                end do
                
                ! Si se repite al menos una vez, es un token válido
                if (repeat_count > 1) then
                    token = "cadena+ | " // repeat("${expresion}", repeat_count)
                    has_token = .true.
                    return
                else
                    ! Restaurar el cursor si no se encontró repetición
                    cursor = start_cursor
                end if
            end if \n`;
        case '?':
            return `\n
            !Verificar si la subcadena es "${expresion}"
            if (cursor + ${expresion.length-1} <= len(input)) then
                if (input(cursor:cursor+${expresion.length-1}) == "${expresion}") then
                    token = "cadena | ${expresion}"
                    has_token = .true.
                    cursor = cursor + ${expresion.length}
                    return
                end if
            end if \n`;
        default:
            
    }
}

