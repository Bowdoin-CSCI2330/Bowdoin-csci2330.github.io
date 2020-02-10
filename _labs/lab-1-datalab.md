---
title: Lab 1 - Bit Puzzles
assigned: 2020-01-31 23:59
due: 2020-02-13 23:59
collaboration_policy: Level 1
group_policy: Individual
---
This lab is designed to familiarize you with the bit-level representations of data used by computers. At the same time, you will become well-versed in the bitwise manipulations available in many languages (like C). Your task is to solve a series of puzzles implemented as short C functions in which various operations are implemented using only bitwise operators and no higher-level constructs.

<!--more-->

## Overview

In this lab, you will modify a single C source file, `bits.c`, which is included in the starter files. This file contains the skeleton for a set of 15 programming puzzles. Each puzzle is a function which should compute a simple operation (e.g., returning whether a given number is positive or negative). Your task is to complete each function using a highly restricted subset of the full C language. In particular, all of the following are prohibited to use in your functions:

* Any types other than the signed, 32-bit `int` type
* Casting
* Conditionals, loops, or any other branching structures (e.g., switch statements)
* Functions or macros (the latter are sort of like a primitive type of function)
* Any operators except for the following: `!`, `~`, `&`, `^`, `|`, `+`, `<<`, `>>`
* Any constants outside the range `0` to `255` (`0xFF`)

