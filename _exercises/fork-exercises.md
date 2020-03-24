---
title: Fork Exercises
description: Using the UNIX fork() with parents and children.
order: 7
---
Printable [PDF version]({{ page.id | prepend: site.baseurl }}.pdf).

Consider the following snippet of code using `fork()`:

```
    ...
    int c = 5;
    pid_t pid = fork();
    if (pid == 0) {
        c += 5; 
    } else {
        pid = fork();
        c += 10;
        if (pid) {
            c += 10;
            fork();
            printf("%d\n", c);
        }
    }
    fork();
    printf("%d\n", c);
    ...
```

1. Including the initial process created by executing the program, how many processes are created by running this program?

2. Draw a picture of the hierarchical process tree that is created by running this program. Remember that `fork()` returns `0` in the child and (nonzero) child PID in the parent.

3. What are two different possible outputs of running this program? You should be able to determine this without actually executing the program! *Note: there are more than two possibilities!*