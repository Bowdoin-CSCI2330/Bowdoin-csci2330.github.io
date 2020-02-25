---
title: Samples
permalink: /samples/
layout: default
---
# Sample Code

Sample code used in class and for demonstration purposes. *Note that some of this code purposefully contains bugs for demonstration purposes.* Don't just copy and paste, pay attention to what these programs do!

<div class="samples">
	<ul class="post-list">
		{% assign samples = site.data.samples %}
		{% for sample in samples %}
            <li>
                <h2><a class="post-link" href="{{ sample.file }}">{{ sample.file }}</a></h2>
				<p>{{sample.description}}</p>
            </li>
		{% endfor %}
	</ul>
</div>
