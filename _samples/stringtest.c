// stringtest.c - accessing strings in various ways using C
#include <stdio.h>
#include <string.h>

// string length with array notation
int string_length_v1(char str[]) {
  int len = 0;
  while (str[len] != '\0') {
    len++;
  }
  return len;
}

// string length with pointers
int string_length_v2(char* str) {
  int len = 0;
  while (*str) { // same as *str != '\0'
    len++;
    str++; // pointer arithmetic
  }
  return len;
}

// pointers without len counter
int string_length_v3(char* str) {
  char* p = str;
  while (*p) {
    p++;
  }
  return p - str;
}

int main() {

  char str[] = "Hello";
  size_t len = strlen(str);

  printf("String: %s\n", str);
  printf("Length: %zu\n", len);
  printf("Values: %d %d %d %d %d %d\n",
      str[0], str[1], str[2], str[3], str[4], str[5]);

  return 0;
}

