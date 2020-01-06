---
title: Labs
layout: default
permalink: /labs
---
# Lab Assignments
----
Labs are to be submitted using `git` and [GitHub](https://github.com).

<div class="labs">
	<ul class="post-list">
		{% assign labs = site.labs | where: "hidden", "false" | sort: 'order' %}
		{% for lab in labs %}
			<li>
				<h2><a class="post-link" href="{{ lab.url | relative_url }}">{{ lab.title | escape }}</a></h2>
				<span class="post-meta">{{ lab.description | escape }}</span>
				{% assign date_format = site.minima.date_format | default: "%A, %B %-d, %Y at %I:%M%p" %}
				Due: <span class="post-meta due-date">{{ lab.date | date: date_format }}</span>
			</li>
		{% endfor %}
	</ul>
</div>

{% include resources.html %}
