module Practicas
  implicit none
  private

  public :: say_hello
contains
  subroutine say_hello
    print *, "Hello, Practicas!"
  end subroutine say_hello
end module Practicas
