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

            
if (cursor + 3 <= len(input)) then
            if (ToLower(input(cursor:cursor+3)) == ToLower("hola")) then
                token = "cadena | hola"
                has_token = .true.
                cursor = cursor + 4
                return
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
                if (ichar(str(i:i)) >= ichar('A') .AND. ichar(str(i:i)) <= ichar('Z')) THEN
                    lowerStr(i:i) = char(ichar(str(i:i)) + 32)
                end if
            end do
        end function ToLower

        

end module parser