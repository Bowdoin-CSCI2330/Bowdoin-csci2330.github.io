---
title: Caching Exercises
description: Evaluating how caching affects system performance.
order: 6
---
Printable [PDF version]({{ page.id | prepend: site.baseurl }}.pdf).

<style type="text/css">
    .sibling + table {
        width: initial;
    }
</style>

1. Consider a hypothetical system containing only L1 cache and main memory. Assume that accessing L1 cache takes 1 CPU cycle, while accessing memory takes 101 CPU cycles (including the 1 initial cycle to check the cache).

    a. You write a program and run it on the machine. You observe through tests that the program exhibits a 97% cache hit rate. Calculate the average number of cycles required to service each data access.

    b. Later, you restructure your program's loops to improve its locality and find that the cache hit rate increases to 99%. Calculate the new average number of cycles required to service each data access. What is the impact of this 2% increase in the cache hit rate?

2. On a system with 8-bit memory addresses, consider the direct-mapped cache given below containing 8 cache lines, 4-byte blocks, and the specified contents. Assume write-back, write-allocate cache behavior.

    For each of the memory operations listed below that is reading or writing 1 byte at the given address, indicate (i) whether the operation is a cache hit or miss, (ii) how many memory blocks are read or written, and (iii) the affected cache line with any updates resulting from the operation. For writes, the specified value is the byte value that is being written to memory. For reads, the specified value is the byte value that is being read from memory (which might or might not already be contained in the cache).

    <div class="sibling"></div>

    | ---   | ---   | ---   | ---   | ---               | 
    | Line  | V     | D     | Tag   |   Data (4 Bytes)  |
    | ---   | ---   | ---   | ---   | ---               | 
    | 0     | `1`   | `0`   | `111` |   `17`            | 
    | 1     | `1`   | `0`   | `011` |   `9`             | 
    | 2     | `0`   | `0`   | `101` |   `15`            | 
    | 3     | `1`   | `1`   | `001` |   `8`             | 
    | 4     | `1`   | `0`   | `111` |   `4`             | 
    | 5     | `0`   | `0`   | `111` |   `6`             | 
    | 6     | `0`   | `0`   | `101` |   `32`            | 
    | 7     | `1`   | `0`   | `110` |   `3`             | 
    | ---   | ---   | ---   | ---   | ---               | 

    | ---       | ---                       | ---       | ---                   | ---           |
    | Operation | Value                     | hit/miss  | blocks read/written   | cache line    |
    | ---       | ---                       | ---       | ---                   | ---           |
    | Read      | `01000100` (Value: 5)     |           |                       |               |
    | Read      | `11100000` (Value: 17)    |           |                       |               |
    | Write     | `01110000` (Value: 7)     |           |                       |               |
    | Read      | `10101000` (Value: 12)    |           |                       |               |
    | Read      | `01101100` (Value: 2)     |           |                       |               |
    | Write     | `11111100` (Value: 3)     |           |                       |               |
    | ---       | ---                       | ---       | ---                   | ---           |
