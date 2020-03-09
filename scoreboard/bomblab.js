/*
 * Scoreboard for Project 1 Bit Hacker, CS 2330
 */

const INSTRUCTOR_USERID = 'houser'; // userid of The Prof
const SCORE_URL = 'bomblab-s20.scores.txt' // URL of score log.txt to display

/*
bomb = { bomb_id, latest_date, phases[ ], score, status }
 bombSummary = { bomb_id, date, phases_defused, explosions, score, status }
 bombScores = { {bomb_id, date, max_phase, explosions, score, status }}
*/

//var bombStatus = {}

function updateBomb(bombScore, bombs) {
    var bomb_id = bombScore['bomb_id'];

    if (!(bomb_id in bombs)) {
        bombs.push({ 
            'bomb_id': bomb_id,            
            'phases': ["", "", "", "", "", "", "", ""],
            'explosions': 0,
            'score': 0,
            'status': 'invalid'
        })
    }

    var bomb = bombs[bomb_id]
    bomb['date'] = bombScore['date']

    var phase = bombScore['phase'];
    bomb['phases'][phase] = bombScore['status']

    // count explosions
    if (bombScore['status'] == 'exploded') {
        bomb['explosions'] += 1;
        bomb['score'] -= 0.5;
    }
} 

function parseScoreLine(line) {
/*
    foxcroft | Fri Mar  6 09: 27: 57 2020 | houser | 6IKa4DlcrnouDGjDZpeP | s20 | 1: defused: 1: The moon unit will be divided into two divisions.
        foxcroft | Fri Mar  6 09: 27: 59 2020 | houser | 6IKa4DlcrnouDGjDZpeP | s20 | 1: defused: 2: 0 1 1 2 3 5 8
    foxcroft | Fri Mar  6 09: 29: 44 2020 | houser | 6IKa4DlcrnouDGjDZpeP | s20 | 1: defused: 3: 0 817
    */

    var fields = line.split('|')
    if (fields != 6) {
        return {};
    }

    var [hostname, date, userid, password, version] = fields.slice(0, 4)
    if (hostname === undefined | date === undefined | userid === undefined | password === undefined) {
        return {};
    }

    var [bomb_id, status, phase, code] = fields[5].split(':');
    if (bomb_id === undefined | status === undefined | phase === undefined | code === undefined) {
        return {};
    }

    return {
        'hostname': hostname,
        'date': date,
        'userid': userid,
        'password': password,
        'version': version,
        'bomb_id': bomb_id,
        'status': status,
        'phase': phase,
        'code': code
    };
}

function parseScoreFile(scoreFile) {
/*
    //<th>Rank</th>
    <th>Bomb #</th>
        <th>Date</th>
        <th>Phases Defused</th>
        <th>Explosions</th>
        <th>Score</th>
        <th>Status</th>
*/
    // read all scores, replace existing ones as we go
    // only the last score counts!
    bombs = {};
    scoreFile.split('\n').forEach(scoreLine => {
        bombScore = parseScoreLine(scoreLine);
        if (bombScore.bomb_id != undefined) {
            updateBomb(bombScore, bombs)
        }
    });

    for (bomb in bombs) {
    }

    return scoresByBomb;
};

function reload_table(table) {
    $(table).DataTable().ajax.reload();
}

function make_datatable(table) {
    $(table).DataTable({
        "ajax": {
            "url": SCORE_URL,
            "dataType": "text",
            "dataSrc": function(psv) {
                var scores = parseScoreFile(psv);
                return scores;
            }
        },
        "paging": false,
        "searching": false,
        "info": false,
        "order": [
            [0, "desc"]
        ],
    });
}

// fire emoji &#128293;
// mortar &#127891;

/*
document.addEventListener('DOMContentLoaded',function(){
  var trigger = document.getElementsByClassName("is-success")[0];
  var instance = new Tooltip(trigger,{
    title: trigger.getAttribute('data-tooltip'),
    trigger: "hover",
  });
});
<button class="button is-success" data-tooltip="Only $5 one-time payment!">Add to basket</button>
*/
