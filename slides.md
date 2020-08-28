---
title: Slides
layout: default
permalink: /slides/
---
# Lecture Slides
---
<div class="notes">
	<ul class="post-list">
		{% assign slides = site.slides | where: "hidden", "false" | sort: 'order' %}
		{% for slide in slides %}
			<li>
				<h2><a class="post-link" href="{{ slide.url | relative_url }}">{{ slide.title | escape }}</a></h2>
				<span class="post-meta">{{ slide.excerpt }}</span>
			</li>
		{% endfor %}
	</ul>
</div>
