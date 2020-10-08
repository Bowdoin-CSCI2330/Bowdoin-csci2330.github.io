

	.global main
	.text




mystery:
        testl   %esi, %esi
        jle     .L4
        movq    %rdi, %rax
        leal    -1(%rsi), %edx
        leaq    4(%rdi,%rdx,4), %rcx
        movl    $0, %edx
.L3:
        addl    (%rax), %edx
        addq    $4, %rax
        cmpq    %rcx, %rax
        jne     .L3
.L1:
        movl    %edx, %eax
        ret
.L4:
        movl    $0, %edx
        jmp     .L1
.LC0:
        .string "%d\n"
main:
        subq    $40, %rsp
        movl    $1, (%rsp)
        movl    $1, 4(%rsp)
        movl    $2, 8(%rsp)
        movl    $3, 12(%rsp)
        movl    $5, 16(%rsp)
        movl    $8, 20(%rsp)
        movl    $13, 24(%rsp)
        movl    $7, %esi
        movq    %rsp, %rdi
        call    mystery
        movl    %eax, %esi
        movl    $.LC0, %edi
        movl    $0, %eax
        call    printf
        movl    $0, %eax
        addq    $40, %rsp
        ret
