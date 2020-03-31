---
title: Lab 3 - Bit Bombs
assigned: 2020-02-28 00:00
due: 2020-04-09 23:59
collaboration_policy: Level 1
group_policy: Individual
---

This lab will give you experience with x86-64 machine code and reverse-engineering, in addition to extensive practice with the debugger. Your task is to defuse a BitBomb planted on the class server by reverse-engineering it to discover its defusal codes!

<!--more-->

**Note**: Read through the full writeup before tackling your bitbomb - do not immediately (and blindly) execute it!

## Lab Overview

Agents of the nefarious organization **BitBombs Inc.** have infiltrated the CSCI 2330 server and planted a set of BitBombs on our machine. A BitBomb is a compiled executable program that consists of a sequence of six phases, each wired to explode and wreak havoc on our bits. The bitbombs are on timers and are set to detonate at midnight on November 1. Luckily, each bitbomb contains a failsafe mechanism - each phase of the bitbomb can be bypassed if a specific defusal code is entered. However, if an incorrect defusal code is entered for any phase, the bitbomb will immediately explode.

There are too many bitbombs for one person to handle, so each of you will be provided with your own bitbomb to defuse. Your task is to safely defuse your bitbomb before it detonates. Good luck - our bits are counting on you!

## BitBomb Files

Each of you has a set of files pertaining to your own bitbomb. You can retreive these files by executing `./get-bomb.sh` from within your checked out repository. This will download and extract a subdirectory with few key files that you should immediately add and commit to your repository (add the whole directory).

* `bomb`: Your unique bitbomb executable.
* `bomb.c`: Some code that BitBombs Inc. left lying around (we think it might be useful -- but do not compile it, it will not reproduce `bomb`).
* `codes.txt`: File in which you will write your defusal codes.
* `descriptions.txt`: File in which you will describe your defusal solutions.
* `README`: File containing information about your unique BitBomb.
* `ID`: File containing your username.

To add the downloaded bomb directory to your repository; replace `bombN` with the bomb directory that was downloaded:

```bash
$ git add bombN
$ git commit -a -m"Add downloaded bomb"
$ git push
```

## BitBomb Handling and Safety

**Safety Notice**: You should ONLY execute the `bomb` on the class server. Attempting to execute your `bomb` on any other machine will detonate it immediately!

Execute the bitbomb to begin the defusal process:

```bash
$ ./bomb
```

When executed, the bitbomb will wait for you to enter a defusal code, which will be passed to the current phase. If the code is correct, the phase will be bypassed and you will be prompted to enter the code for the next phase. If the code is incorrect, the bitbomb will explode. If you enter all six correct defusal codes, the bitbomb will be defused. Note that pressing enter without typing anything still constitutes submitting a defusal code!

**Safety Notice**: Our server has been outfitted with a bitbomb monitoring system, which will automatically detect and record bitbomb explosions. Practice safe bitbomb handling and don't blindly execute your bitbomb!

The bitbomb will start from phase 1 each time you execute it. To avoid having to re-enter earlier defusal codes each time you run the bitbomb, you should enter your codes in `codes.txt` as you discover them, one phase per line. Then, you can pass this file to your bitbomb when you execute it to automatically feed it your codes:

```bash
$ ./bomb codes.txt
```

Once all the codes from `codes.txt` have been given to the bitbomb, it will switch over to prompting for manual defusal codes as normal.

To discover the defusal codes and avoid accidentally setting off the bitbomb, you will need to use a debugger (GDB) to set breakpoints, step through the bitbomb, and inspect its state. However, this will be substantially more challenging than in the previous lab, because you will (mostly) not have any source code to reference! Instead, you will need to reverse-engineer your bitbomb by inspecting its assembly instructions.

To run the bitbomb using the debugger `gdb` and pass it a codes file, you can run the following:

```bash
$ gdb ./bomb
... startup messages from gdb ...
(gdb) run codes.txt
```

To run your bitbomb in `gdb` without passing it any initial codes, you can simply type run at the initial `gdb` prompt.

See the tools and advice sections below for more tips on defusing your bitbomb.

## Tasks

You are responsible for two tasks:

1. Determining the correct defusal codes and entering them into `codes.txt`.
2. Documenting your methods and insights during reverse engineering in `descriptions.txt`.

*Both of these files should be added and committed to your repository as part of your submission.*

You should organize your descriptions by phase (i.e., each phase should have a code and a corresponding description). Each description should be a short paragraph or two describing what the phase is doing with your input (to the best of your understanding), and how you determined the correct input.

The objective of your descriptions should not be a line-by-line explanation of what each individual assembly command is doing (though you'll largely need to understand that regardless), but rather to show that you understand how the entire phase fits together at a higher level. Ideally, your documentation should describe the behavior of the phase at the level of comments you might write for a regular C program (e.g., "searches for the largest value in an array"). You may not understand every aspect of what each phase is doing (and that's okay) but your descriptions should explain what insights you've learned and how they led you to discovering your defusal codes.

A description like "I tried a bunch of random codes and this one worked" is not (by itself) a good description! Even if you happen to stumble across a working defusal code, you should still try to understand what the phase is actually doing.

## Defusal Toolkit

There are many approaches you can take to defusing your bitbomb. You can examine your bitbomb in great detail without ever executing it to figure out how it works. You can also execute the bitbomb using a debugger to run it step by step and examine the state of the machine along the way (while also giving you a chance to bail out before it explodes!). A mix of these two approaches is probably most efficient.

