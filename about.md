---
title: About
permalink: /about/
layout: default
---
# About The Course

This course will provide a broad, programmer-oriented introduction to how modern computer systems execute programs, store information, and communicate. We examine the hardware and software abstractions and implementations required to go from a program expressed in a high-level programming language like C to the computer actually running the program. Topics include concepts of program compilation and assembly, machine code, data representation and computer arithmetic, caching and the memory hierarchy, processes, and system-level I/O.

<!--more-->

## Course Objectives
Primary course goals include:

* To understand how programs are executed by computers (including key abstractions and their implementations underlying program execution).
* To grasp how these implementations impact the correctness, performance, and security of real-world programs.
* To gain proficiency in practical skills of systems and programming, including debugging, command-line environments, and managing memory.
* To build foundational knowledge for further study of many fields of computer science, such as operating systems, networks, distributed systems, programming languages, and computer architecture.

## Prerequisites

* CSCI 2101 (Data Structures). 

Prior knowledge of C is not required or expected.

## Course Requirements

Evaluation for the course is based on attendance and participation during class and lab sessions, completion of lab assignments, and two exams (one midterm and a final).

| Item                          | Points Each   | Total Points
| Weekly Prep Quiz	            | 2 x 15 weeks	| 30
| Weekly Class Participation	| 2 x 15 weeks	| 30
| Weekly Quiz	                | 12 x 15 weeks	| 80
| Midterm & Final Exam	        | 30 x 2	    | 60
| Labs	                        | 50 x 6	    | 300
| Total	 	                    |               | 600

Labs will be a mix of individual and group assignments. These assignments will demand a significant time commitment on your part, and it is critical that you start working early!

You will have 3 flex days to submit projects late without penalty during the semester, which may be allocated however you wish. You however, **must** notify the instructor prior to the due date and time. Beyond the use of your flex days, late assignments will be penalized one letter grade per day.

## Class Meetings

Each week of class will follow the same pattern.

* There will be a prep-quiz that is worth 2 points. Your answers here will only matter that they are substantive, not that they are right or wrong. These are due each Wednesday evening. They are meant to be taken *before* you read, watch, or listen to the material.
* There will be weekly videos, readings, etc. posted in Blackboard about the material we are covering.
* There will be a weekly live class will be meeting live on Zoom. This will be each Thursday evening during our regularly scheduled class time. You will work on exercises with classmates and we will have Q&A as well as discuss the labs. Attendance at all class meetings is expected and participation contributes to your overall grade in the course.
* There will be a weekly quiz worth 12 points that covers the material for that week. These are due Friday evenings.

## People

### Instructor
<ul class="people">
    {% assign instructors = site.data.people | where: "role", "instructor" %}
    {% for instructor in instructors %}
    <li class="person instructor">
        {{ instructor.name }} &lt;{{ instructor.email }}&gt; :
        {{ instructor.office }} <span class="due-date">{{ instructor.hours }}</span>
    </li>
    {% endfor %}
</ul>

### Teaching Assistants
<ul class="people">
    {% assign people = site.data.people | where: "role", "ta" %}
    {% for person in people %}
    <li class="person">
        {{ person.name }} &lt;{{ person.email }}&gt; :
        {{ person.office }} <span class="due-date">{{ person.hours }}</span>
    </li>
    {% endfor %}
</ul>

## Discussion Forum

Last semester we used [Slack]({{ site.discussion_url }}) to facilitate discussion outside of class. One of our first live-class questions will be what platform the class as a whole wants to use this semester. Some options to consider are; Slack, Teams, and Discord.

In general, this will be our preferred question posting place, a general place to talk about systems, and a place to connect with TAs and myself "off hours" rather than sending email. It will allow your classmates to both see and answer your questions, possibly quicker than I alone can (though you can also post privately such that only I can see your question).

## Textbook
There is one primary textbook that you should acquire:

<a class="textbook-cover optional" href="http://www.amazon.com/The-Programming-Language-Brian-Kernighan/dp/0131103628">
   <img src='{{ "/assets/TheCProgrammingLanguageCover.jpeg" | relative_url }}' alt='The C Programming Language Cover'/>
</a>

<a class="textbook-cover required" href="http://www.amazon.com/Computer-Systems-Programmers-Perspective-Edition/dp/013409266X">
    <img src='{{ "/assets/ComputerSystemsCover.jpg" | relative_url }}' alt='Computer Systems Book Cover'/>
</a>

[_Computer Systems: A Programmer's Perspective_, 3rd edition (2015)][systemsbook], by R. Bryant and D. O'Hallaron. The text is available from [Amazon][systemsbook-amazon] or through the campus bookstore. *NOTE: you **must** use the 3rd edition; earlier editions are substantially different and will not suffice.* 

In addition, you may wish (but are not required) to acquire a good reference on the C programming language. We won't be using a lot of _advanced C_ so the old, yet amazingly still accurate 
[_The C Programming Language_, 2nd edition (1988)][kandr], by B. Kernighan and D. Ritchie would be perfect. It is also available from [Amazon][kandr-amazon].

## Collaboration Policy and College Honor Code

Please review the [Computer Science Collaboration Policy](https://turing.bowdoin.edu/dept/collab.php). You are responsible for reading, understanding, and adhering to this policy in addition to the college's [Academic Honor Code and Social Code](https://www.bowdoin.edu/dean-of-students/student-handbook/the-academic-honor-code-and-social-code.html).


  [systemsbook]: https://csapp.cs.cmu.edu
  [systemsbook-amazon]: http://www.amazon.com/Computer-Systems-Programmers-Perspective-Edition/dp/013409266X
  [kandr]: https://en.wikipedia.org/wiki/The_C_Programming_Language
  [kandr-amazon]: http://www.amazon.com/The-Programming-Language-Brian-Kernighan/dp/0131103628
