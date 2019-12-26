#include <stdio.h>
#include <stdlib.h>

int main() {

  int* p1 = (int*) 5;
  printf("%d\n", *p1); // segmentation fault

  int* p2 = NULL;
  printf("%d\n", *p2); // segmentation fault

  char* p3 = (char*) malloc(sizeof(char) * 8);
  p3[0] = 0xFF;
  p3[5] = 0xFF;
  p3[188882345678] = 0xFF; // possible segmentation fault (unsafe)

  char* p4 = "Hello World";
  p4[0] = 'X'; // bus error (literals segment is read-only)

  return 0;
}

