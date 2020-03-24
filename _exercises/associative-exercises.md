---
title: Associative Exercises
description: Working with associative arrays for caching.
order: 7
---
Printable [PDF version]({{ page.id | prepend: site.baseurl }}.pdf).

1. Consider an associative cache of effective size `C` bytes (i.e., the number of data bytes the cache can hold), where `S` is the number of sets, `E` is the number of lines per set, and `B` is the block size in bytes. Write an expression for `E` in terms of `S`, `B`, and/or `C`. You may find it easier to first write an expression for `C` using the other terms.

2. Consider a cache with `(S, E, B)` = `(8, 2, 4)`, an 8-bit word size, and the partial
contents shown below. In this cache, a single LRU bit indicates which line in each set
was least recently used (LRU): if the LRU bit is `0`, then the 1<sup>st</sup> line is LRU, while if the
LRU bit is `1`, then the 2<sup>nd</sup> line is LRU. For each of the following memory operations,indicate whether a cache hit or miss occurs, as well as any updates to the affected
cache set. Consider each operation from the same starting contents shown below.

    | ---   | ---   | | --- | ---   | ---   | ---               |   | ---   | ---   | ---   | ---               |  
    | Set # | LRU   | | V   | D     | Tag   | Data (4 Bytes)    |   | V     | D     | Tag   | Data (4 Bytes)    |
    | ---   | ---   | | --- | ---   | ---   | ---               |   | ---   | ---   | ---   | ---               |  
    | 0     | 1     | | `0` | `0`   | `111` | `4`               |   | `1`   | `0`   | `001` | `17`              |  
    | 1     | 0     | | `1` | `1`   | `111` | `9`               |   | `1`   | `0`   | `010` | `5`               |  
    | 2     |       | |     |       | ...   | ...               |   |       |       | ...   | ...               |  
    | 3     |       | |     |       |       |                   |   |       |       |       |                   |  
    | 4     |       | |     |       |       |                   |   |       |       |       |                   |  
    | 5     |       | |     |       |       |                   |   |       |       |       |                   |  
    | 6     |       | |     |       |       |                   |   |       |       |       |                   |  
    | 7     |       | |     |       |       |                   |   |       |       |       |                   |  
    | ---   | ---   | | --- | ---   | ---   | ---               |   | ---   | ---   | ---   | ---               |  


    | ---       | ---                       | ---       | ---                   | ---           |
    | Operation | Value                     | hit/miss  | blocks read/written   | cache line    |
    | ---       | ---                       | ---       | ---                   | ---           |
    | Read      | `11100100` (Value: 9)     |           |                       |               |
    | Read      | `11100000` (Value: 17)    |           |                       |               |
    | Read      | `01110000` (Value: 7)     |           |                       |               |
    | Write     | `01000100` (Value: 10)    |           |                       |               |
    | Write     | `01101100` (Value: 2)     |           |                       |               |
    | ---       | ---                       | ---       | ---                   | ---           |



3. Pick the word that correctly completes the following statement (and explain why):

    *Two adjacent blocks of memory (e.g., the 4-byte blocks starting at addresses 64 and 68, respectively) **[must / may / cannot]** be stored in the same cache set of an associative cache. Assume that the cache is **not** fully associative.*