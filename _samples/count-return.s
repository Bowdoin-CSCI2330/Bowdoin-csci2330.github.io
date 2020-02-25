# count-return.s - simple example of asm arithmetic functions
#
#
# 64-bit
# pass values in rdi, rsi, rdx, rcx, r8, r9
# stack must be 64-bit aligned
	.global	main
	.text
main:
	# Stack setup
        push    %rbp                    # save previous base pointer
        mov     %rsp, %rbp              # set my base pointer

        xor     %rax, %rax              # Zero

        inc     %rax                    # increment by 6
        inc     %rax
        inc     %rax
        inc     %rax
        inc     %rax
        inc     %rax

	# call printf
        push    %rax

        mov     $format, %rdi		# 1st parameter is string
        mov     %rax, %rsi              # 2nd parameter is argument
        xor     %rax, %rax              # var args, no SSE registeres used
        call    printf			# printf

        pop     %rax

	# return to sender
        leave				# unset stack/base
        ret				# beam me up scotty

format:
        .asciz "count is %ld\n"
