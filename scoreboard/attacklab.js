/* attacklab.js - parse and score attacklab score file for display in datatable
 *
 */

// === Parse Target Score File ===
function parseScoreFile(scoreFile) {
    targets = {};
    scoreFile.split('\n').forEach(scoreLine => {
        targetScore = parseScoreLine(scoreLine);
        if (targetScore.target_id != undefined) {
            updateTarget(targetScore, targets)
        }
    });

    var scores = scoreTargets(targets);

    return targets;
};

//foxcroft|Tue Apr  7 15:19:28 2020|houser|csci2330-s20|1:PASS:0x6fcb2f8a:ctarget:1:00 00 ...
function parseScoreLine(line) {
    var fields = line.split('|')
    if (fields.length != 5) {
        return {};
    }

    var [hostname, date, userid, course] = fields.slice(0, 4)
    if (hostname === undefined | date === undefined | userid === undefined | course === undefined) {
        return {};
    }

    var [target_id, status, cookie, target, level, code] = fields[4].split(':');
    if (target_id === undefined | status === undefined | cookie === undefined | target === undefined | level === undefined | code === undefined) {
        return {};
    }

    return {
        'hostname': hostname,
        'date': date,
		'userid': userid,
		'course': course,
        'target_id': target_id,
        'status': status,
        'cookie': cookie,
        'target': target,
        'level': level,
        'code': code
    };
}

function updateTarget(targetScore, targets) {
    var target_id = targetScore['target_id'];

    if (!(target_id in targets)) {
        targets[target_id] = {
            'target_id': target_id,
            'date': targetScore['date'].substring(0, 16),
            'userid': targetScore['userid'],
            'cookie': targetScore['cookie'],
            'course': targetScore['course'],
            'level_status': [null, null, null, null, null],
            'score': 0,
            'status': 'invalid'
        };
    }

    var target = targets[target_id];
    target['date'] = targetScore['date'].substring(0, 16);

	var level = targetScore['level'];
	if (targetScore['status'] === 'PASS') {
		target['level_status'][level - 1] = 'exploited';
	}
}

// === Score Targets ===
function scoreTargets(targets) {
   /* Rank, target#, Date, phases defused, explosions, score, status */
    let scores = Array.from(Object.values(targets)).map(scoreTarget);
    let sorted = scores.sort(function (a, b) { return b.score - a.score })
    return sorted;
}

function scoreTarget(target) {
    var score = scoreExploits(target);
    target['score'] = Math.max(score, 0);
    target['exploited'] = countExploits(target);
    target['status'] = 'valid';
    return target;
}

function scoreExploits(target) {
    let total_score = target['level_status'].reduce(function (score, status, phase) {
        if (status == 'exploited') {
            switch (phase + 1) {
                case 1: return score + 20;
                case 2: return score + 25;
                case 3: return score + 20;
                case 4: return score + 30;
                case 5: return score +  5;
            }
        }

        return score;
    }, 0);

    return total_score;
}

function countExploits(target) {
    let exploited = target['level_status'].reduce(function (levels_exploited, status) {
        if (status == 'exploited') {
            levels_exploited++;
        }
        return levels_exploited;
    }, 0);

    return exploited;
}

var targetSummary = [];
var targetCount = 17; //0;

function summarizeTargets(targetScores) {
    //targetCount = targetScores.length;
    targetSummary = targetScores.reduce(function (scores, targetScore) {
        return scores.map(function (c, i, a) {            
            if (targetScore.exploited >= i + 1) {
                return c + 1;
            }

            return c;
        });
    }, [0, 0, 0, 0, 0]);

    return targetSummary;
}

function updateLevelStatus(statusListID) {
    let levelStatusDiv = document.getElementById(statusListID);
    if (levelStatusDiv) {
        var ul = document.createElement('ul');

        targetSummary.forEach(function(exploited, index) {
            var li = document.createElement('li');

            var p = document.createElement('p');
            p.innerHTML += exploited;
            if (exploited >= targetCount) {
                p.setAttribute('class', 'exploited');
            } else if (exploited >= (targetCount * 0.75)) {
                p.setAttribute('class', 'secure-yellow');
            } else {
                p.setAttribute('class', 'secure');
            }

            var span = document.createElement('span');
            span.innerHTML = 'Level ' + (index + 1) + ' (' + targetCount + ')';

            li.appendChild(span);
            li.appendChild(p);

            ul.appendChild(li);
        });
    
        levelStatusDiv.appendChild(ul);
    }
}
