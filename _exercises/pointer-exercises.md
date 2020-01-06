---
title: Pointer Exercises
description: Using pointers to memory to find what they refer to.
order: 5
---
Printable [PDF version]({{ page.id }}.pdf).

<style type="text/css">
    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .sibling + table tr td:nth-child(1),
    .sibling + table tr td:nth-child(2) {
        width: 20%;
    }

</style>

Consider the array shown below with the specified contents, starting at memory address `x`. For each of the expressions given below, give the type of the expression as well as the value of the expression. Assume that `char`s are 8-bits, `int`s are 32-bits and `long`s are 64-bits. Also assume a *little-endian* machine.

![Image of memory layout for int val[5]](pointer-exercises-fig1.svg)

<div class="sibling"></div>

| ---               | ---       | ---       |
| Expression        | Type      | Value     |
| ---               | ---       | ---       |
| `val[4]`          |           |           |
| `val`             |           |           |
| `val + 1`         |           |           |
| `&val[2]`         |           |           |
| `*(val + 2)`      |           |           |
| `val + i`         |           |           |
| `*((char*) val)`  |           |           |
| `*((long*) val)`  |           |           |
| `val[5]`          |           |           |
| ---               | ---       | ---       |
