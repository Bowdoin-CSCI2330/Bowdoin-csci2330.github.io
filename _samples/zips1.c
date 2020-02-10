#include <stdio.h>
#include <stdlib.h>

#define ZIP_LENGTH 5

int main(int argc, char **argv) {
	int* zip = (int*) malloc(sizeof(int) * ZIP_LENGTH);
	if (zip == NULL) {           
		perror("malloc failed");
		exit(0);                
	}

	zip[0] = 0;
	zip[1] = 4;
	zip[2] = 0;
	zip[3] = 1;
	zip[4] = 1;

	printf("zip is");
	for (int i = 0; i < ZIP_LENGTH; i++) {
		printf(" %d", zip[i]);
	}
	printf("\n");

	free(zip);
	return 0;
}
