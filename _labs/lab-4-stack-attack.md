---
title: Lab 4 - Stack Attack
assigned: 2020-04-10 00:01
due: 2020-04-23 23:59
collaboration_policy: Level 1
group_policy: Individual
---
Most of the bitbombs on our server have been safely defused, but a few unusual ones remain. We believe that these programs are actually prototypes of more powerful, implosive bytebombs (8x the explosive power)! The bytebombs appear to be detonated via activation strings that exploit security vulnerabilities hidden in the code. Luckily, we've managed to obtain partial source code to the bytebombs that should prove useful in figuring out how they work.

We've placed these bytebombs in a secure, binary-shielded part of our server. We need you to find working activation strings so that we can safely dispose of the bytebombs. To do so, you'll need to stack some bytes and attack the stack!

<!--more-->

This assignment involves generating a total of five attacks on two programs having different security vulnerabilities. Outcomes you will gain from this lab include:

* You will learn different ways that attackers can exploit security vulnerabilities when programs do not safeguard themselves well enough against buffer overflows.

* Through this, you will get a better understanding of how to write programs that are more secure, as well as some of the features provided by compilers and operating systems to make programs less vulnerable.

* You will gain a deeper understanding of the stack and parameter-passing mechanisms of x86-64 machine code.

* You will gain a deeper understanding of how x86-64 instructions are encoded.

* You will gain more experience with debugging tools such as GDB and `objdump`.

**Note**: In this lab, you will gain firsthand experience with methods used to exploit security weaknesses in operating systems and network servers. Our purpose is to help you learn about the runtime operation of programs and to understand the nature of these security weaknesses so that you can avoid them when you write system code. *We do not condone the use of any other form of attack to gain unauthorized access to any system resources*.

You will want to study Sections 3.10.3 and 3.10.4 of the CS:APP3e book as reference material for this lab.

## Stack Attack Files

Similar to the BitBomb lab, each of you has a set of files pertaining to your own stack attack. You can fetch these files by executing `./get-target.sh` from within your checked out repository. This will download and extract a subdirectory (`targetN`) with few key files that you should immediately add and commit to your repository (add the whole directory).

* `README.txt`: A file describing the contents of the directory
* `ctarget`: An executable program vulnerable to *code-injection* attacks
* `rtarget`: An executable program vulnerable to *return-oriented-programming* attacks
* `cookie.txt`: An 8-digit hex code that you will use as a unique identifier in your attacks.
* `farm.c`: The source code of your target’s *gadget farm,* which you will use in generating return-oriented programming attacks.
* `hex2raw`: A utility to generate attack strings.

You should also create the following files as you do your stack attacking:

* `descriptions.txt`: File in which you will describe your stack attack solutions.
* `level1.txt`: Plain text file you write and comment your (human-readable) exploit string for `ctarget` level 1.
* `level2.txt`: Plain text file you write and comment your (human-readable) exploit string for `ctarget` level 2.
* `level3.txt`: Plain text file you write and comment your (human-readable) exploit string for `ctarget` level 3.
* `level4.txt`: Plain text file you write and comment your (human-readable) exploit string for `rtarget` level 4.
* `level5.txt`: Plain text file you write and comment your (human-readable) exploit string for `rtarget` level 5.

Make sure you add these files to your repository!

To add the downloaded target directory to your repository; replace `targetN` with the target directory that was downloaded:

```bash
$ git add targetN
$ git commit -a -m"Add downloaded targets"
$ git push
```

## A Few Beginning Points

Here is a summary of some important rules regarding valid solutions for this lab. These points will not make much sense when you read this document for the first time. They are presented here as a central reference of rules once you get started.

* You must do the assignment on the Bowdoin Linux servers; `dover`, `foxcroft`, or `pauling`.

* Your solutions may not use attacks to circumvent the validation code in the programs.Specifically, any address you incorporate into an attack string for use by a `ret` instruction should be to one of the following destinations:

  - The addresses for functions `touch1()`, `touch2()`, or `touch3()`.
  
  - The address of your injected code

  - The address of one of your gadgets from the gadget farm.

