---
title: MOV Exercises
description: x86-64 data movement and addressing.
order: 5
---
Printable [PDF version]({{ page.id }}.pdf).

<style type="text/css">
    .tight-table + table {
        width: initial;
    }

    .ten-table + table tr th:nth-child(1) { 
        width: 20%;
    }

    ol ol { 
        list-style-type: lower-alpha; 
    }
</style>

1. Assuming the following memory contents and register values, compute the values given by the x86-64 operands in the table below. Assume a 4-byte operand size in all cases.

    Memory

    <div class="tight-table"></div>

    | 0x100     | 0x104     | 0x108     | 0x10C     | 0x110
    | `0xFF`    | `0xAB`    | `0x13`    | `0x11`    |

    Registers

    <div class="tight-table"></div>

    | Register  | Value     |
    | ---       | ---       |
    | %rax      |   `0x100` |
    | %rcx      |   `0x1`   |
    | %rdx      |   `0x3`   |
    | ---       | ---       |

    <div class="ten-table"></div>
    
    | ---               | ---       |
    | Operand           | Value     |
    | ---               | ---       |
    | `%rax`            |           |
    | `0x104`           |           |
    | `$0x108`          |           |
    | `(%rax)`          |           |
    | `4(%rax)`         |           |
    | `9(%rax, %rdx)`   |           |
    | `260(%rcx, %rdx)` |           |
    | `0xFC(,%rcx,4)`   |           |
    | `(%rax, %rdx, 4)` |           |
    | ---               | ---       |

2. What's wrong with each of the following movement commands? 
    1. `movq %eax, %rdx`
    2. `movl $0xF, (%ebx)`
    3. `movl %rax, (%rsp)`
    4. `movq %rax, $0x123`
    5. `movw (%rax), 4(%rsp)`