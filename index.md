---
title: Schedule
---

<table class="schedule">
    <thead>
        <tr>
            <th>DATE</th>
            <th>CLASS</th>
            <th>TOPIC</th>
            <th>READING</th>
            <th>NOTES &amp; LINKS</th>
        </tr>
    </thead>
    <tbody>
		{% assign date_format = site.minima.date_format | default: "%a, %h %d" %}
        {% assign schedule = site.data.schedule %}
        {% for meeting in schedule %}
            <tr>
                <td>{{ meeting.date | date: date_format}}</td>
                <td>{{ meeting.meeting }}</td>
                <td>{{ meeting.topic | markdownify }}</td>
                <td>{{ meeting.reading | markdownify }}</td>
                <td>{{ meeting.notes | markdownify }}</td>
            </tr>
        {% endfor %}

    </tbody>
</table>

*Please see to [About](about.html) for full details of the course. This page is only a quick-reference for dates and course materials. It will however contain the most up-to-date schedule and due dates for assignments.*

