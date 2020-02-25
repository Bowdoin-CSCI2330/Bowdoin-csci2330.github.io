---
title: Hello, World
---
An example of the program translation process with a simple "hello, world" program.
<!--more-->

## C Source Code

Our initial source code.

```c
#include <stdio.h>

int main(int argc, char **argv) {
    printf("hello, world\n");
    return 0;
}

```

# Representation as ASCII

Show the decimal representation of the source code file.

```bash
$ od -t a -t uC  hello.c
0000000    #   i   n   c   l   u   d   e  sp   <   s   t   d   i   o   .
           35 105 110  99 108 117 100 101  32  60 115 116 100 105 111  46
0000020    h   >  nl  nl   i   n   t  sp   m   a   i   n   (   )  sp   {
          104  62  10  10 105 110 116  32 109  97 105 110  40  41  32 123
0000040   nl  ht   p   r   i   n   t   f   (   "   h   e   l   l   o  sp
           10   9 112 114 105 110 116 102  40  34 104 101 108 108 111  32
0000060    w   o   r   l   d   \   n   "   )   ;  nl  ht   r   e   t   u
          119 111 114 108 100  92 110  34  41  59  10   9 114 101 116 117
0000100    r   n  sp   0   ;  nl   }
          114 110  32  48  59  10 125
0000107
```

# Pre-processor

Show output from the pre-processor phase of compilation.

```bash
$ gcc -E hello.c > hello.i
```

# Assembler

Show output from the assembler phase of compilation. NOTE: This disables optimization with `-O0` and `printf()` translation with `-fno-builtin` for clarity.

```bash
$ gcc -S -O0 -fno-builtin hello.c
```

```asm
.LC0:
        .string "hello, world\n"
main:
        push    rbp
        mov     rbp, rsp
        mov     edi, OFFSET FLAT:.LC0
        mov     eax, 0
        call    printf
        mov     eax, 0
        pop     rbp
        ret
```

# Object File

Show the symbols in the compiled object and the standard library.

```bash
$ gcc -c hello.c
$ objdump -T hello.o

...
# Location of standard library
$ gcc --print-file-name=libc.so
/usr/lib64/libc-2.17.so
$ objdump -TC /usr/lib64/libc-2.17.so
...
```


# An easier way -- Godbolt.org

* [godbolt.org](https://godbolt.org)
* [hello world example](https://godbolt.org/z/uFFa_F)

