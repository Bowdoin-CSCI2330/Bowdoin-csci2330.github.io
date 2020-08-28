---
title: Schedule
---
<table class="schedule">
    <thead>
        <tr>
            <th>WEEK</th>
            <th>TOPIC</th>
            <th>READING</th>
            <th>LABS</th>
            <th>NOTES &amp; LINKS</th>
        </tr>
    </thead>
    <tbody>
		{% assign date_format = site.minima.date_format | default: "%a, %h %d" %}
        {% assign schedule = site.data.schedule %}
        {% for meeting in schedule %}
            <tr>
                <td>Week {{ meeting.week }}</td>
                <td>{{ meeting.topic | markdownify }}</td>
                <td>{{ meeting.reading | markdownify }}</td>
                <td>{{ meeting.assignments | markdownify }}</td>
                <td>{{ meeting.notes | markdownify }}</td>
            </tr>
        {% endfor %}

    </tbody>
</table>

*Please see [About](about.html) and [Blackboard](https://blackboard.bowdoin.edu) for full details of the course. This page is only a quick-reference for approximate dates and course materials. It may not contain the most up-to-date schedule and due dates for assignments.*

