---
title: Lab 4 - Stack Attack
assigned: 2020-04-03 23:59
due: 2020-04-16 23:59
hidden: true
---
Most of the bitbombs on our server have been safely defused, but a few unusual ones remain. We believe that these programs are actually prototypes of more powerful, implosive bytebombs (8x the explosive power)! The bytebombs appear to be detonated via activation strings that exploit security vulnerabilities hidden in the code. Luckily, we've managed to obtain partial source code to the bytebombs that should prove useful in figuring out how they work.

We've placed these bytebombs in a secure, binary-shielded part of our server. We need you to find working activation strings so that we can safely dispose of the bytebombs. To do so, you'll need to stack some bytes and attack the stack!

<!--more-->

This assignment involves generating a total of five attacks on two programs having different security vulnerabilities. Outcomes you will gain from this lab include:

* You will learn different ways that attackers can exploit security vulnerabilities when programs do not safeguard themselves well enough against buffer overflows.

* Through this, you will get a better understanding of how to write programs that are more secure, as well as some of the features provided by compilers and operating systems to make programs less vulnerable.

* You will gain a deeper understanding of the stack and parameter-passing mechanisms of x86-64 machine code.

* You will gain a deeper understanding of how x86-64 instructions are encoded.

* You will gain more experience with debugging tools such as GDB and OBJDUMP.

**Note**: In this lab, you will gain firsthand experience with methods used to exploit security weaknesses in operating systems and network servers. Our purpose is to help you learn about the runtime operation of programs and to understand the nature of these security weaknesses so that you can avoid them when you write system code. *We do not condone the use of any other form of attack to gain unauthorized access to any system resources*.

You will want to study Sections 3.10.3 and 3.10.4 of the CS:APP3e book as reference material for this lab.

## Stack Attack Files

Each of you has a set of files pertaining to your own stack attack. You can retreive these files by executing `./get-target.sh` from within your checked out repository. This will download and extract a subdirectory (`targetN`) with few key files that you should immediately add and commit to your repository (add the whole directory).

* `README.txt`: A file describing the contents of the directory
* `ctarget`: An executable program vulnerable to *code-injection* attacks
* `rtarget`: An executable program vulnerable to *return-oriented-programming* attacks
* `cookie.txt`: An 8-digit hex code that you will use as a unique identifier in your attacks.
* `farm.c`: The source code of your target’s *gadget farm,* which you will use in generating return-oriented programming attacks.
* `hex2raw`: A utility to generate attack strings.

You should also create the following files as you do your stack attacking:

* `descriptions.txt`: File in which you will describe your stack attack solutions.
* `ctarget.l1`: Plain text file you write and comment your (human-readable) exploit string for `ctarget` level 1.
* `ctarget.l2`: Plain text file you write and comment your (human-readable) exploit string for `ctarget` level 2.
* `ctarget.l3`: Plain text file you write and comment your (human-readable) exploit string for `ctarget` level 3.
* `rtarget.l2`: Plain text file you write and comment your (human-readable) exploit string for `rtarget` level 2.
* `rtarget.l3`: Plain text file you write and comment your (human-readable) exploit string for `rtarget` level 3.

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
  
  – The address of your injected code

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

You should use the text files `ctarget.l1` through `rtarget.l3` to store your (human-readable) exploit strings for each phase. If your exploit string is contained in a file called `ctarget.lN`, you can easily pass it to your bytebomb via `hextoraw` using UNIX pipes (a standard way of passing output from one program to the input of another) like so:

```bash
$ cat ctarget.lN.txt | ./hextoraw | ./ctarget
```

The above command outputs the human-readable contents of `ctarget.lN` using the `cat` command, passes that output to the program `hextoraw`, then takes the (raw, non-human readable) output of hextoraw and passes it to `ctarget`.

Alternately, you can store the raw string bytes in a file using I/O redirection, then redirect them back to the target, as follows:

```
$ ./hextoraw -i ctarget.lN > ctarget.lN.bytes
$ ./ctarget < ctarget.lN.bytes
```

The above will create a new file called `ctarget.lN.bytes` containing the raw (not human-readable) version of the exploit string in `ctarget.lN`, and then give that as input to the target. Using this method, you can also easily pass the raw bytes to the program from within gdb:

```bash
$ gdb ./bytebomb
(gdb) run < ctarget.lN.bytes
```

### Some Notes on Creating Exploit Strings

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

The server will test your exploit string to make sure it really works, and it will update the Stack Attack scoreboard page indicating that your userid (listed by your target number for anonymity) has completed this level.

Unlike the BitBomb Lab, there is no penalty for making mistakes in this lab. Feel free to fire away at `ctarget` and `rtarget` with any strings you like.

**IMPORTANT NOTE**: You can work on your solution on any Linux machine, but in order to submit your solution, you will need to be running on one of the following machines: `dover`, `foxcroft`, or `pauling`, the Bowdoin Linux servers.

The first three phases involve code-injection (CI) attacks on `ctarget, while the last two involve return-oriented-programming (ROP) attacks on `rtarget.
