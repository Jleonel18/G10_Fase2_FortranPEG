
module parser
    
    implicit none

    contains

    function nextsym(input, cursor) result(token)

        character(len=*), intent(in) :: input
        integer, intent(inout) :: cursor
        character(len=:), allocatable :: token
        integer :: start_cursor, repeat_count
        character(len=:), allocatable :: temp_string
        character(len=:), allocatable :: original_string
    
        logical :: has_token
    
        token = ""
        has_token = .false.

        if(cursor > len_trim(input)) then
            token = "EOF"
            has_token = .true.
            return
        else

            

        if (cursor + 3 <= len(input)) then
            start_cursor = cursor
            repeat_count = 0
            
            ! Contar cuántas veces se repite "hola"
            do while (cursor + 3 <= len(input) .and. input(cursor:cursor+3) == "hola")
                cursor = cursor + 4
                repeat_count = repeat_count + 1
            end do
            
            ! Si se repite al menos una vez, es un token válido
            if (repeat_count > 1) then
                token = "cadena+ | " // repeat("hola", repeat_count)
                has_token = .true.
                return
            else
                ! Restaurar el cursor si no se encontró repetición
                cursor = start_cursor
            end if
        end if 


            if (.not. has_token) then
            token = "Indefinido | ERROR LEXICO ->"//input(cursor:cursor)
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

end module parser