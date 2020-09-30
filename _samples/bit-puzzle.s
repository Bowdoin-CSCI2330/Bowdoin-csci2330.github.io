# bit-puzzle.s - bit puzzle code exercise
#

# Note: All operations should be 64-bit
# values in rdi, rsi, rdx, rcx, r8, r9
# stack must be 64-bit aligned
#
        .global main

        .data
x:      .quad   0x00AA00AA     # feel free to set your own x and y
y:      .quad   0xAA00AA00     #
z:      .quad	0xDEEFBEAD	# for byteSwap

format1:    .asciz  "x=%8.8x, y=%8.8x, bitOr=%8.8x\n"
format2:    .asciz  "%8.8x\n"

    .text

bitOr:	# bitOr(x, y)
    push	%rsi		# save original y on stack
    mov	    %rdi, %rax	# x->%rax do our work in %rax
    not	    %rax		# ~x
    not	    %rsi		# ~y
    and	    %rsi, %rax	# ~x & ~y
    not	    %rax		# ~(~x & ~y)
    pop	    %rsi		# restore saved y
    ret			# return, result in %rax

# int byteSwap(int x, int n, int m) {



byteSwap:	# byteSwap(x, n, m)	%rdi, %rsi, %rdx
    #    int n8 = n << 3;
    #    int n_mask = 0xff << n8;
    #    int n_byte = (( x & n_mask ) >> n8) & 0xff;
    mov     %rsi, %rcx      # n8 = n << 3
    shl	    $3, %rcx		# NOTE: shl only works with immediate or %cl 
    mov     %rcx, %rsi      
    mov	    $0xFF, %r9	    # n_mask = 0xff << n8;
    shl	    %cl, %r9	    
    mov     %rdi, %r10	    # n_byte = (( x & n_mask ) >> n8) & 0xff;
    and	    %r9, %r10	
    shr	    %cl, %r10	    
    # n8 in %rsi
    # n_mask in %r9
    # n_byte in %r10

    #    int m8 = m << 3;
    #    int m_mask = 0xff << m8;
    #    int m_byte = (( x & m_mask ) >> m8) & 0xff;
    mov     %rdx, %rcx      # m8 = m << 3
    shl	    $3, %rcx		
    mov     %rcx, %rdx      # m8
    mov	    $0xFF, %r11	    # m_mask = 0xff << m8;
    shl	    %cl, %r11	 
    mov     %rdi, %r12	    # m_byte = (( x & m_mask ) >> m8) & 0xff;
    and	    %r11, %r12	
    shr	    %cl, %r12	
    # m8 in %rdx
    # m_mask in %r11
    # m_byte in %r12

    #    int bytes_mask = n_mask | m_mask;
    #    int left_over = x & ~bytes_mask;
    mov     %r9, %rax	    # bytes_mask = n_mask | m_mask;
    or	    %r11, %rax
    not     %rax    	    # left_over = x & ~bytes_mask;
    and     %rdi, %rax
    # unaffected chars in %rax

    #    return left_over | (n_byte << m8) | (m_byte << n8);	
    mov     %rdx, %rcx       #  | (n_byte << m8)
    shl     %cl, %r10
    or      %r10, %rax
    # n_byte shifted and ORd into right place in %rax

    mov     %rsi, %rcx      #  | (m_byte << n8)
    shl     %cl, %r12
    or      %r12, %rax
    # m_byte shifted and ORd into right place in %rax

    ret

main:
    # Stack and base setup
    push    %rbp                    # save previous base pointer
    mov     %rsp, %rbp              # set our base pointer to start of stack frame
        
    mov	    x, %rdi                 # 1st parameter in %rdi
    mov	    y, %rsi                 # 2nd parameter in %rsi
    call	bitOr			        # result in %rax

    # print out result printf("x=%ld, y=%ldi result=%ld\n");
    mov	    %rsi, %rdx		# y 3rd parameter
    mov	    %rdi, %rsi		# x 2nd parameter
    mov     $format1, %rdi          # 1st parameter is format string
    mov	    %rax, %rcx		# result 4th parameter
    xor     %rax, %rax              # not using vector parameters
    call    printf                  # printf

    mov     z, %rdi
    mov	    $2, %rsi
    mov	    $0, %rdx
    call	byteSwap			# result in %rax

    # print out result printf("%8.8x\n");
    mov     $format2, %rdi          # 1st parameter is format string
    mov	    %rax, %rsi		        # 2nd parameter is digit
    xor     %rax, %rax              # not using vector parameters
    call    printf                  # printf

    # return to sender
    leave                           # unset stack/base
    ret                             # beam me up scotty
