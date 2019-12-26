#include <stdio.h>

void dummy() {
  printf("This function isn't called\n");
}

void echo() {
  char buf[4]; // a buffer to store a line of text
  gets(buf); // read a line into the buffer
  puts(buf); // print (aka echo) the line
}

int main() {
  echo();
  printf("Finished!\n");
  return 0;
}
