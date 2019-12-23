---
title: About
permalink: /about
layout: default
---
# About The Course

USM Course Catalog: *A description of computer networks organized as a layered architecture based on the OSI Reference Model. Protocols and services of each layer are examined in detail. Specific local area networks, metropolitan area networks, and wide area networks will be considered. Prerequisites: COS 285, COS 251. Cr 3.*

The focus of the course will be on understanding and utilizing the Internet (TCP/IP) protocol stack. Students will write network client and server applications in addition to reading and discussing the theory behind modern data communication networks.

The class is often dual-listed as an undergraduate (COS 460) and graduate course (COS 540); graduate students will have additional reading and must prepare a presentation for the class (see below).

<!--more-->

## Instructor
Stephen Houser <houser@maine.edu>

## Course Objectives
The objectives of the course are as follows.
* The layering scheme of network protocols and how layers are implemented.
* The options available at each layer of the network and protocols used.
* How local networks work and how they interconnect to form inter-networks and the Internet.
* How application layer protocols are developed and used in practice. Including but not limited to:
    * DNS - Domain Name Service
    * DHCP - Dynamic Host Configuration Protocol
    * HTTP - Hyper Text Transfer Protocol
    * SMTP - Simple Mail Transport Protocol
* How develop network server and client applications.

## Prerequisites and Expectations
* COS 285
* COS 251

The course involves a fair amount of independent learning, experimentation, and work. Internet resources on network programming are plentiful and class time is limited. You will be expected to read (or at least skim and absorb) enough of these materials to be prepared for class.

## Textbook
You will use the textbook in and out of class. The examinations will combine material from in-class discussion and the textbook. The textbook is the reference for the course. All textbook material may not be covered during in-class discussions, yet you will still be responsible to demonstrate an understanding of it on the examinations.

<img align="center" height="200" src="http://images.amazon.com/images/P/0123850592.jpg" alt="Computer Networks Textbook Cover"/>

*Computer Networks: A Systems Approach*, Fifth Edition, L. L. Peterson and B. S. Davie, Morgan Kaufmann, 2011.

Amazon.com lists this textbook as Computer Networks, Fifth Edition: A Systems Approach (The Morgan Kaufmann Series in Networking) (Hardcover) for $56.24.

The Publisher maintains a site for the book and book extras at http://booksite.elsevier.com/9780123850591/

