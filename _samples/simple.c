// simple.c - simple C arithmetic to be converted to asm 

#include <stdio.h>
int add(x, y ) {
    return x + y;
}

int main() {
    int x, y, z;
    x = 42;
    y = -5;
    z = add(x, y)
    printf("%d + %d = %d\n", x, y, z);
    return z;
}