* You may only construct gadgets from file `rtarget` with addresses ranging between those for functions `start_farm` and `end_farm`.

## The Target Programs

Both `ctarget` and `rtarget` read strings from standard input. They do so with the function getbuf defined below:

```C
unsigned getbuf() 2{
char buf[BUFFER_SIZE];
Gets(buf);
return 1;
}
```

The function `Gets()` is similar to the standard library function `gets()` — it reads a string from standard input (terminated by `\n` or end-of-file) and stores it (along with a null terminator) at the specified destination. In this code, you can see that the destination is an array buf, declared as having `BUFFER_SIZE` bytes. At the time your targets were generated, `BUFFER_SIZE` was a compile-time constant specific to your version of the programs.

Functions `Gets()` and `gets()` have no way to determine whether their destination buffers are large enough to store the string they read. They simply copy sequences of bytes, possibly overrunning the bounds of the storage allocated at the destinations.

If the string typed by the user and read by `getbuf()` is sufficiently short, it is clear that `getbuf()` will return `1`, as shown by the following execution examples:

```bash
unix> ./ctarget
Cookie: 0x1a7dd803
Type string: Keep it short!
No exploit. Getbuf returned 0x1 Normal return
```

Typically an error occurs if you type a long string:

```bash
unix> ./ctarget
Cookie: 0x1a7dd803
Type string: This is not a very interesting string, but it has the property ... Ouch!: You caused a segmentation fault!
Better luck next time
```

(Note that the value of the cookie shown will differ from yours.) Program `rtarget` will have the same behavior. As the error message indicates, overrunning the buffer typically causes the program state to be corrupted, leading to a memory access error. Your task is to be more clever with the strings you feed `ctarget` and `rtarget` so that they do more interesting things. These are called *exploit* strings.

Both `ctarget` and `rtarget` take several different command line arguments:

* `-h:` Print list of possible command line arguments
* `-q`: Don’t send results to the grading server
* `-i FILE`: Supply input from a file, rather than from standard input

Your exploit strings will typically contain byte values that do not correspond to the ASCII values for printing characters. The program `hex2raw` will enable you to generate these raw strings. See later on in the assignment for more information on how to use `hex2raw`.

### Making the Exploit Strings

Exploit strings will typically contain byte values that do not correspond to ASCII values used for printed characters. As a result, such exploit strings cannot be typed directly. Instead, you'll need to generate raw (i.e., binary) strings consisting of arbitrary byte values. The included program `hextoraw` will allow you easily generate raw strings by converting a hex-formatted string to a raw string. The `hextoraw` program expects input on `stdin` (i.e., the terminal) unless given the `-i` file option, in which case it will read input from file.

In a hex-formatted string, each byte value is represented by two hex digits and byte values are separated by spaces. For example, the string "012345" could be entered in hex format as `30 31 32 33 34 35` (remembering that the ASCII code for decimal digit `N` is `0x3N`). Run `man ascii` for a full table of ASCII values. Non-hex digit characters are ignored, including the blanks in the example shown.

You should use the text files `level1.txt` through `level5.txt` to store your (human-readable) exploit strings for each phase. If your exploit string is contained in a file called `levelN.txt`, you can easily pass it to your target via `hextoraw` using UNIX pipes (a standard way of passing output from one program to the input of another) like so:

```bash
$ cat levelN.txt | ./hextoraw | ./ctarget
```

The above command outputs the human-readable contents of `levelN.txt` using the `cat` command, passes that output to the program `hextoraw`, then takes the (raw, non-human readable) output of hextoraw and passes it to `ctarget`.

Alternately, you can store the raw string bytes in a file using I/O redirection, then redirect them back to the target, as follows:

```
$ ./hextoraw -i levelN.txt > levelN.bytes
$ ./ctarget < levelN.bytes
```

The above will create a new file called `levelN.bytes` containing the raw (not human-readable) version of the exploit string in `levelN.txt`, and then give that as input to the target. Using this method, you can also easily pass the raw bytes to the program from within gdb:

