#include <stdio.h>

void pargs(char **args) {
	int x = 2;
	char **p = args;

	printf("x is at %p and has value %d\n", &x, x);
	printf("p is at %p and has value %p\n", &p, p);
	while (*p != NULL) {
		printf("p is %p, *p is %p [%s] (index %ld)\n", p, *p, *p, (p-args));
		p++;
	}
}


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

	char *ARGS[4] = { "one ", " two", "three", NULL };
	pargs(ARGS);

	return 0;
}