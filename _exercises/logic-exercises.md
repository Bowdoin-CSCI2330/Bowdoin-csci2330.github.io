---
title: Logic Exercises
description: Using logic to show true and false of expressions.
order: 3
---
Printable [PDF version]({{ page.id | prepend: site.baseurl }}.pdf).

Let x be some signed int and let `ux` be some unsigned int. For each of the statements below, decide whether the statement is always true or possibly false. If the latter, find a counterexample to demonstrate. Hint: <code class="highlighter-rouge">T<sub>min</sub></code> is often a good counterexample.

1. `x < 0` implies `(x * 2) < 0`

2. `ux >= 0`

3. `ux > -1`

4. `x > y` implies `-x < -y`

5. `x > 0 && y > 0` implies `x + y > 0`

6. `x >= 0` implies `-x <= 0`

7. `x <= 0` implies `-x >= 0`

8. `x & 7 == 7`

9. `(x | -x) >> 31 == -1`
