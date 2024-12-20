program main
    use tokenizer
    implicit none

    character(len=*), parameter :: input = "abc12e3;l'{}+'¿"
    character(len=:), allocatable :: lexeme
    integer :: cursor

    cursor = 1
    do while (lexeme /= "EOF" .and. lexeme /= "ERROR")
        lexeme = nextsym(input, cursor)
        print *, lexeme
    end do
end program main