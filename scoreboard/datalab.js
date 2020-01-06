/*
 * Scoreboard for Project 1 Bit Hacker, CS 2330
 */

const INSTRUCTOR_USERID = 'sbarker'; // userid of The Prof
const SCORE_URL = 'scores-f19.txt' // URL of score log.txt to display

const BIGNUM = 999999; // Arbitrary no.of ops assigned to incorrect solution
const THRESHOLD = -1000; // Total score < threshhold -> incorrect solution


var instructor = {};

function check_nickname(nickname) {
    if (nickname.length < 1) {
        return '---';
    }

    return nickname;
}

function parsePuzzleScore(puzzle) {
    var [pname, cpoints, unused, ppoints, ops] = puzzle.split(':')

    var ops = parseInt(ops);
    var cpoints = parseInt(cpoints);
    if (cpoints === 0) {
        // incorrect puzzles get the max number of ops
        ops = BIGNUM;
    }

    return {
        "name": pname,
        "cpoints": cpoints,
        "ppoints": parseInt(ppoints),
        "ops": ops
    };
}

function parseScoreLine(line) {
    var fields = line.split('|')
    var [hostname, date, userinfo, version] = fields.slice(0, 4)
    if (hostname === undefined | date === undefined | userinfo === undefined) {
        return {};
    }

    var [userid, nickname] = userinfo.split(':', 2);
    // nickname = check_nickname(nickname);

    var [tpoints, cpoints, ppoints, tops] = fields.slice(4, 8)

    puzzles = fields.slice(8).map(parsePuzzleScore);

    return {
        "hostname": hostname,
        "date": date,
        "userid": userid,
        "nickname": nickname,
        "version": version,
        "tpoints": parseInt(tpoints),
        "cpoints": parseInt(cpoints),
        "ppoints": parseInt(ppoints),
        "tops": parseInt(tops),
        "puzzles": puzzles
    };
}

function parseScoreFile(scoreFile) {
    // read all scores, replace existing ones as we go
    // only the last score counts!
    scoresByUser = {};
    scoreFile.split('\n').forEach(scoreLine => {
        score = parseScoreLine(scoreLine);
        if (score.userid != undefined) {
            scoresByUser[score.userid] = score;
        }
    });

    // score = instructor ops - student ops
    instructor = scoresByUser[INSTRUCTOR_USERID];

    // compute score for each puzzle
    for (userid in scoresByUser) {
        user = scoresByUser[userid];
        user.isWinner = true;
        totalScore = 0;
        for (puzzleName in user.puzzles) {
            puzzleScore = instructor.puzzles[puzzleName].ops - user.puzzles[puzzleName].ops;
            totalScore += puzzleScore;
            if (user.isWinner && puzzleScore < 0) {
                user.isWinner = false;
            }
        }
        user.score = totalScore;
    }

    scores = [];
    for (userid in scoresByUser) {
        scores.push(scoresByUser[userid]);
    }

    return scores;
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
            [1, "desc"]
        ],
        "columnDefs": [{
            'targets': 0,
            'data': 'nickname',
            // 'render': function(data, type, row, meta) {
            //     if (row !== instructor && row.isWinner) {
            //         return data + ' &#F09F8E93;';
            //     }
            //     return data;
            // },
            "createdCell": function(td, cellData, rowData, row, col) {
                if (rowData !== instructor && rowData.isWinner) {
                    $(td).addClass('winner');
                }
            }
        }, {
            'targets': 1,
            'data': 'score',
            "createdCell": function(td, cellData, rowData, row, col) {
                $(td).addClass('center');
            }
        }, {
            "targets": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            "data": function(r, t, s, m) {
                return r.puzzles[m.col - 2].ops
            },
            "createdCell": function(td, cellData, rowData, row, col) {
                puzzleIndex = col - 2;
                if (cellData < instructor.puzzles[puzzleIndex].ops) {
                    $(td).addClass('score_beat');
                } else if (cellData == instructor.puzzles[puzzleIndex].ops) {
                    $(td).addClass('score_match');
                }

                $(td).addClass('center');
            }
        }, ],
        "createdRow": function(row, data, dataIndex) {
            if (data === instructor) {
                $(row).addClass('instructor');
            }
        }
    });
}

// fire emoji &#128293;
// mortar &#127891;

function create_tooltips() {
    // var trigger = $('[data-toggle="tooltip"]');
    // console.log(trigger);
    // var instance = new Tooltip(trigger, {
    //     title: trigger.attr('title'),
    //     trigger: "hover",
    //     placement: 'top'
    // });

    $('[data-toggle="tooltip"]').each(function () {
        new Tooltip($(this), {
            placement: 'top',
        });
    });
}
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