**This book is FREELY and legally available online at [https://book.systemsapproach.org](https://book.systemsapproach.org)**

## Projects
The course is partially project-based. There will be four (4) programming projects throughout the course. The projects will require you to develop network client and server programs. They will be graded both on how they work and how they are constructed and documented. You can use most any modern programming language (Java, C, C++, or python). If you intend on using something out of the ordinary -- not used in the curriculum -- please contact the instructor prior to beginning for approval.

### Schedule of Projects 

| n   | Project       | Possible Points |
| --- | ---           | ---             |
| 1   | Number Guess  |    50           |
| 2   | HTTP Server   |   100           |
| 3   | TBA Part 1    |    75           |
| 4   | TBA Part 2    |   100           |          

Your code will be submitted (checked in) on [GitHub](https://classroom.github.com/classrooms/30673287-usm-cos-460-540-computer-networks) to an assignment for each project. Details on what needs to be submitted will be included with each assignment. In all cases, you should submit only source code, no binary executable files. 

Your code must compile and run on systems other than your own, specifically the CS Cluster and/or the instructor's system. Be diligent not to include absolute paths or other common mistakes that prevent your code being compiled and executed on other systems.

Code should work and be your own creation. There are numerous sources of information on the Internet, including code. However, your submissions should be your own work not that of others cut-and-pasted into your projects or that of your classmates. Plagiarism is a serious offence and will be treated accordingly.

### Project Grading Rubric

| Score   | Grade | Notes |
| ---     | ---   | ---   |
| 90-100% | A     | Compiles, runs, meets or exceeds all specifications, well documented and organized |
| 80-89%  | B     | Compiles, runs, meets most or all specifications (black box tests) |
| 60-79%  | C     | Compiles, runs, meets some specifications |
| 50-59%  | D     | Does not compile or run, does not meet specifications |
| 0-50%   | F     | Not submitted, poor work |

## Examinations 
The course includes three (3) examinations. The examinations will cover all the material since the last examination. The final examination will primarily cover the material since the prior examination but also include some material from the entire course.

### Schedule of Examinations

| Exam  | Possible Points   | Notes |
| ---   | ---               | ---   |
| 1     | 100               | |
| 2     | 100               | |
| 3     | 125               | Cumulative |

The questions on the examinations will be a combination of material in the assigned sections of the book and what is discussed in class. The questions at the end of each chapter in the book are an excellent reference for what to expect on the examination questions.

The examinations will be conducted within Blackboard (www.courses.maine.edu). Each exam will be available to you on the day of the exam and require you to complete all the questions within a specific time duration (typically the same as the class meeting duration). Examinations will be automatically graded and your results immediately available for all non-essay answers.

### Exam Grading Rubric

| Score     | Grade |
| ---       | ---   |
| 90-100%   | A     |
| 80-89%    | B     |
| 60-79%    | C     |
| 50-59%    | D     |
| 0-50%     | F     |

## Research Summary Paper and Presentation (COS 540 Only)

The graduate course includes writing a research summary paper and presentation of the material to the class. The presentations will be approximately 30 minutes in length.

The schedule of presentations is available via [Google Calendar when available] with your University UserID. Presentation slots will begin the second week of class and end the week before final exams. They will be be self-assigned, first-come first-choice.

### Schedule of Graduate Work

| Assignment    | Possible Points |
| ---           | ---             |
| Paper         | 50              |
| Presentation  | 50              |

## Schedule

The following is the general schedule for the course. Topic coverage and due dates change based on progress, snow-days, holidays, and other events. Please see the [Course Summary](index.html) for current dates, topics, and reading materials.

| Date | Topic | Notes/Reading |
| :---: | ---   | --- |
| Week&nbsp;1 | Course Overview and Foundation, Socket Programming | Ch. 1 - Sections 1.1 - 1.4 and, [A Brief History of the Internet](http://www.internetsociety.org/internet/what-internet/history-internet/brief-history-internet), [There and Back Again: A Packet’s Tale (video)](https://www.youtube.com/watch?v=ewrBalT_eBM), [Beej's Guide to Network Programming (C)](http://beej.us/guide/bgnet/), [The Java Tutorial: All About Sockets](https://docs.oracle.com/javase/tutorial/networking/sockets/), [Python Network Programming](http://www.tutorialspoint.com/python/python_networking.htm) |
| Week&nbsp;2  | Network Performance | Ch. 1 - Sections 1.5 and 1.6, Getting Connected |
| Week&nbsp;3  | Local Links and Encoding, More Socket Programming | Ch. 2 - Sections 2.1 - 2.5, Assignment #1 Due |
| Week&nbsp;4  | Ethernet and Wireless | Ch. 2 - Sections 2.6 - 2.8 |
| Week&nbsp;5  | Switching and Bridging | Ch. 3 - Section 3.1, Exam #1 (Online) |
| Week&nbsp;6  | Basic Internetworking (IP) | Ch 3. - Section 3.2, [Bootstrapping with BOOTP and DHCP](https://www.cisco.com/c/en/us/about/press/internet-protocol-journal/back-issues/table-contents-22/dhcp.html), Assignment #2 Due |
| Week&nbsp;7 | Routing | Ch. 3 - Section 3.3 and 3.5 |
| Week&nbsp;8 | Simple Demultiplexer (UDP), Reliable Byte Stream (TCP) | Ch. 5 - Section 5.1 and 5.2 |
| Week&nbsp;9 | Remote Procedure Call (RPC), Real Time Protocol (RTP) | Ch. 5 - Section 5.3 - 5.5 |
| Week&nbsp;10  | Congestion Control | Ch 6. - Sections 6.1, 6.3, 6.5, and 6.6, Exam #2 (Online) |
| Week&nbsp;11 | Presentation Formatting | Ch. 7 - Section 7.1, Assignment #3 Due |
| Week&nbsp;12 | Multimedia Data | Ch. 7 - Sections 7.2 - 7.3, [YouTube network traffic at a campus network](http://gaia.cs.umass.edu/networks/papers/MMCN08-0.2.pdf) |
| Week&nbsp;13 | Network Security | Ch. 8 - Sections 8.1, 8.4, 8.5, 8.6, [A Look Inside Network Address Translators and Virtual Local Area Networks (VLANs)](https://www.cisco.com/c/en/us/about/press/internet-protocol-journal/back-issues/table-contents-29/anatomy.html) |
| Week&nbsp;14 | Traditional Applications, Overlay Networks | Ch. 9 - Sections 9.1, 9.5, [The Internet Under Crisis Conditions: Learning from September 11](https://www.nap.edu/read/10569/chapter/1), [An analysis of the Skype peer-to-peer Internet telephony protocol](http://www1.cs.columbia.edu/~salman/publications/skype1_4.pdf)
| Week&nbsp;15 | Graduate Presentations | Final Exam (online), Graduate Presentations Due, Graduate Research Papers Due, Assignment #4 Due |

## Grades
Grades for the course will be based on an accumulation of points from the examinations and assignments.
Schedule of Point Accumulation and Grade Assignment

| COS 460   | COS 540   | % Score   | Grade |
| :---:     | :---:     | :---:     | :---: |
| 585 - 650 | 675 - 750 | 90-100%   | A     |
| 520 - 584 | 600 - 674 | 80-89%    | B     |
| 390 - 519 | 450 - 599 | 60-79%    | C     |
| 325 - 389 | 375 - 449 | 50-59%    | D     |
| 0 - 324   | 0 - 374   | 0-50%     | F     |

## Late Policy

Extensions on projects, presentations, and examinations will not be granted except in the case of an emergency. Technical difficulties do not constitute an emergency. Late submissions will be penalized. Lateness will be determined by submission time and the assigned due date.

## Accommodations and Inclement Weather

Should you need services or accommodations due to a disability to fully participate in the class, please speak with the instructor or contact the Office of Academic Support for Students With Disabilities, Luther Bonney 242 on the Portland Campus.

Class cancellations are posted on USM’s website (http://usm.maine.edu) and on the Storm Line at 780-4800. You can also receive cancellations and emergency information from the USM Alert text messaging system (http://usm.maine.edu/usmalert).
