
    module tokenizer
    
        implicit none

        contains

        function nextsym(input, cursor) result(token)

            character(len=*), intent(in) :: input
            integer, intent(inout) :: cursor
            character(len=:), allocatable :: token
            integer :: start_cursor, repeat_count
            character(len=:), allocatable :: temp_string
            character(len=:), allocatable :: original_string
            integer :: i
        
            logical :: has_token
        
            token = ""
            has_token = .false.

            if(cursor > len_trim(input)) then
                token = "EOF"
                has_token = .true.
                return
            else

                
                    i = cursor
                    
    if (findloc(["b", ";", "-"], input(i:i), 1) > 0) then
        token = input(cursor:i)
        cursor = i + 1
        has_token = .true.
        return
    end if
    
                    
        if (input(i:i) >= "0" .and. input(i:i) <= "9") then
            token = input(cursor:i)
            cursor = i + 1
            has_token = .true.
            return
        end if
        
                    

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

    end module tokenizer