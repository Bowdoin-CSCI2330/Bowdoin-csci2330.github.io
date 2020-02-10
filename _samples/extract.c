#include <stdio.h>

void print_byte(unsigned char b) {
	const char *nybble[16] = {
		[0] = "0000",  [1] = "0001",  [2] = "0010",  [3] = "0011",  
		[4] = "0100",  [5] = "0101",  [6] = "0110",  [7] = "0111",
		[8] = "1000",  [9] = "1001",  [10] = "1010", [11] = "1011",
		[12] = "1100", [13] = "1101", [14] = "1110", [15] = "1111",
	};

	printf("%s%s", nybble[b >> 4], nybble[b & 0x0F]);
}


int main(int argc, char **argv) {

	if (argc != 2) {
		printf("Syntax: extract <number>\n");
		return 1;
	}

	unsigned uf;
	if (sscanf(argv[1], "%x", &uf)) {
		unsigned sign = uf >> 7;
		unsigned exp = uf >> 3 & 0x0F;
		unsigned frac = uf & 0x07;

		printf("sign\t\t= ");
		print_byte(sign);
		printf("\t%s\n", (sign >= 0) ? "+" : "-");

		printf("exponent\t= ");
		print_byte(exp);
		printf("\t%d\n", (int)exp - 7);

		printf("fraction\t= ");
		print_byte(frac);
		printf("\t%d\n", frac);
	}

	return 0;
}

