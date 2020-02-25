# hello.s - Write hello world to terminal
#
#
	.global	main
	.text
.HELLO:
        .asciz "hello world"
main:
        movl    $.HELLO, %edi
        call    puts
        ret