First, you should not use brute force to defuse your bitbomb! While you could theoretically write a program to try many defusal codes on your bitbomb, this is a bad idea for several reasons. One, the number of possibilities is so large that you are unlucky to solve your bitbomb using this approach. Two, a brute force approach will not allow you to write a very good description of your reverse engineering approach. Three, a brute force approach is likely to result in repeatedly detonating your bitbomb!

There are many tools that are designed to help you figure out how programs work and what is wrong when they do not work. You are likely to find the following tools helpful in particular:

* `gdb` will allow you to trace through the bitbomb instruction by instruction, examine the contents of memory and registers, look at the assembly code (and the source code if available...which it mostly isn't in this case), set breakpoints, and more. Refer to the GDB Reference Sheet for useful `gdb` commands.

* `objdump` is a program that can output various types of information about compiled (aka 'object') files. The two uses of `objdump` that you will likely find most useful are `objdump -t bomb` and `objdump -d bomb`. The former (`-t`) will print out the bitbomb's symbol table, which includes the names of all functions and global variables in the program, as well as their addresses. These names may be useful! The latter (`-d`) will dump a complete assembly instruction listing of the program (i.e., it will disassemble the entire program). You may note, however, that certain things in this assembly instruction listing are cryptic, particularly the names of system library functions that are called. Some of this information is presented more usefully when the code is disassembled from within `gdb` (i.e., while the program is running) - the reason for this has to do with linking and loading, some of which happens at runtime. You can disassemble within `gdb` using the `disas` command, which will usually give you the most information about the assembly instructions.

* `strings` is a utility that will output all the printable, literal strings contained in a program. A useful way to run it is `strings -t x bomb` Which will output all the strings and their hex offsets in the program.

* You may wish to save the output of running `objdump` or `strings` for later reference. You can easily do this using output redirection, like so `progname arg1 > output.txt` Which will run `progname arg1` and dump the output into a file called `output.txt` (of course, substitute whatever program, argument(s), and filename you actually want).

* If you encounter x86-64 assembly instructions with which you are not familiar, you can consult the textbook, Google, or go right to the source and check the the official [Intel architecture manuals](http://www.intel.com/content/www/us/en/processors/architectures-software-developer-manuals.html). *Remember when consulting references that we're using x86-64, not the 32-bit x86 (aka IA32)*.

Lastly, it may be helpful to refer to this [quick reference sheet of common x86-64 register names](https://www.bowdoin.edu/~sbarker/teaching/courses/systems/19fall/files/x86-registers.pdf) as you get used to the conventions (note that this sheet only shows 32-bit and 64-bit register names).

## Tips and Advice

The following pieces of advice are well worth heeding as you tackle your bitbomb:

**Safety Notice**: Don't let your bitbomb explode! The most reliable way to safeguard against inadvertent explosions is to set breakpoints within `gdb` such that the bitbomb will be interrupted before it explodes, giving you a chance to exit out and try again if you enter a wrong code. Make a habit of setting this breakpoint to give yourself an insurance policy!

* Remember that you can type `Control-C` to interrupt execution of a program that you're executing directly (i.e., outside of `gdb`). BitBombs Inc. was rumored to be working on a mechanism to defeat attempts to interrupt the bitbomb, so let's hope that feature doesn't work yet...

* Don't try to understand everything! When looking at assembly code, it is easy to go down a rabbit hole and find yourself staring at hundreds of instructions that may only be tangentially related to what you're actually investigating. Be methodical about what sections you focus your attention on and what sections you skim over. For example, if you can piece together how a helper function works using only the function name and a bit of trial and error, you can probably skip looking at the instructions of the helper function altogether.

* Take notes liberally while reverse engineering. Taking notes goes beyond writing your 'polished' notes which should be entered in `descriptions.txt`. You will be looking at a lot of instructions, register names, symbols, and memory addresses in the course of reverse engineering, and keeping everything in your head is likely to be difficult. Jot down notes along the way so you don't have to do the process all over again to remember how it worked!
**Start early!** Trying to defuse the bitbomb five minutes before detonation might make for a good TV episode but is unlikely to result in a successful defusal.

* The `display` command in `gdb` is quite useful - it allows you to print expressions automatically (registers, memory contents, etc) every time execution stops.

* The phases are *progressively more difficult*. Think of phase 1 like the reverse-engineering equivalent of writing "Hello World" and plan accordingly.

* We intercepted a BitBombs Inc. communication that mentioned something about a phase 7. Probably nothing, but keep your eyes open...

## Evaluation

Your final submission will consist of your committed files at the time of the due date, as well as the automatically submitted results of executing your bitbomb.

You will be evaluated both on determining the correct defusal codes for each phase as well as clearly documenting your methods and insights during reverse-engineering in `descriptions.txt`. Points for each phase are given below (of which roughly half will be from your solution and half from your description):

* Phase 1: 10 points
* Phase 2: 20 points
* Phase 3: 20 points
* Phase 4: 20 points
* Phase 5: 20 points
* Phase 6: 10 points

**Safety Notice**: Repeated detonations of your bitbomb may have a negative impact on your score as well as our bits!

Partial credit is possible on unsolved phases for clear documentation that demonstrates effort and some understanding of the phase. Full credit requires both correct defusal codes and high-quality descriptions!

## Disarmanent Status Report

To assist us in tracking the server-wide defusal effort, we have created an online Disarmament Status Report page (active for the duration of the lab). The status report page will show your progress towards defusing your bomb as well as the progress made by your classmates. You can also see your total number of bitbomb explosions on this page. Entries are identified by bitbomb ID, which is contained in your *README* file.

The status report page is automatically updated as you work with your bitbomb and requires no action on your part.

[BitBomb Disarmament Status Report](https://web.bowdoin.edu/~houser/csci2330/scoreboard/bomb.html)
