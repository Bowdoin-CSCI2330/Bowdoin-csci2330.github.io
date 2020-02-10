#include <stdio.h>

int main(int argc, char **argv) {
	char c = 0x12;
	short s = 0x1234;
	int i = 0x12345678;
	long l = 0x123456789ABCDEF0;

	printf("%hhx, %hx, %x, %lx\n", c, s, i, l);
	return 0;
}
