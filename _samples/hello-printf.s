# hello-printf.s - Write hello world to terminal in asm using printf()
#
#
# 64-bit
# pass values in rdi, rsi, rdx, rcx, r8, r9
# stack must be 64-bit aligned
	.global	main
	.text
.HELLO:
        .asciz "hello world\n"
main:
	# setup stack and base pointers
        pushq   %rbp
        movq    %rsp, %rbp

	# call printf
        movl    $.HELLO, %edi		# 1st parameter is string
        movl    $0, %eax		# movl will zero-extend
        #xor     %eax, %eax		# printf is varargs
        call    printf			# printf

	# return to sender
        movl    $0, %eax		# return in %eax
        leave				# unset stack/base
        ret				# beam me up scotty
