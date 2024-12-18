module parser
    
    implicit none

    contains

    function nextsym(input, cursor) result(token)

        character(len=*), intent(in) :: input
        integer, intent(inout) :: cursor
        character(len=:), allocatable :: token
        integer :: start_cursor
    
        logical :: has_token
    
        token = ""
        has_token = .false.

        if(cursor > len_trim(input)) then
            token = "EOF"
            has_token = .true.
            return
        else
            ! Verificar si la subcadena es un espacio
            if (cursor <= len_trim(input) .and. input(cursor:cursor) == " ") then
                token = "whitespace | ESPACIO"
                cursor = cursor + 1
                return  ! Exit the function after detecting space
            end if
        
            ! Verificar si la subcadena es "hola"
            if (cursor + 3 <= len(input)) then
                if (input(cursor:cursor+3) == "hola") then
                    token = "cadena | hola"
                    has_token = .true.
                    cursor = cursor + 4
                    return
                end if
            end if
        
            ! Verificar si es un dígito [a-b] o [a-b]?
            !if (iachar(input(cursor:cursor)) >= iachar('0') .and. iachar(input(cursor:cursor)) <= iachar('9')) then
            !    token = "cadena[a-b](?) | "// input(cursor:cursor)
            !    has_token = .true.
            !    cursor = cursor + 1
            !    return
            !end if
    
    
            ! Verificar si es un rango [a-b]+ o [a-b]*
            if ((iachar(input(cursor:cursor)) >= iachar('0') .and. iachar(input(cursor:cursor)) <= iachar('9'))) then
                ! Capturar todo el rango de caracteres consecutivos
                start_cursor = cursor
                
                ! Continuar mientras los caracteres estén en el rango [a-b]
                do while (cursor <= len(input) .and. &
                        (iachar(input(cursor:cursor)) >= iachar('0') .and. &
                        iachar(input(cursor:cursor)) <= iachar('9')))
                    cursor = cursor + 1
                end do
                
                ! Extraer el token completo
                token = "numero[0-9](*+) | "// input(start_cursor:cursor-1)
                has_token = .true.
                return
            end if
    
                
            if (.not. has_token) then
                token = "Indefinido | ERROR LEXICO ->"//input(cursor:cursor)
                cursor = cursor + 1
                return
            end if

        end if
    
    end function nextsym

end module parser