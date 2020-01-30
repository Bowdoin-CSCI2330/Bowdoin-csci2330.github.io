#include <stdio.h>
#include <stdbool.h>

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
	// 2.
	int p2 = 230;
	printf("2. %d, 0b", p2);
	print_byte(p2);
	printf(", 0x%2.2X\n", p2);

	int p5 = 0x69 | 0x55;
	printf("5. 0x%2.2X, %d\n", p5, p5);

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wconstant-logical-operand"
	bool p6 = 0x69 || 0x55;
#pragma clang diagnostic pop
	printf("6. 0x%2.2X, %d\n", p6, p6);
	return 0;
}