```bash
$ gdb ./bytebomb
(gdb) run < levelN.bytes
```

### Some Notes on Creating Exploit Strings (using hex2raw)

* Your exploit string must not contain byte value `0x0a` at any intermediate position, since this is the ASCII code for newline (`\n`). When `Gets()` encounters this byte, it will assume you intended to terminate the string.

* `hex2raw` expects two-digit hex values separated by one or more white spaces. So if you want to create a byte with a hex value of `0`, you need to write it as `00`. To create the word `0xdeadbeef` you should pass `ef be ad de` to `hex2raw` (note the reversal required for little-endian byte ordering).

### Stack Attacked!?

When you have correctly solved one of the levels, your target program will automatically send a notification to the grading server. For example:

```bash
unix> ./hex2raw < ctarget.l2.txt | ./ctarget
Cookie: 0x1a7dd803
Type string:Touch2!: You called touch2(0x1a7dd803) Valid solution for level 2 with target ctarget
PASSED: Sent exploit string to server to be validated. NICE JOB!
```

The server will test your exploit string to make sure it really works, and it will update the Stack Attack scoreboard page indicating that your username (listed by your target number for anonymity) has completed this level.

Unlike the BitBomb Lab, there is no penalty for making mistakes in this lab. Feel free to fire away at `ctarget` and `rtarget` with any strings you like.

**IMPORTANT NOTE**: You can work on your solution on any Linux machine, but in order to submit your solution, you will need to be running on one of the following machines: `dover`, `foxcroft`, or `pauling`, the Bowdoin Linux servers.

The first three phases involve code-injection (CI) attacks on `ctarget`, while the last two involve return-oriented-programming (ROP) attacks on `rtarget`.

## Part 1: Code Injection Attacks

For the first three phases, your exploit strings will attack `ctarget`. This program is set up in a way that the stack positions will be consistent from one run to the next and so that data on the stack can be treated as executable code. These features make the program vulnerable to attacks where the exploit strings contain the byte encodings of executable code.

### Level 1

For Level 1, you will not inject new code. Instead, your exploit string will redirect the program to execute an existing procedure.

Function `getbuf()` is called within `ctarget` by a function test having the following C code:

```C
void test() {
  int val;
  val = getbuf();
  printf("No exploit. Getbuf returned 0x%x\n", val);
}
```

When `getbuf()` executes its return statement (line 5 of getbuf), the program ordinarily resumes execution within function test (at line 5 of this function). We want to change this behavior. Within the file `ctarget`, there is code for a function `touch1` having the following C representation:

```C
void touch1() {
  vlevel = 1; /* Part of validation protocol */
  printf("Touch1!: You called touch1()\n");
  validate(1);
  exit(0);
}
```

Your task is to get `ctarget` to execute the code for `touch1` when getbuf executes its `return` statement, rather than returning to `test`. Note that your exploit string may also corrupt parts of the stack not directly related to this stage, but this will not cause a problem, since `touch1` causes the program to exit directly.

* All the information you need to devise your exploit string for this level can be determined by examining a disassembled version of `ctarget`. Use `objdump -d` to get this dissembled version.

* The idea is to position a byte representation of the starting address for `touch1` so that the `ret` instruction at the end of the code for `getbuf` will transfer control to `touch1`.

* Be careful about byte ordering.

* You might want to use `gdb` to step the program through the last few instructions of `getbuf` to make sure it is doing the right thing.

* The placement of buf within the stack frame for `getbuf` depends on the value of compile-time constant `BUFFER_SIZE`, as well the allocation strategy used by `GCC`. You will need to examine the disassembled code to determine its position.

### Level 2

Level 2 involves injecting a small amount of code as part of your exploit string.
Within the file `ctarget` there is code for a function `touch2` having the following C representation:

```C
void touch2(unsigned val) {
  vlevel = 2;       /* Part of validation protocol */
  if (val == cookie) {
    printf("Touch2!:
  validate(2); 
  } else {
    printf("Misfire: You called touch2(0x%.8x)\n", val);
    fail(2);
  exit(0); 
}
```

