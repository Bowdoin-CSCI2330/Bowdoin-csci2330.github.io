#include <stdio.h>

int main(int argc, char *argv[]) {
	for (int i = 0; i < argc; i++) {
		printf("arg %d is %s\n", i, argv[i]);
	}

	printf("\nthe pointer way...\n");
	char **pp = argv;
	for (int argn = 0; argn < argc; argn++) {
		printf("arg %d is %s\n", argn, *pp);
		pp++;
	}

	return 0;
}