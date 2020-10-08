	.global main
	.text

main:
	mov	$0x2F, %rdi	# setup
	mov	$0x25, %rsi

	cmp	%rsi, %rdi	# compare %rsi and %rdi, set flags
	setg	%al		# set AL if greater than
	movzbl	%al, %eax	# clear rest of %rax

				# %rax now contains 1 (true) or 0 (false)

	cmp	%rdi, %rsi	# compare %rsi and %rdi, set flags
	setg	%al		# set AL if greater than
	movzbl	%al, %eax	# clear rest of %rax

				# %rax now contains 1 (true) or 0 (false)

	xor	%rdx, %rdx	# extra to keep debugger active
	xor	%rdx, %rdx	# extra to keep debugger active
	xor	%rdx, %rdx	# extra to keep debugger active
