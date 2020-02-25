// thread.c - A demo of pthreads in C.
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

#define TOTAL_WORK (long) 1000000000

int num_threads;

void* do_work(void* arg) {

  int* tid = (int*) arg;
  printf("Thread %d started\n", *tid);

  long work_units = TOTAL_WORK / num_threads;
  long x = 0;
  for (long i = 0; i < work_units; i++) {
    // do some work
    x++;
  }
  printf("Thread %d finished\n", *tid);

  free(tid);
  return NULL; // return a dummy pointer
}

int main(int argc, char** argv) {

  if (argc != 2) {
    printf("Usage: ./thread [num_threads]\n");
    exit(0);
  }

  num_threads = atoi(argv[1]);
  printf("Starting with %d threads\n", num_threads);

  pthread_t* threads = (pthread_t*) malloc(num_threads * sizeof(pthread_t));

  for (int i = 0; i < num_threads; i++) {

    int* tid = (int*) malloc(sizeof(int));
    *tid = i;

    // launch the worker threads
    if (pthread_create(&threads[i], NULL, do_work, tid)) {
      printf("Error creating thread %d\n", i);
      exit(0);
    }

  }

  // wait for all worker threads to finish
  for (int i = 0; i < num_threads; i++) {
    if (pthread_join(threads[i], NULL)) {
      printf("Error joining thread %d\n", i);
      exit(0);
    }
  }

  printf("Finished all threads\n");

  return 0;
}

