/* bomblab.js - parse and score bomblab score file for display in datatable
 *
 */

// === Parse Bomb Score File ===
function parseScoreFile(scoreFile) {
    bombs = {};
    scoreFile.split('\n').forEach(scoreLine => {
        bombScore = parseScoreLine(scoreLine);
        if (bombScore.bomb_id != undefined) {
            updateBomb(bombScore, bombs)
        }
    });

    var scores = scoreBombs(bombs);

    return bombs;
};

function parseScoreLine(line) {
    var fields = line.split('|')
    if (fields.length != 6) {
        return {};
    }

    var [hostname, date, userid, password, version] = fields.slice(0, 5)
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

function updateBomb(bombScore, bombs) {
    var bomb_id = bombScore['bomb_id'];

    if (!(bomb_id in bombs)) {
        bombs[bomb_id] = {
            'bomb_id': bomb_id,
            'date': bombScore['date'],
            'userid': bombScore['userid'],
            'password': bombScore['password'],
            'version': bombScore['version'],
            'phase_status': [null, null, null, null, null, null],
            'phase_explosions': [0, 0, 0, 0, 0, 0],
            'explosions': 0,
            'score': 0,
            'status': 'invalid'
        };
    }

    var bomb = bombs[bomb_id];
    bomb['date'] = bombScore['date'];

    var phase = bombScore['phase'];
    bomb['phase_status'][phase - 1] = bombScore['status'];

    // count explosions
    if (bombScore['status'] == 'exploded') {
        bomb['phase_explosions'][phase - 1] += 1;
    }
}

// === Score Bombs ===
function scoreBombs(bombs) {
   /* Rank, bomb#, Date, phases defused, explosions, score, status */
    let scores = Array.from(Object.values(bombs)).map(scoreBomb);
    let sorted = scores.sort(function (a, b) { return b.score - a.score })
    return sorted;
}

function scoreBomb(bomb) {
    var score = scoreDefusals(bomb) - scoreExplosions(bomb);
    bomb['score'] = Math.max(score, 0);
    bomb['explosions'] = countExplosions(bomb);
    bomb['defused'] = countDefusals(bomb);
    bomb['status'] = 'valid';
    return bomb;
}

function scoreDefusals(bomb) {
    let total_score = bomb['phase_status'].reduce(function (score, status, phase) {
        if (status == 'defused') {
            switch (phase + 1) {
                case 1: return score + 10;
                case 2: return score + 20;
                case 3: return score + 20;
                case 4: return score + 20;
                case 5: return score + 20;
                case 6: return score + 10;
            }
        }

        return score;
    }, 0);

    return total_score;
}

function countDefusals(bomb) {
    let defused = bomb['phase_status'].reduce(function (phases_defused, status) {
        if (status == 'defused') {
            phases_defused++;
        }
        return phases_defused;
    }, 0);

    return defused;
}

function scoreExplosions(bomb) {
    let total_score = bomb['phase_explosions'].reduce(function (score, explosions, phase) {
        switch (phase + 1) {
            case 1: return score + Math.min(explosions * 0.5, 5.0);
            case 2: return score + Math.min(explosions * 0.5, 15.0);
            case 3: return score + Math.min(explosions * 0.5, 15.0);
            case 4: return score + Math.min(explosions * 0.5, 12.5);
            case 5: return score + Math.min(explosions * 0.5, 10.0);
            case 6: return score + Math.min(explosions * 0.5, 7.5);
        }

        return score;
    }, 0);

    return total_score;
}

function countExplosions(bomb) {
    let explosions = bomb['phase_explosions'].reduce(function (sum, current) {
        return sum + current;
    });

    return explosions;
}

function summarizeBombs(bombScores) {
    //Summary[phase: cnt][1: 0][2: 0][3: 2][4: 0][5: 0][6: 0]total defused = 0 / 3
}
