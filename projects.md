---
title: Projects
permalink: /projects/
layout: default
---
# Project Assignments
----
Projects are to be submitted using `git` and [GitHub](https://github.com).

<div class="projects">
	<ul class="post-list">
		{% assign projects = site.projects | where: "hidden", "false" | sort: 'order' %}
		{% for project in projects %}
			<li>
				<h2><a class="post-link" href="{{ project.url | relative_url }}">{{ project.title | escape }}</a></h2>
				<span class="post-meta">{{ project.description | escape }}</span>
				{% assign date_format = site.minima.date_format | default: "%A, %B %-d, %Y at %I:%M%p" %}
				Due: <span class="post-meta due-date">{{ project.due | date: date_format }}</span>
			</li>
		{% endfor %}
	</ul>
</div>

{% include resources.html %}
