export const cerraduras =(cerradura,expresion)=>{
    switch(cerradura){
        case '*':
            return `\n
            if (cursor + ${expresion.length-1} <= len(input)) then
                start_cursor = cursor
                repeat_count = 0
                
                ! Contar cuántas veces se repite "${expresion}"
                do while (cursor + ${expresion.length-1} <= len(input) .and. input(cursor:cursor+${expresion.length-1}) == "${expresion}")
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
                do while (cursor + ${expresion.length-1} <= len(input) .and. input(cursor:cursor+${expresion.length-1}) == "${expresion}")
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

export const cerradurasI =(cerradura,expresion)=>{
    switch(cerradura){
        case '*':
            return `\n
            if (cursor + ${expresion.length-1} <= len(input)) then
                start_cursor = cursor
                repeat_count = 0
                new_string = ""
                
                ! Contar cuántas veces se repite "${expresion}"
                do while (cursor + ${expresion.length-1} <= len(input) .and. ToLower(input(cursor:cursor+${expresion.length-1})) == ToLower("${expresion}"))
                    new_string = new_string // input(cursor:cursor+${expresion.length-1})
                    cursor = cursor + ${expresion.length}
                    repeat_count = repeat_count + 1
                end do
                
                ! Si se repite al menos una vez, es un token válido
                if (repeat_count > 1) then
                    token = "cadena+ | " // new_string
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
                new_string = ""
                
                ! Contar cuántas veces se repite "${expresion}"
                do while (cursor + ${expresion.length-1} <= len(input) .and. ToLower(input(cursor:cursor+${expresion.length-1})) == ToLower("${expresion}"))
                    new_string = new_string // input(cursor:cursor+${expresion.length-1})
                    cursor = cursor + ${expresion.length}
                    repeat_count = repeat_count + 1
                end do
                
                ! Si se repite al menos una vez, es un token válido
                if (repeat_count > 1) then
                    token = "cadena+ | " // new_string
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
                if (ToLower(input(cursor:cursor+${expresion.length-1})) == ToLower("${expresion}")) then
                    token = "cadena | ${expresion}"
                    has_token = .true.
                    cursor = cursor + ${expresion.length}
                    return
                end if
            end if \n`;
        default:
            
    }
}

export const generarCaracteres = (caracteres) => {
    if (caracteres.length === 0) return ''

    return `
    if (findloc([${caracteres
        .map((caracter) => `"${caracter}"`)
        .join(', ')}], input(i:i), 1) > 0) then
        token = input(cursor:i)
        cursor = i + 1
        has_token = .true.
        return
    end if
    `
}

export const generarCaracteres_i = (caracteres) => {
    if (caracteres.length === 0) return ''

    return `
    if (findloc([${caracteres
        .map((caracter) => `"${caracter.toLowerCase()}"`)
        .join(', ')}], ToLower(input(i:i)), 1) > 0) then
        token = input(cursor:i)
        cursor = i + 1
        has_token = .true.
        return
    end if
    `
}

export const generarCaracteresCerraduras_i = (caracteres) => {
    return `
    ! Avanzamos mientras encontremos caracteres válidos
            do while (i <= len_trim(input))
                if (findloc([${caracteres
                .map((caracter) => `"${caracter.toLowerCase()}"`)
                .join(', ')}], ToLower(input(i:i)), 1) > 0) then
                    i = i + 1
                else
                    exit
                end if
            end do
            
            ! Si encontramos al menos un carácter válido
            if (i > cursor) then
                token = input(cursor:i-1)
                cursor = i
                has_token = .true.
                return
            end if    
    `
}

export const generarCaracteresCerraduras = (caracteres) => {
    return `
    ! Avanzamos mientras encontremos caracteres válidos
            do while (i <= len_trim(input))
                if (findloc([${caracteres
                .map((caracter) => `"${caracter}"`)
                .join(', ')}], input(i:i), 1) > 0) then
                    i = i + 1
                else
                    exit
                end if
            end do
            
            ! Si encontramos al menos un carácter válido
            if (i > cursor) then
                token = input(cursor:i-1)
                cursor = i
                has_token = .true.
                return
            end if    
    `
}