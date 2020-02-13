#include <stdio.h>

int main(int argc, char **argv) {
	// int highbit = 20;

	unsigned int p1 = ~0x00;
	unsigned int p2 = p1 << (32 + 1);
	unsigned int p3 = ~(p1);

  	printf("%.4x %.4x, %.8x\n", p1, p2, p3);

	return 0;
}