Your task is to get `ctarget` to execute the code for `touch2` rather than returning to `test`. In this case, however, you must make it appear to `touch2` as if you have passed your cookie as its argument.

* You will want to position a byte representation of the address of your injected code in such a way that ret instruction at the end of the code for `getbuf` will transfer control to it.

* Recall that the first argument to a function is passed in register `%rdi`.

* Your injected code should set the register to your cookie, and then use a ret instruction to transfer control to the first instruction in `touch2`.

* Do not attempt to use `jmp` or `call` instructions in your exploit code. The encodings of destination addresses for these instructions are difficult to formulate. Use `ret` instructions for all transfers of control, even when you are not returning from a call.

* See the discussion on how to use tools to generate the byte-level representations of instruction sequences later in the assignment.

* When writing assembly code, be careful of the difference between, e.g., `$0x3` (the value 3) and `0x3` (the value at memory address 3). It's easy to write the latter when you actually mean the former.

* If the argument `val` does not have the correct value, the output of the target will print out the (incorrect) value.

* You may be tempted to write an assembly instruction like the following to put a 64-bit value on the stack: `movq 0x1122334455667788, (%rsp)`. Unfortunately, this is not a valid x86-64 instruction (and will not assemble) due to an obscure x86-64 restriction that you can't load a 64-bit immediate data value into memory in one instruction. While you could instead accomplish this task in two instructions by first loading to a register and then copying to memory, remember if if you're just trying to get data onto the stack, you can just put your data onto the stack directly via the bytes of your exploit string.


### Level 3

Level 3 also involves a code injection attack, but passing a string as argument.
Within the file `ctarget` there is code for functions `hexmatch` and `touch3`. Your task is to get `ctarget` to execute the code for `touch3` rather than returning to `test`. You must make it appear to `touch3` as if you have passed a string representation of your cookie as its argument. While the idea is the same as in level 2, this one is trickier. 

* You will need to include a string representation of your cookie in your exploit string. The string should consist of the eight hexadecimal digits (ordered from most to least significant) without a leading `0x.`

* Recall that a string is represented in C as a sequence of bytes followed by a byte with value `\0`. Type `man ascii` on any Linux machine to see the byte representations of the characters you need.

* Your injected code should set register `%rdi` to the address of this string.

* When functions `hexmatch` and `strncmp` are called, they push data onto the stack, overwriting portions of memory that held the buffer used by `getbuf`. As a result, you will need to be careful where you place the string representation of your cookie.

## Part 2: Return Oriented Programming

Performing code-injection attacks on program `rtarget` is much more difficult than it is for `ctarget`, because it uses two techniques to thwart such attacks:

* It uses randomization so that the stack positions differ from one run to another. This makes it impossible to determine where your injected code will be located.

* It marks the section of memory holding the stack as non-executable, so even if you could set the program counter to the start of your injected code, the program would fail with a segmentation fault.

Fortunately, clever people have devised strategies for getting useful things done in a program by executing existing code, rather than injecting new code. The most general form of this is referred to as return-oriented programming (ROP). The strategy with ROP is to identify byte sequences within an existing program that consist of one or more instructions followed by the instruction `ret`. Such a segment is referred to as a `gadget`. 

Locating series of bytes in the program that encode useful instructions (i.e., locating useful gadgets) is tricky. Luckily, we've located the source code to a series of functions within  `rtarget` that might contain useful gadgets. This set of functions is called the *gadget farm* and is contained within the `farm.c` source file. For levels 4 and 5, you will need to identify useful gadgets from within the gadget farm to perform attacks similar to those in levels 2 and 3.

A gadget can make use of code corresponding to assembly-language statements generated by the compiler, especially ones at the ends of functions. In practice, there may be some useful gadgets of this form, but not enough to implement many important operations. For example, it is highly unlikely that a compiled function would have `popq %rdi` as its last instruction before `ret`. Fortunately, with a byte-oriented instruction set, such as x86-64, a gadget can often be found by extracting patterns from other parts of the instruction byte sequence.
For example, one version of rtarget contains code generated for the following C function:

