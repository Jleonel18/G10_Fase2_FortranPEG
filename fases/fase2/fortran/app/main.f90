program main
    use parser
    implicit none

    character(len=100) :: input_string, token
    integer :: i = 0

    ! Definir un valor de prueba para input_string
    input_string = " hola 123456 hola adios"

    i=1
    ! Llamar a la función nextsym y almacenar el resultado en token
    do while(i<= (len_trim(input_string)))
        token = nextsym(input_string, i)
        print *, 'Token extraido: ', Token
    end do

end program main