Individual puzzles may further restrict allowed operations, which will be noted in the puzzle description. Note that you are allowed to use assignment (`=)` to create variables in your functions (these will be helpful largely for the sake of readability).

Additionally, each function must be completed using using no more than a specified number of operators. This restriction is primarily to prevent 'brute-force' type solutions to some of the puzzles. Your goal should be to complete each puzzle using as few operators as possible. All operators except for = (assignment) count towards your total.

**Floating-point puzzles**: For floating point puzzles, the set of restrictions is somewhat relaxed. For these puzzles, you are allowed to use conditionals, loops, any constants, most operators, and both the `int` and `unsigned` types. You still cannot use any floating-point types, use casting, call functions, or use macros.

In order to solve the puzzles while following the rules above, you will need to have a clear understanding of data representations and be clever about using bitwise operators!

## Puzzle Information

Puzzles may make use of either raw bitwise values (i.e., bits not interpreted as numbers), integers, or floating-point numbers. Integers use a 2's complement representation and floating point numbers use the standard IEEE floating point representation discussed (or soon to be discussed) in class.

Each puzzle is assigned a *difficulty rating* from 1 to 4 reflecting their relative complexity (1 = easiest, 4 = hardest). Rating 1 puzzles may be reasonably doable in only a few minutes. However, harder puzzles (especially rating 3 puzzles) will almost certainly require a non-trivial amount of thought, experimentation, and pen-and-paper exploration. Don't underestimate how long later puzzles will take based on earlier puzzles!

In addition to your code implementing each puzzle, you must provide *explanations* (via comments embedded in `bits.c`) of how and *why* each of your solutions works. Your comments should go beyond a simple code-to-English translation of the bitwise operations you used, and should clearly demonstrate that you understand why (as opposed to simply *how*) your solution works. For example, a comment that says "shifts the bits right by 3 and then and's by 1" simply restates the binary operations and does not add any further information. A better comment might be "extracts the fourth-lowest bit". Your comments may be written either inline within your functions or in the function headers (or a mix of both). Do not neglect your explanations, as they will factor significantly into your lab grade!

Complete *reference implementations* of the puzzles are provided in `tests.c` that make use of the entire C language. Refer to these if you have any question about how a given function is supposed to behave. However, given that these implementations do not have any restrictions, they are not likely to be especially helpful in how to actually write your functions.

### Puzzle Listing

Summaries of the 15 puzzles are given below. Complete details of each puzzle are given in the `bits.c` file.

| ---           | ---       | ---           |
| Puzzle        | Rating    | Description   |
| ---           | ---       | ---           |
| `bitNor`        | 1         | Return `~(x|y)` using only `~` and `&`        |
| `bitAnd`       | 1         | Return x&y using only `~`and `|`              |
| `tmin`          | 1         | Return minimum two's complement integer       |
| `thirdBits`     | 1         | Return word with every third bit (starting from the LSB) set to `1` |
| `isEqual`       | 2         | Return `1` if `x == y`, and `0` otherwise  |
| `byteSwap`      | 2         | Swap the n-th byte and the m-th byte |
| `oddBits`       | 2         | Return word with all odd-numbered bits set to `1` |
| `floatNegate`   | 2         | Return bit-level equivalent of expression `-f` for floating point argument `f` |
| `sign`          | 2         | Return `1` if positive, `0` if zero, and `-1` if negative |
| `isAsciiDigit`  | 3         | Return `1` if `0x30 <= x <= 0x39` (ASCII codes for characters '0' to '9') |
| `logicalShift`  | 3         | Shift `x` to the right by `n`, using a logical shift |
| `addOK`         | 3         | Determine if can compute `x+y` without overflow |
| `bitMask`       | 3         | Generate a mask consisting of all `1`'s  |
| `logicalNeg`    | 4         | Implement the `!` operator, using all of the legal operators except `!` |
| `bitCount`      | 4         | Return count of number of `1`'s in word |
| `floatPower2`   | 4         | Return bit-level equivalent of the expression `2.0^x` |
| ---           | ---       | ---           |

## Testing

Checking your puzzle solutions can be tricky. Luckily, you will have a couple of useful tools at your disposal.

### `ishow`: Integer Representations

The `ishow` utility accepts an integer input (either in decimal or hex format) and outputs its signed, unsigned, and raw-bit (in hex) equivalents. For example:

```bash
$ ./ishow 20
Hex = 0x00000014, Signed = 20,  Unsigned = 20

$ ./ishow 0xffffffff
Hex = 0xffffffff, Signed = -1,  Unsigned = 4294967295
```

### `fshow`: Floating-Point Representations

The `fshow` utility accepts either an integer or hex value representing an arbitrary bit pattern, or a float-point number, and outputs the corresponding floating point value and representation components. For example:

```bash
$ ./fshow 5.25
Floating point value 5.25
Bit Representation 0x40a80000, sign = 0, exponent = 0x81, fraction = 0x280000
Normalized.  +1.3125000000 X 2^(2)

$ ./fshow 100
Floating point value 1.401298464e-43
Bit Representation 0x00000064, sign = 0, exponent = 0x00, fraction = 0x000064
Denormalized.  +0.0000119209 X 2^(-126)
```

### `dlc`: Compliance

The `blc` (bit lab compiler) utility is a modified C compiler that will check your solutions for compliance with the coding rules specified. To check the compliance (but *not* correctness!) of your solutions, run `dlc` on your `bits.c` file as follows:

```bash
$ ./dlc bits.c
If your program is fully compliant, no output will be produced (otherwise, an error message will be printed). You can also count the number of operations in each function by passing the -e switch:

$ ./dlc -e bits.c
```

### `btest`: Correctness

To check the correctness (but *not* compliance) of your solutions, use the `btest` utility. To use `btest`, you must compile it using the included `Makefile` by typing `make`, which will compile it using your current `bits.c` file. This means that your must rebuild `btest` each time you modify `bits.c`. You should not modify the included `Makefile`.

Once compiled, simply run the utility directly to check the correctness of all your solutions:

```bash
$ ./btest
```

You can also use the -f flag to tell btest to test only a single named function, like this (assuming a function named foo):

```bash
$ ./btest -f foo
```

While `btest` normally checks your solutions against many possible inputs, you can also check specific inputs using the flags `-1`, `-2`, and `-3`. For example, to test the correctness of `foo(5, 0xF)`, you could run the following:

```bash
$ ./btest -f foo -1 5 -2 0xF
```


### `driver.pl`: Autoscoring

The `driver.pl` utility (a Perl script) will both run `btest` to check your solutions as well as count the number of operations used. To use it, simply execute it directly:

```bash
$ ./driver.pl
```

The script will output an auto-generated score for each puzzle out of 1-3 possible correctness points (based on the difficulty rating of the puzzle) and 2 possible performance points (based on the number of operations used). The total score shown does not correspond directly to your lab score (in particular, a full performance score is *not necessary* for full credit) but will give you a sense of where improvement is possible.

## General Advice

* Although you are technically submitting a program here, don't approach this lab like a *programming project*. Sitting down to write code right off the bat is an inadvisable way to approach these problems. Instead, think about the puzzles and try things out with pen and paper before you type anything. In most cases, these puzzles can be more effectively solved on pen and paper than on a computer and require very little actual typing to implement.

* Remember that all **individual collaboration rules** (as specified in the collaboration policy) apply to this assignment. For example, you may verbally discuss approaches at a high level with other students, but you may not step another student through a puzzle solution. Please ask if you have any questions about what is or isn't allowed!

* **Start early!** Some of these puzzles are quite tricky, and you should not expect to solve these puzzles in one sitting.

## Puzzle Tips

* The `dlc` compiler will always output the following warning, which you can safely ignore:

    ```bash
    Non-includable file <command-line> included from includable file /usr/include/stdc-predef.h.
    ```

* Don’t include the `<stdio.h>` header file in your `bits.c` file, as it confuses `dlc` and will result in non-intuitive error messages. You can still use `printf()` for debugging without including the <stdio.h> header, although `gcc` will print a warning that you can ignore. Here's a [quick tutorial on `printf()`](http://alvinalexander.com/programming/printf-format-cheat-sheet) if you haven't used it before (usage in C is basically identical to the Perl examples shown there).

* The `dlc` program enforces a stricter form of C declarations than normally enforced by `gcc`. In particular, within a given block of code (i.e., as delimited by a set of curly braces), all variable declarations must come before all other statements. For example, the following code (while valid C) will not pass dlc:

    ```c
    int foo(int x) {
        int a = x; // a declaration
        a *= 2; // not a declaration
        int b = a; // ERROR: can't put a declaration after a non-declaration
    }
    ```

    To fix the above code so that it passes `dlc`, you would need to break the `int b = a;` line into separate declaration and assignment lines, and put the declaration before the `a *= 2`; line.

    * You will find *de Morgan's Laws* useful for the `andBits()` and `xorBits()` puzzles.

    * Shifting by 32 bits or more has undefined behavior. This means that if your program shifts a value by 32 or more bits, you can't count on any particular behavior -- not even the behavior you observe in any particular instance. We needn't worry about the reasons for this for now (though it has to do with the compiler performing some optimization tricks), but suffice to say that if you try to shift by 32 or more bits, you will likely introduce very subtle bugs in your program. Therefore, don't.

## Logistics

The lab files will be in the starter repository for you, simply **Start the Lab** in [Blackboard](https://blackboard.bowdoin.edu) and *clone* the resulting repository. 

The *only* file you will modify is `bits.c`.

Remember that you need to do your work on `dover` or `foxcroft`, *not on your local machine* -- since the files are compiled for Linux, they will not execute on a Mac or a Windows PC.

Your last-committed `bits.c` at the lab due date (and each of the intermediate checkpoints) will constitute your lab and checkpoint submissions. *Remember that if you haven't committed your work, it's not submitted*. Committing frequently as a way to save your work is a good idea as well.

## Evaluation

You will be evaluated on the contents of your `bits.c` file, which must contain both your puzzle solutions and your solution explanations. Do not store any work that you would like to be considered outside this file!

Your program will be evaluated on the correctness of your puzzle solutions, the number of operations used to construct your solutions, and your puzzle explanations (i.e. documentation).

Partial credit is possible for puzzle solutions that are not complete, provided some understanding of the problem is apparent (note that good documentation is doubly important here to demonstrate your understanding).

## "Bit Hacker" Contest

Just for fun, as part of this lab, you may participate in a *completely optional* contest to compete against other students and my solution to develop the most efficient puzzle solutions. The goal of the contest is to solve each puzzle using the fewest number of operators. Students who match or beat my solution's operator count for each puzzle are awarded the *Bit Hacker* designation and associated bragging rights.

To submit your puzzle entries to the contest, simply call the `driver.pl` with a `-u` flag providing a nickname that you would like to show on the scoreboard:

```bash
$ ./driver.pl -u "Your Nickname"
```

You may use any nickname you like and it need not identify yourself to other contest entrants (though I will be able to see your entries regardless of your nickname). You can submit to the contest as often as you like and there is never any penalty for doing so.

Your most recent contest submission will appear on a real-time scoreboard, identified only by your nickname. Follow the link below to view the current scoreboard (only active for the duration of the lab).

[Bit Hacker Scoreboard]({{ "/scoreboard/datalab.html" | relative_url }})
