---
title: Lab 0 - UNIX/Linux Warmup
assigned: 2020-01-21 08:30
due: 2020-01-31 08:30
collaboration_policy: Level 1
group_policy: Individual
---
This lab is designed to introduce and familiarize you with many of the tools that we will be using throughout the semester. Most significantly, this lab will teach you the basics of working in a Unix environment, using the command line, and writing and running programs on remote servers. Getting a handle on your working environment early on will save you lots of time in the long run and let you focus on the actual course material of the later labs.

<!--more-->

## Part 1 - UNIX/Linux and Git Crash Course

Go through the [Command-Line UNIX/Linux Crash Course](https://www.bowdoin.edu/~sbarker/unix/). If you have never worked in a command-line environment before, this tutorial may take you some time. If you have some UNIX/Linux background, you may already have seen most of this material (but you should still at least skim the tutorial to make sure).

A few parts of the tutorial involve short snippets of *C* code. Don't worry if you've never written any *C* code before; focus on the conceptual ideas being illustrated (e.g., the process of compilation and the use of command line arguments) and don't get bogged down by the details of C at this point. We'll dive into the details of *C* throughout the semester!

Also, Professor Barker's [Command-Line UNIX/Linux Crash Course](https://www.bowdoin.edu/~sbarker/unix/) above covers the version control software *Subversion*. You can *skip that section* as we will be using [git][git] and the online service [GitHub][github].

There are a number of online sources for UNIX/Linux and Git/GitHub information that you have access to. I have reviewed the following and found them to have all the information you will need in a well-laid out manner with clear examples. If you have never used [git][git] before you should go through one of the two [git][git] videos below.

* [Learning the Linux Command Line v2](https://www.linkedin.com/learning/learning-linux-command-line-2) on Linkedin Learning, Start with section 2 Command Line Basics (~2 hours).

* [Learning Git and GitHub](https://www.linkedin.com/learning/learning-git-and-github) on Linkedin Learning (~1.5 hours)

* [Git Essential Training: The Basics](https://www.linkedin.com/learning/git-essential-training-the-basics) on Linkedin Learning, More popular tutorial but longer (~3 hours).

**NOTE**: Access Linkedin Learning through the [Bowdoin Login Portal](https://login.bowodoin.edu) for access to Linkedin Learning materials.

There is nothing to submit for this part.

## Part 2 - CSCI 2330 Environment Setup

The UNIX/Linux tutorial above had you working on Bowdoin's campus-wide Linux machine `dover.bowdoin.edu` or `foxcroft.bowdoin.edu` (or, if you're on a Mac or a Linux machine yourself, you may have done the tutorial on your own local machine). For the rest of the course, you **must** use the one of `dover` or `foxcroft` for all labs. Even if the lab files appear to compile and run on your local machine, there are subtle differences between Linux and macOS (and between different version of Linux) that may cause hard-to-debug problems. Avoid these problems by always working on the College's servers (which are also the servers that will be used to evaluate your programs)!

In this second part, you will start in [Blackboard[blackboard] to *accept an assignment*, get set up with [git][git] and [GitHub][github], and then then complete a few simple tasks in UNIX/Linux to check your understanding. The main objective here is to make sure all systems issues are resolved now, and not right before the first *real* lab is due.

If you are unsure how to accomplish any of the tasks in this part, your first stop should be the UNIX/Linux tutorial above. After that, you should consult Piazza, the instructor, TAs, etc.

## Git and GitHub

We will use [git][git] and [GitHub][github] for storing and submitting all your lab assignments. Using [git][git] has several advantages: (1) your work will be backed up in the [git][git] repository, (2) it will be easy to work in groups later on, and (3) it provides an easy way for me to access your lab files, both before and after you have officially *submitted*.

You will have a dedicated repository on [GitHub][github] for each lab assignment in the class, which only you and I will be able to access. Your personal repositories will be created when you *accept* each assignment. You will only need a *free* [GitHub][github] account to continue, so if you don't already have one, head on over to [GitHub][github] and create one (use the SignUp button). You should use your Bowdoin email account when signing up. If you don't, you may not qualify for some added benefits [GitHub][github] gives to students. If you already have a [GitHub][github] account, it's perfectly fine to use that for your work here.

## Getting the Lab Materials

After you have a GitHub account, you are ready to *Start the Lab*.

### Start The Lab (in Blackboard)

Log in to [Blackboard][blackboard], choose this course, and find the Lab Assignment under Labs, this one is **Lab 0 - UNIX/Linux Warmup** and at this point should be the only one available. When you open the assignment you will find a link to **Start the Lab**, that's the link you want. Click it, and you will be redirected to [GitHub][github] and walked through the process of *accepting* the assignment and creating your private repository for the lab. When this process is done you will end up looking at the [GitHub][github] page for your lab repository. There should be just one file there, `README.md` which is a brief description of the lab assignment. In later labs there will be more *starter* code that you will work with.

### Get the Repository URL (in GitHub)

The next step is to clone the newly created repository to the College Linux system (remember always use either `dover.bowdoin.edu` or `foxcroft.bowdoin.edu`) so you can begin working. To make your working copy, you will need one peice of information from [GitHub][github], the repository URL. On the *code* tab of your repository there will be a bright green button labelled **Clone or download**, click that and make sure you have **Clone with HTTPS** selected. Copy the repository URL. The repository URL will look something like the following:

```
https://github.com/bowdoin-csci2330/LABNAME-YOURUSERNAME
```

Where `LABNAME` is the name of the lab you are cloning and `YOURUSERNAME` is your [GitHub][github] username. If it doesn't look right, make sure you are looking at the correct [GitHub][github] page and project.

NOTE: *Clone with SSH* will allow you to access [GitHub][github] without typing your username and password every time, if you want to move to this advanced configuration, check out [Connecting to GitHub with SSH](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).

### Clone the Repository (on UNIX/Linux System)

You now have all the information you need to clone the repository onto the College UNIX/Linux system. Open up your terminal, and log in to `dover` or `foxcroft`, and change to the directory where you want your work to be located and run the following `git clone` command. **NOTE: Use the repository URL you copied with your username and the correct lab name**.

```bash
$ git clone https://github.com/bowdoin-csci2330/LABNAME-YOURUSERNAME
```

The above command will create a new directory named `LABNAME-YOURUSERNAME` (which is the cloned repository) in the current directory (you can give it any name you wish). Initially, there are only the *starter* files within your repository, so your cloned repository will have copies of them.

Remember that cloning a repository is generally a one-time step. Once you have a cloned (i.e., local) copy of the repository sitting in your home directory on the server, you will work on all of your labs within that directory. You should not need to clone the directory again.

## Part 3 - Sanity Check

Your last task is to write a very (very!) simple C program, a Makefile for this program, and then check your files into your [git][git] repository and `push` them back to [GitHub][github].

Start by `cd`-ing into your cloned directory, and do the following:

1. Create a program called `like.c` that simply prints the message "I like [xyz]!" where [xyz] is the first command line argument. If the program is not given any command line arguments, or is given more than one, it should instead print "What do I like?". Here are a few examples, assuming the executable compiled from `like.c` is named like:

    ```bash
    $ ./like pizza
    I like pizza!
    $ ./like Linux
    I like Linux!
    $ ./like
    What do I like?
    $ ./like Linux pizza
    What do I like?
    $ 
    ```

    If you've never written a C program before, just use the example in the Unix tutorial as a starting template and modify that -- you don't need any further knowledge of C to complete this part. *Your name should be included in a comment at the top of your program*.

2. Write a `Makefile` for your C program. Your `Makefile` should have two targets: the default target (which you should call `build`) which compiles the program into an executable named `like`, and a `clean` target that deletes the compiled files (here, just the like executable). Follow the `Makefile` example given in the Unix tutorial.

3. Once your program is finished, I should be able to run the following set of commands from your lab directory to compile your program, run it, and then clean up (at which point I'd need to run `make` again before I could run the program again):

    ```bash
    $ make build
    $ ./like systems
    I like systems!
    $ make clean
    $ ./like systems
    -bash: ./like: No such file or directory
    $ make
    $ ./like make
    I like make!
    $ 
    ```

4. Add your files to the [git][git] repository using `git add`, then commit your files using `git commit`. You will have to enter a *commit message* with `git commit` that descirbes the changes you made. In this beginning step, that message might be something like "Initial version".

5. Push your newly added files and changes to [GitHub][github] with `git push`. This constitutes *submitting* your lab. Although you may also make changes later on, the most recently pushed files in [GitHub][github] will be considered your submission.

    If you want to verify that you committed your lab files correctly, go back to your [GitHub][github] page for the lab assignment and refresh. You should see your new files and changes. If not, go back and check your work.

    NOTE: You should not add your compiled executable or the `.o` files created by the C compiler to [git][git] (since these can be immediately regenerated from the source code using the `Makefile`).

## Evaluation

While this lab is only a warmup, your submission will be checked based on the following criteria:

* Does your program follow the specification above?
* Does your program include a `Makefile` with both the default `build` target and a `clean` target?
* Are all your files checked into and pushed to your private [GitHub][github] repository?
* Is your name in the comments of your source code and `Makefile`

    [github]: https://github.com
    [blackboard]: https://blackboard.bowdoin.edu
    [git]: https://git-scm.org
    [login]: https://login.bowdoin.edu