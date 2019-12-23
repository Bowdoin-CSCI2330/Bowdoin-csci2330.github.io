---
title: Exercises
layout: default
permalink: /exercises
---
# Exercises (not graded)
----
Exercises are not graded. They are used in class to experiment and learn the course materials.

<div class="exercises">
	<ul class="post-list">
		{% assign exercises = site.exercises | where: "hidden", "false" %}
		{% for exercise in exercises %}
			<li>
				<h2><a class="post-link" href="{{ exercise.url | relative_url }}">{{ exercise.title | escape }}</a></h2>
				<span class="post-meta">{{ exercise.description | escape }}</span>
			</li>
		{% endfor %}
	</ul>
</div>

{% include resources.html %}
