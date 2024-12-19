program main
    use parser
    implicit none

    character(len=100) :: input_string, token
    integer :: i

    ! Definir un valor de prueba para input_string
    input_string = "hoLa 2 holA hoLgA HoLa Helo"
    i = 1

    ! Llamar a la función nextsym y almacenar el resultado en token
    print *, "Procesando la cadena: ", trim(input_string)
    do while (i <= len_trim(input_string))
        token = nextsym(input_string, i)
        print *, 'Token extraído: ', trim(token)
        if (token == "EOF") exit
    end do

end program main

