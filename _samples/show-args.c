#include <stdio.h>

// gcc -g -std=c99 -o show-args show-args.c
// gdb -tui --args ./show-args hello csci 2330
int main(int argc, char **argv) {
	printf("Indexed...\n");
	for (int i = 0; i < argc; i++) {
		printf("arg %d is %s\n", i, argv[i]);
	}

	printf("\nthe pointer way...\n");
	char **pp = argv;
	for (int argn = 0; argn < argc; argn++) {
		printf("arg %d is %s\n", argn, *pp);
		pp++;
	}

	printf("\nRaw...\n");
	printf("argv = 0x%.16x\n", argv);
	// b21, r, p argv, x/16gx argv, x/16c 0x00007fffffffd116
	for (int i = 0; i < argc; i++) {
		printf("argv[%d] = 0x%.16x -> \"%s\"\n", i, argv[i], argv[i]);
	}

	return 0;
}
