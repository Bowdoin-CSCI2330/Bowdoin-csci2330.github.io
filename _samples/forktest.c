#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <sys/types.h>

int main() {
  pid_t pid;

  printf("program started\n");

  pid = fork();

  if (pid < 0) {
    printf("fork failed\n");
  } else if (pid == 0) {
    // child process
    printf("this is the child\n");
  } else {
    // parent process
    printf("this is the parent\n");

  }
  printf("program ending\n");

  return 0;
}


