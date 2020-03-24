# hello.s - Write hello world to terminal in asm
#
#
	.global	main
	.text
HELLO:
        .asciz "hello world\n"
main:
        pushq   %rbp
        movq    %rsp, %rbp
        subq    $16, %rsp
        movl    %edi, -4(%rbp)
        movq    %rsi, -16(%rbp)
        movl    $HELLO, %edi
        movl    $0, %eax
        call    printf
        movl    $0, %eax
        leave
        ret
