// sample loops that fail
#include <stdio.h>

int main(int argc, char**argv) {
	for (int x = 0; x < 10; x++) {
		printf("%d ", x);
	}
	printf("\n");

	for (int y = 10; y > 0; y--) {
		printf("%d\n", y);
	}
	printf("\n");
	return 0;
}

