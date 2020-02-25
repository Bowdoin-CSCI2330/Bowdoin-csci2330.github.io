# op-ex.s 
#

# 64-bit
# pass values in rdi, rsi, rdx, rcx, r8, r9
# stack must be 64-bit aligned
#
        .global main

        .data
x:      .quad   111
y:      .quad   222
format1: .asciz  "111 + 10 = %ld\n"
format2: .asciz  "46 - 111 = %ld\n"
format3: .asciz  "111 + 222 = %ld\n"
format4: .asciz  "2x111 + 222 = %ld\n"
format5: .asciz  "222 - 3*111 = %ld\n"

        .text
main:
        # Stack and base setup
        push    %rbp                    # save previous base pointer
        mov     %rsp, %rbp              # set our base pointer to start of stack frame

        # x + 10
        mov     x, %rdi
        mov     $10, %rax
        add     %rdi, %rax

        # print out result printf("x=%ld, y=%ld\n", total)
        mov     $format1, %rdi          # 1st parameter is format string
        mov     %rax, %rsi              # 2nd parameter is total to print
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # 46 - x
        mov     x, %rdi
        mov     $46, %rax
        sub     %rdi, %rax

        # print out result printf("x=%ld, y=%ld\n", total)
        mov     $format2, %rdi          # 1st parameter is format string
        mov     %rax, %rsi              # 2nd parameter is total to print
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # x + y
        mov     x, %rdi
        mov     y, %rsi
        add     %rdi, %rsi
        mov     %rsi, %rax

        # print out result printf("x=%ld, y=%ld\n", total)
        mov     $format3, %rdi          # 1st parameter is format string
        mov     %rax, %rsi              # 2nd parameter is total to print
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # 2x + y
        mov     x, %rdi
        mov     y, %rsi
        shl     $1, %rdi
        add     %rdi, %rsi
        mov     %rsi, %rax

        # print out result printf("x=%ld, y=%ld\n", total)
        mov     $format4, %rdi          # 1st parameter is format string
        mov     %rax, %rsi              # 2nd parameter is total to print
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # y - 3x
        mov     x, %rdi
        mov     y, %rsi

        imul    $3, %rdi
        sub     %rdi, %rsi
        mov     %rsi, %rax

        # print out result printf("x=%ld, y=%ld\n", total)
        mov     $format5, %rdi          # 1st parameter is format string
        mov     %rax, %rsi              # 2nd parameter is total to print
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # return to sender
        leave                           # unset stack/base
        ret                             # beam me up scotty
