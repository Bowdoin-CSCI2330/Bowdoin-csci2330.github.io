#include <stdio.h>
#include <stdlib.h>


int pcount(int x) {
	int result = 0;
loop:
	result += x & 0x01;
	x = x >> 1;
	if (x) {
		goto loop;
	}
	return result;
}

int main(int argc, char **argv) {
	int r = pcount(atoi(argv[1]));
	printf("result = %d\n", r);
	return 0;
}
