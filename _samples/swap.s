# add-args.s - add two numbers on the command line
#
#
# 64-bit
# pass values in rdi, rsi, rdx, rcx, r8, r9
# stack must be 64-bit aligned
#
        .global main

        .data
x:      .quad   111
y:      .quad   222
format: .asciz  "x=%ld, y=%ld\n"

        .text
main:
        # Stack and base setup
        push    %rbp                    # save previous base pointer
        mov     %rsp, %rbp              # set our base pointer to start of stack frame

        # print out starting printf("x=%ld, y=%ld\n", total)
        mov     $format, %rdi           # 1st parameter is format string
        mov     x, %rsi                 # 2nd parameter is total to print
        mov     y, %rdx
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # --- --- --- 
        # get address of x and y
        mov     $x, %rdi                # %rdi = &x
        mov     $y, %rsi                # %rsi = &y

        # swap using pointers
        mov     (%rdi), %rax            # tmpX = x
        mov     (%rsi), %rdx            # tmpY = y        
        mov     %rdx, (%rdi)            # x = tmpY
        mov     %rax, (%rsi)            # y = tmpX
        # --- --- --- 

        # print out result printf("x=%ld, y=%ld\n", total)
        mov     $format, %rdi           # 1st parameter is format string
        mov     x, %rsi                 # 2nd parameter is total to print
        mov     y, %rdx
        xor     %rax, %rax              # not using vector parameters
        call    printf                  # printf

        # return to sender
        leave                           # unset stack/base
        ret                             # beam me up scotty
