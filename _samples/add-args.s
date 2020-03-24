# add-args.s - add two numbers on the command line
#
#
# 64-bit
# pass values in rdi, rsi, rdx, rcx, r8, r9
# stack must be 64-bit aligned
#
# GDB: b main
# GDB: run 102 49
# GDB: lay asm
# GDB: lay reg
# GDB: ni
    .global main
    .text
main:
    # Stack and base setup
    push    %rbp                # save previous base pointer
    mov     %rsp, %rbp          # set our base pointer to start of stack frame

    # int main(int argc, char **argv)
    #     %rdi is number of arguments
    #     %rsi points at first argument

    # local variables
    # GDB: p *(int *)($rbp - 8)
    sub     $8, %rsp            # total -> -8(%rbp)

    # skip first argument - argv[0]
    # GDB: p *(char **)$rsi
    add     $8, %rsi

    # convert first argument argv[1] using atoi()
    push    %rsi                # save argument pointer
    mov     (%rsi), %rdi        # call atoi()
    call    atoi
    mov     %rax, -8(%rbp)      # save to total
    # GDB: p *(int *)($rbp - 8)
    pop     %rsi                # restore argument pointer

    # convert second argument argv[2] using atoi()
    add     $8, %rsi            # advance to next argument
    # GDB: p *(char **)$rsi

    push    %rsi                # save argument pointer
    mov     (%rsi), %rdi        # call atoi()
    call    atoi
    add     -8(%rbp), %rax      # add to running total
    mov     %rax, -8(%rbp)      # save to total
    # GDB: p *(int *)($rbp - 8)
    pop     %rsi                # restore argument pointer

    # print out result printf("%ld\n", total)
    mov     $format, %rdi       # 1st parameter is format string
    mov     -8(%rbp), %rsi      # 2nd parameter is total to print
    xor     %rax, %rax          # not using vector parameters
    call    printf              # printf

    # return to sender
    leave                       # unset stack/base
    ret                         # beam me up scotty

format:
    .asciz "%ld\n"
