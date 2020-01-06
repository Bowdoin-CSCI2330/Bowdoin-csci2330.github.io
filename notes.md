---
title: Notes
layout: default
permalink: /notes
---
# Lecture Notes

<div class="notes">
	<ul class="post-list">
		{% assign notes = site.notes | where: "hidden", "false" | sort: 'order' %}
		{% for note in notes %}
			<li>
				<h2><a class="post-link" href="{{ note.url | relative_url }}">{{ note.title | escape }}</a></h2>
				<span class="post-meta">{{ note.excerpt }}</span>
			</li>
		{% endfor %}
	</ul>
</div>
