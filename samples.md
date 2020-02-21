---
title: Samples
permalink: /samples/
layout: default
---
# Sample Code

<div class="samples">
	<ul class="post-list">
		{% assign samples = site.samples %}
		{% for sample in samples %}
            <li>
                <h2><a class="post-link" href="{{ sample.url }}">{{ sample.url }}</a></h2>
            </li>
		{% endfor %}
	</ul>
</div>
