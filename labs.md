---
title: Labs
layout: default
permalink: /labs/
---
# Lab Assignments
----
<div class="labs">
	<ul class="post-list">
		{% assign labs = site.labs | where: "hidden", "false" | sort: 'order' %}
		{% for lab in labs %}
			<li>
				<h2><a class="post-link" href="{{ lab.url | relative_url }}">{{ lab.title | escape }}</a></h2>
				<span class="post-meta">{{ lab.excerpt | markdownify }}</span>
			</li>
		{% endfor %}
	</ul>
</div>

{% include resources.html %}