```C
void setval_210(unsigned *p) {
    *p = 3347663060U;
}
```

The chances of this function being useful for attacking a system seem pretty slim. But, the disassembled machine code for this function shows an interesting byte sequence:

```asm
0000000000400f15 <setval_210>:
  400f15:       c7 07 d4 48 89 c7       movl   $0xc78948d4,(%rdi)
  400f1b:       c3                      retq
```
The byte sequence `48 89 c7` encodes the instruction `movq %rax, %rdi`. This sequence is followed by byte value `c3`, which encodes the `ret` instruction. The function starts at address `0x400f15`, and the sequence starts on the fourth byte of the function. Thus, this code contains a gadget, having a starting address of `0x400f18`, that will copy the 64-bit value in register `%rax` to register `%rdi`.

Your code for `rtarget` contains a number of functions similar to the `setval_210` function shown above in a region we refer to as the gadget farm. Your job will be to identify useful gadgets in the gadget farm and use these to perform attacks similar to those you did in Levels 2 and 3.

**Important**: The gadget farm is demarcated by functions `start_farm` and `end_farm` in your copy of `rtarget`. Do not attempt to construct gadgets from other portions of the program code.

To help you in locating gadgets, we have compiled a [handout detailing the encodings of useful instructions](https://web.bowdoin.edu/~sbarker/teaching/courses/systems/19fall/files/gadget-handout.pdf).

### Level 4

For Level 4, you will repeat the attack of Level 2, but do so on program `rtarget` using gadgets from your gadget farm. You can construct your solution using gadgets consisting of the following instruction types, and using only the first eight x86-64 registers (`%rax`–`%rdi`).

* `movq` : The codes for these are shown in [encodings of useful instructions](https://web.bowdoin.edu/~sbarker/teaching/courses/systems/19fall/files/gadget-handout.pdf).
* `popq` : The codes for these are shown in [encodings of useful instructions](https://web.bowdoin.edu/~sbarker/teaching/courses/systems/19fall/files/gadget-handout.pdf).
* `ret` : This instruction is encoded by the single byte `0xc3`.
* `nop` : This instruction (pronounced "no op," which is short for "no operation") is encoded by the single byte `0x90`. Its only effect is to cause the program counter to be incremented by 1.

Some advice:

* All the gadgets you need can be found in the region of the code for rtarget demarcated by the functions `start_farm` and `mid_farm`.

* You can do this attack with just two gadgets.

* When a gadget uses a `popq` instruction, it will pop data from the stack. As a result, your exploit string will contain a combination of gadget addresses and data.


### Level 5

Before you take on the Level 5, pause to consider what you have accomplished so far. In Levels 2 and 3, you caused a program to execute machine code of your own design. If `ctarget` had been a network server, you could have injected your own code into a distant machine. In Level 4, you circumvented two of the main devices modern systems use to thwart buffer overflow attacks. Although you did not inject your own code, you were able inject a type of program that operates by stitching together sequences of existing code. You have also gotten 95/100 points for the lab. That’s a good score. If you have other pressing obligations consider stopping right now.

Level 5 requires you to do an ROP attack on `rtarget` to invoke function `touch3` with a pointer to a string representation of your cookie. That may not seem significantly more difficult than using an ROP attack to invoke `touch2`, except that we have made it so. Moreover, Level 5 counts for only 5 points, which is not a true measure of the effort it will require. Think of it as more an extra credit problem for those who want to go beyond the normal expectations for the course.

To solve Level 5, you can use gadgets in the region of the code in rtarget demarcated by functions `start_farm` and `end_farm`. In addition to the gadgets used in Level 4, this expanded farm includes the encodings of different `movl` instructions. The byte sequences in this part of the farm also contain 2-byte instructions that serve as functional `nops`, i.e., they do not change any register or memory values.These include instructions,  such as `andb %al,%al`,that operateon the low-order bytes of some of the registers but do not change their values.

Some Advice:

* You’ll want to review the effect a `movl` instruction has on the upper 4 bytes of a register, as is described on page 183 of the text.

* The official solution requires eight gadgets (not all of which are unique). 

Good luck and have fun!

### Generating Byte Codes

Your exploit strings will often want to include the actual encodings of assembly instructions (i.e., byte codes). You can find these actual encodings by hand-writing assembly instructions, using `gcc` as an assembler, and `objdump` as a disassembler. For example, suppose you write a file `example.s` containing the following hand-written assembly code (`.s` is the standard suffix for an assembly code file):

```asm
# Example of hand-generated assembly code
pushq   $0xabcdef     # Push value onto stack
addq    $17,%rax      # Add 17 to %rax
movl    %eax,%edx     # Copy lower 32 bits to %edx
```

You can now assemble and then disassemble this file:

```bash
$ gcc -c example.s
$ objdump -d example.o > example.d
```

The generated file example.d now contains the byte encodings of the instructions in `example.s`; in particular, the following lines of interest:

```
0: 68 ef cd ab 00     pushq $0xabcdef
5: 48 83 c0 11        add $0x11,%rax
9: 89 c2              %eax,%edx
```

Each line shows the byte values that encode a single assembly language instruction. The number of the left indicates the starting address (starting with 0) while the hex digits after the colon indicate the byte codes for the instruction. Thus, we can see that the instruction push `$0xABCDEF` has hex-formatted byte code `68 ef cd ab 00`. Remember that endinaness matters! For example, note that the value `0xABCDEF` is specified in reverse byte order starting at byte address 1 above, since we're running on a little-endian machine.

From the above, we can read off the entire byte sequence for the code:

```
68 ef cd ab 00 48 83 c0 11 89 c2
```

This hex-formatted exploit string can then be passed through hextoraw to generate a raw input string for the target. Alternately (and perhaps preferably) you can simply edit the example.d file to omit extraneous characters and to contain C-style comments for readability, yielding:

```
   68 ef cd ab 00   /* pushq  $0xabcdef  */
   48 83 c0 11      /* add    $0x11,%rax */
   89 c2            /* mov    %eax,%edx  */
```

However, remember that you should store your human-readable exploit strings in the `.txt` files created in your directory for that purpose (`level1.txt` through `level5.txt`).

**Important** The `hextoraw` program will ignore C-style comments like those in the example above (but only /* */ comments, not // comments), and thus you should liberally comment your exploit string files. Also remember that you can add arbitrary line breaks in your exploit files to make them better organized and easier to read. Do not write your entire exploit string in a single unbroken line!

## Logistics

You are responsible for two tasks:

* Determining working exploit strings and storing them in the five text files (`level1.txt` through `level5.txt`). Remember that these files should contain the human-readable exploit strings, not the raw strings outputted by `hextoraw`.

* Documenting your methods and insights in `descriptions.txt`, again organized by exploit (but everything can be stored in this one single file). To supplement documentation here, you should write C-style comments using /* and */ in your exploit files (note: you cannot use // comments, and must have a space after the opening /* and before the closing */). You should also use newlines to break up your exploit strings into logical sections.

**Important** to reiterate the above: don't just write one huge line containing your whole exploit string!

Your final submission will consist of your **committed** files at the time of the due date.

## Evaluation

You will be evaluated both on determining working exploits for each stage as well as clearly documenting your methods and insights in `descriptions.txt`. Total points for each exploit are listed below:

* Level 1: 20 points
* Level 2: 25 points
* Level 3: 20 points
* Level 4: 30 points
* Level 5: 5 points

Partial credit is possible for clear documentation that demonstrates some understanding of the exploit even if the full exploit is not working.

## Stack Attack Status Report

The Disarmament Status Report page has been updated to show progress towards figuring out the stack attacks. You can view your progress towards completing the exploits on this page.

Stack Attack notifications are automatically logged by the server and require no action on your part.

[Stack Attack Status Report]