// even.c - return 1 if any even-numbered bit in word set to 1
#include <stdio.h>
#include <stdlib.h>
/* 
 * anyEvenBit - return 1 if any even-numbered bit in word set to 1
 *   where bits are numbered from 0 (least significant) to 31 (most significant)
 *   Examples anyEvenBit(0xA) = 0, anyEvenBit(0xE) = 1
 *   Legal ops: ! ~ & ^ | + << >>
 *   Max ops: 12
 *   Rating: 2
 */
int anyEvenBit(int x) {
	int x8 = 0b01010101;
	//int x = 0x55;
	int x16 = (x8 << 8) | x8;
	int x32 = (x16 << 16) | x16;
	printf("%08x\n", x32);

	return 2;
}


int test_anyEvenBit(int x) {
	int i;
	for (i = 0; i < 32; i+=2) {
		if (x & (1<<i)) {
			return 1;
		}
	}

	return 0;
}

void check(int x) {
	int result = anyEvenBit(x);
	int test = test_anyEvenBit(x);
	char *ok = (result == test) ? "\033[0;32mOK\033[0m" : "\033[1;31mFail\033[0m";
	printf("0x%08X ==> %d == %d %s\n", x, result, test, ok);
}


int main(int argc, char **argv) {
	int i;
	for (i = 0; i < 16; i++) {
		check(i);
	}

	for (i = 0; i < 10; i++) {
		check(rand());	
	}

	return 0;
}
