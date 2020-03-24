# hello-puts.s - Write hello world to terminal in asm using puts()
#
	.global	main
	.text
.HELLO:
        .asciz "hello world"
main:
        movl    $.HELLO, %edi
        call    puts
        ret
