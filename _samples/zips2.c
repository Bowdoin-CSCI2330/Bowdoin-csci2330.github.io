#include <stdio.h>
#include <stdlib.h>

#define NUM_ZIPS   3
#define ZIP_LENGTH 5


int *alloc_a_zip(int zip_length) {
	int* zip = (int*) malloc(sizeof(int) * zip_length);
	if (zip == NULL) {           
		perror("malloc failed");
		exit(0);                
	}

	return zip;
}


int main(int argc, char **argv) {
	int ** zips = (int **)malloc(sizeof(int *) * NUM_ZIPS);
	if (zips == NULL) {
		perror("malloc failed");
		exit(1);
	}


	zips[0] = alloc_a_zip(5);
	zips[0][0] = 0xBEEF;
	zips[0][1] = 0xDEAD;
	zips[0][2] = 0x00;

	printf("zips[0] is ");
	for (int i = 0; zips[0][i] != 0; i++) {
		printf(" %d", zips[0][i]);
	}
	printf("\n");

	zips[1] = alloc_a_zip(5);
	zips[1][0] = 2;
	zips[1][1] = 4;
	zips[1][2] = 6;
	zips[1][3] = 0;

	printf("zips[1] is ");
	for (int i = 0; zips[1][i] != 0; i++) {
		printf(" %d", zips[1][i]);
	}
	printf("\n");


	free(zips[0]);
	free(zips[1]);
	free(zips);
	return 0;
}
