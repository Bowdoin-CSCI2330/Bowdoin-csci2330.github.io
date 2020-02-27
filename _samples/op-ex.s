# op-ex.s - operation execution code exercise
#

# Note: All operations should be 64-bit
# values in rdi, rsi, rdx, rcx, r8, r9
# stack must be 64-bit aligned
#
        .global main

        .data
x:      .quad   111     # feel free to set your own x and y
y:      .quad   222     #

format1: .asciz  "1. x + 10 = %ld\n"
format2: .asciz  "2. 46 - x = %ld\n"
format3: .asciz  "3. x + y = %ld\n"
format4: .asciz  "4. 2x + y = %ld\n"
format5: .asciz  "5. x - 3y = %ld\n"

        .text
main:
        # Stack and base setup
        push    %rbp                    # save previous base pointer
        mov     %rsp, %rbp              # set our base pointer to start of stack frame

        # 1. x + 10
        mov     x, %rdi                 # x starts in %rdi
        # TODO: your code here ...



        # print out result printf("x=%ld, y=%ld\n", total)
        mov     $format1, %rdi          # 1st parameter is format string
        mov     %rax, %rsi              # 2nd parameter is total to print
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # 2. 46 - x
        mov     x, %rdi                 # x starts in %rdi
        # TODO: your code here ...



        # print out result printf("x=%ld, y=%ld\n", total)
        mov     $format2, %rdi          # 1st parameter is format string
        mov     %rax, %rsi              # 2nd parameter is total to print
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # 3. x + y
        mov     x, %rdi                 # x starts in %rdi
        mov     y, %rsi                 # y starts in %rsi
        # TODO: your code here ...



        # print out result printf("x=%ld, y=%ld\n", total)
        mov     $format3, %rdi          # 1st parameter is format string
        mov     %rax, %rsi              # 2nd parameter is total to print
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # 4. 2x + y
        mov     x, %rdi                 # x starts in %rdi
        mov     y, %rsi                 # y starts in %rsi
        # TODO: your code here ...



        # print out result printf("x=%ld, y=%ld\n", total)
        mov     $format4, %rdi          # 1st parameter is format string
        mov     %rax, %rsi              # 2nd parameter is total to print
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # 5. y - 3x
        mov     x, %rdi                 # x starts in %rdi
        mov     y, %rsi                 # y starts in %rsi
        # TODO: your code here ...




        # print out result printf("x=%ld, y=%ld\n", total)
        mov     $format5, %rdi          # 1st parameter is format string
        mov     %rax, %rsi              # 2nd parameter is total to print
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # return to sender
        leave                           # unset stack/base
        ret                             # beam me up scotty
