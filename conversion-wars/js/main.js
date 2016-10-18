/* 
	This code was written by Einar Egilsson: https://github.com/einaregilsson
	The original game is available on http://www.gofish-cardgame.com/
	    
*/

log = function log(msg) {
    if (typeof console != 'undefined' && console.log && log.enabled) {
        console.log(msg);
    }
}
log.enabled = false;

/* //cookies
function cake(name, value, expiresInDays) {
    if (typeof value != 'undefined') {
        var c = name + '=' + encodeURIComponent(value);
        if (expiresInDays) {
            var date = new Date();
            date.setTime(date.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
            c += '; expires=' + date.toUTCString();
        }
        document.cookie = c;
    } else {
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var c = cookies[i].replace(/^\s*|\s*$/g, '');
                if (c.substring(0, name.length + 1) == (name + '=')) {
                    return decodeURIComponent(c.substring(name.length + 1));
                }
            }
        }
        return null;
    }
}
*/
function trackEvent(action, label, value) {
    var values = ['_trackEvent', category, action];
    if (label) {
        values.push(label);
    }
    if (typeof value != 'undefined') {
        values.push(value);
    }
    if (action == 'FinishGame') {
        window.finished = true;
    }
    if (typeof window.ga != "undefined") {
        log(values.join(' - '));
        ga('send', 'event', category, action, label, value);
    } else {
        log(values.join(' - '));
    }
}
window.img = {
    'bottom-player': 0,
    'left-player': 1,
    'top-player': 2,
    'right-player': 3
};
/*(function() {
    var savedImage = parseInt(cake('player-image'));
    if (savedImage && savedImage > 3 && savedImage <= 13) {
        img['bottom-player'] = savedImage;
    }
})();*/
jQuery.fn.sprite = function(index, size) {
    var props = {
        width: size,
        height: size,
        'background-position': (-index * size) + 'px 0px'
    };
    return this.css(props);
};
$A = function $A(arr) {
    return {
        arr: arr,
        each: function(func) {
            for (var i = 0; i < this.arr.length; i++) {
                func.call(this.arr, this.arr[i]);
            }
        },
        any: function(func) {
            for (var i = 0; i < this.arr.length; i++) {
                if (func.call(this.arr, this.arr[i])) {
                    return true;
                }
            }
            return false;
        },
        max: function(func) {
            var max = null;
            for (var i = 0; i < this.arr.length; i++) {
                var val = func.call(this.arr, this.arr[i])
                if (max === null) {
                    max = val;
                } else if (val >= max) {
                    max = val;
                }
            }
            return max;
        },
        shuffle: function() {
            var i = this.arr.length;
            if (i == 0) return;
            while (--i) {
                var j = Math.floor(Math.random() * (i + 1));
                var tempi = this.arr[i];
                var tempj = this.arr[j];
                this.arr[i] = tempj;
                this.arr[j] = tempi;
            }
        },
        random: function() {
            return this.arr[Math.floor(Math.random() * this.arr.length)];
        },
        where: function(func) {
            var result = [];
            for (var i = 0; i < this.arr.length; i++) {
                var obj = this.arr[i];
                if (func(obj)) {
                    result.push(obj);
                }
            }
            return result;
        },
        count: function(func) {
            var counter = 0;
            for (var i = 0; i < this.arr.length; i++) {
                if (func.call(this.arr, this.arr[i])) {
                    counter++;
                }
            }
            return counter;
        },
        all: function(func) {
            for (var i = 0; i < this.arr.length; i++) {
                if (!func.call(this.arr, this.arr[i])) {
                    return false;
                }
            }
            return true;
        },
        remove: function(item) {
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i] == item) {
                    this.arr.splice(i, 1);
                    return true;
                }
            }
            return false;
        },
        last: function() {
            if (!this.arr.length) {
                return null;
            }
            return this.arr[this.arr.length - 1];
        },
        indexOf: function(item) {
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i] == item) {
                    return i;
                }
            }
            return -1;
        },
        contains: function(item) {
            return this.indexOf(item) != -1;
        },
        map: function(f) {
            var result = [];
            for (var i = 0; i < this.arr.length; i++) {
                result.push(f(this.arr[i]));
            }
            return result;
        }
    };
}
try {
    if (typeof document.body.style.textShadow == 'undefined') {
        $(document.body).addClass('notextshadow');
    }
    if (typeof document.body.style.boxShadow == 'undefined') {
        $(document.body).addClass('noboxshadow');
    }
} catch (e) {}

function message(text) {
    $('#messageBox p').html(text);
}

function reloadPage() {
    var url = window.location.href.replace(/#.*/, '');
    window.location.href = url;
}
var hash = location.hash || '';
if (hash.match(/^#e=.+/)) {
    $.getScript('https://jserrorlog.appspot.com/js/errorlog.js');
} else {
    window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
        trackEvent('Error', errorMsg, lineNumber);
    };
}

function setCustomVar(slot, name, value, scope) {
    if (typeof window._gaq != "undefined") {
        _gaq.push(['_setCustomVar', slot, name, value, scope]);
    }
}
if (document.referrer && document.referrer.length) {
    if (document.location.href.substr(0, 25) != document.referrer.substr(0, 25)) {
        if (window.category && window.category != 'Hearts') {
            trackEvent('Referral', document.referrer);
        }
    }
}

function setupPlayerPicker() {
    var maxIndex = 13;
    $('#open-player-picker').click(function() {
        $('#messageBox').hide();
        $('#player-picker').sprite(img['bottom-player'], 120);
        $('#change-player').css('zIndex', 5000).show();
    });
    $('#next-image').click(function() {
        img['bottom-player'] = (img['bottom-player'] + 1) % maxIndex;
        if (img['bottom-player'] == 1 || img['bottom-player'] == 2 || img['bottom-player'] == 3) {
            img['bottom-player'] = 4;
        }
        $('#player-picker').sprite(img['bottom-player'], 120);
    });
    $('#prev-image').click(function() {
        img['bottom-player']--;
        if (img['bottom-player'] == -1) {
            img['bottom-player'] = maxIndex;
        }
        if (img['bottom-player'] == 1 || img['bottom-player'] == 2 || img['bottom-player'] == 3) {
            img['bottom-player'] = 0;
        }
        $('#player-picker').sprite(img['bottom-player'], 120);
    });
    $('#save-image').click(function() {
        $('#bottom-player div').sprite(img['bottom-player'], 50);
        $('#change-player').hide();
        $('#bottom-player-win').sprite(img['bottom-player'], 120);
        $('#messageBox').show();
        trackEvent('ChangePlayer', '' + img['bottom-player']);
        //cake('player-image', img['bottom-player'], 365);
    });
}

function makePlayersSad(winnerIds) {
    var ids = ['top-player', 'bottom-player', 'left-player', 'right-player'];
    for (var i = 0; i < ids.length; i++) {
        if ($A(winnerIds).indexOf(ids[i]) == -1) {
            makePlayerSad(ids[i]);
        } else {
            makePlayerHappy(ids[i]);
        }
    }
}

function makePlayerSad(id) {
    $('#' + id + ' div').css('background-image', 'url(img/players-sad.png)');
}

function makePlayerHappy(id) {
    $('#' + id + ' div').css('background-image', 'url(img/players.png)');
}

function createScreenshot() {
    var container = $('<div>').css({
        position: 'absolute',
        top: '0px',
        width: '100%',
        id: 'screenshot-container'
    }).appendTo('body')
    var region = $('<div>').css({
        width: '1280px',
        height: '800px',
        top: '0px',
        margin: 'auto',
        border: 'solid 1px red'
    }).appendTo(container);
}
__addCheat = (function() {
    var cheatCode = '';
    var cheats = {};
    var lastTime = 0;
    $(window).keypress(function(e) {
        var now = new Date().getTime();
        if (now - lastTime > 2000) {
            cheatCode = '';
        }
        lastTime = now;
        var newChar = String.fromCharCode(e.which);
        cheatCode += newChar;
        for (var code in cheats) {
            if (code == cheatCode) {
                cheats[code]();
                cheatCode = '';
                return;
            }
            if (code.substr(0, cheatCode.length) == cheatCode) {
                return;
            }
        }
        for (var code in cheats) {
            if (code.substr(0, 1) == newChar) {
                cheatCode = newChar;
                return;
            }
        }
        cheatCode = '';
    });
    return function(code, func) {
        cheats[code] = func;
    };
})();
$(function() {
    if ((location.search || '').match(/screenshot/)) {
        createScreenshot();
    }
    $('#bottom-player div').sprite(img['bottom-player'], 50);
    for (var key in img) {
        $('#' + key + '-win').sprite(img[key], 120);
    }
    if ($('#bottom-player').length > 0) {
        setTimeout(function() {
            var img = new Image();
            img.src = 'img/players-sad.png';
        }, 5000);
    }
    setupPlayerPicker();
    $('.avatar').click(function() {
        trackEvent('ClickPlayer', $(this).attr('id'));
    });
    $('#options-page button').click(function() {
        $('#options-page').hide();
    });
    $('a[href="#options"]').click(function(ev) {
        ev.preventDefault();
        $('#options-page').show();
    });
    $('a[href="#newgame"]').click(function(ev) {
        ev.preventDefault();
        if (!window.started || window.finished) {
            trackEvent('NewGame', 'Finished');
            reloadPage();
        } else if (confirm('You have a game in progress. Are you sure you want to start a new game and abandon the current game?')) {
            trackEvent('NewGame', 'Abandoned');
            /*if (cake('results')) {
                cake('results', '');
            }*/
            reloadPage();
        }
        ev.stopPropagation();
        ev.preventDefault();
        return false;
    });
    window.startTime = new Date().getTime();
    window.onbeforeunload = function() {
        var seconds = (new Date().getTime() - window.startTime) / 1000;
        trackEvent('LeavePage', window.finished ? 'Finished' : 'Abandoned', seconds);
    };
});
(function() {
    var ls = window.localStorage;
    var gameStartTime = null;
    var gameFinishTime = null;

    function emptyStats() {
        return {
            version: 4,
            startTime: new Date().getTime(),
            gameCount: 0,
            abandonedGameCount: 0,
            finishedGameCount: 0,
            playersInGameCount: {},
            totalGameTime: 0,
            averageGameTime: null,
            maxGameTime: null,
            minGameTime: null,
            players: {}
        };
    }
    var key = 'stats2';
    if (typeof category !== 'undefined') {
        key += '_' + category.toLowerCase().replace(/ /g, '');
    }

    function getStats() {
        var data = ls.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        var s = emptyStats();
        putStats(s);
        return s;
    }

    function putStats(stats) {
        ls.setItem(key, JSON.stringify(stats));
    }

    function modify(func) {
        var s = getStats();
        func(s);
        putStats(s);
    }

    function emptyPlayer() {
        return {
            gameCount: 0,
            abandonedGameCount: 0,
            finishedGameCount: 0,
            winCount: 0,
            loseCount: 0,
            drawCount: 0,
            winPercentage: 0,
            totalScore: 0,
            maxScore: null,
            minScore: null,
            avgScore: 0,
            winningStreak: 0,
            losingStreak: 0,
            maxWinningStreak: 0,
            maxLosingStreak: 0,
            finishedTournamentCount: 0,
            winTournamentCount: 0,
            loseTournamentCount: 0,
            totalTournamentScore: 0,
            avgTournamentScore: 0,
            tournamentWinPercentage: 0,
            tournamentWinningStreak: 0,
            tournamentLosingStreak: 0,
            tournamentMaxWinningStreak: 0,
            tournamentMaxLosingStreak: 0
        };
    }
    window.stats = {
        get: getStats,
        clear: function() {
            if (!this.enabled) {
                return;
            }
            ls.removeItem(key);
        },
        emptyPlayer: emptyPlayer,
        minimumVersion: function(version) {
            if (!this.enabled) {
                return;
            }
            var s = this.get();
            if (s && s.version < version) {
                this.clear();
            }
        },
        startGame: function(players) {
            if (!this.enabled) {
                return;
            }
            gameStartTime = new Date().getTime();
            modify(function(s) {
                s.playersInGameCount[players.length] = (s.playersInGameCount[players.length] || 0) + 1;
                s.gameCount++;
                s.abandonedGameCount++;
                for (var i = 0; i < players.length; i++) {
                    var p = players[i];
                    if (!s.players[p.name]) {
                        s.players[p.name] = emptyPlayer();
                    }
                    var pstats = s.players[p.name];
                    pstats.gameCount++;
                    pstats.abandonedGameCount++;
                }
            });
        },
        finishGame: function(players, timeSpent) {
            if (!this.enabled) {
                return;
            }
            modify(function(s) {
                if (!timeSpent) {
                    gameFinishTime = new Date().getTime();
                    timeSpent = gameFinishTime - gameStartTime;
                }
                s.finishedGameCount++;
                s.abandonedGameCount = Math.max(s.abandonedGameCount - 1, 0);
                s.totalGameTime += timeSpent;
                s.averageGameTime = s.totalGameTime / s.finishedGameCount;
                s.maxGameTime = s.maxGameTime === null ? timeSpent : Math.max(timeSpent, s.maxGameTime);
                s.minGameTime = s.minGameTime === null ? timeSpent : Math.min(timeSpent, s.minGameTime);
                for (var i = 0; i < players.length; i++) {
                    var p = players[i];
                    var pstats = s.players[p.name];
                    if (!pstats) {
                        s.players[p.name] = emptyPlayer();
                        pstats = s.players[p.name];
                        pstats.abandonedGameCount++;
                        pstats.gameCount++;
                    }
                    p.stats = p.stats || {};
                    p.stats.score |= 0;
                    pstats.abandonedGameCount = Math.max(pstats.abandonedGameCount - 1, 0);
                    pstats.finishedGameCount++;
                    pstats.totalScore += p.stats.score;
                    pstats.minScore = pstats.minScore === null ? p.stats.score : Math.min(pstats.minScore, p.stats.score);
                    pstats.maxScore = pstats.maxScore === null ? p.stats.score : Math.max(pstats.maxScore, p.stats.score);
                    pstats.avgScore = pstats.totalScore / pstats.finishedGameCount;
                    if (p.stats.result == 'win') {
                        pstats.winCount++;
                        pstats.winningStreak++;
                        pstats.losingStreak = 0;
                        pstats.maxWinningStreak = Math.max(pstats.maxWinningStreak, pstats.winningStreak);
                    } else if (p.stats.result == 'lose') {
                        pstats.loseCount++;
                        pstats.winningStreak = 0;
                        pstats.losingStreak++;
                        pstats.maxLosingStreak = Math.max(pstats.maxLosingStreak, pstats.losingStreak);
                    } else if (p.stats.result == 'draw') {
                        pstats.drawCount++;
                        pstats.winningStreak = 0;
                        pstats.losingStreak = 0;
                    }
                    pstats.winPercentage = pstats.winCount / pstats.finishedGameCount;
                    if (p.stats.tournamentResult) {
                        pstats.finishedTournamentCount++;
                        pstats.totalTournamentScore += p.stats.tournamentScore;
                        pstats.avgTournamentScore = pstats.totalTournamentScore / pstats.finishedTournamentCount;
                        if (p.stats.tournamentResult == 'win') {
                            pstats.winTournamentCount++;
                            pstats.tournamentWinningStreak++;
                            pstats.tournamentLosingStreak = 0;
                            pstats.tournamentMaxWinningStreak = Math.max(pstats.tournamentMaxWinningStreak, pstats.tournamentWinningStreak);
                        } else if (p.stats.tournamentResult == 'lose') {
                            pstats.loseTournamentCount++;
                            pstats.tournamentLosingStreak++;
                            pstats.tournamentWinningStreak = 0;
                            pstats.tournamentMaxLosingStreak = Math.max(pstats.tournamentMaxLosingStreak, pstats.tournamentLosingStreak);
                        }
                        pstats.tournamentWinPercentage = pstats.winTournamentCount / pstats.finishedTournamentCount;
                    }
                    for (var k in p.stats) {
                        if (k.match(/^(score|result|tournamentResult|tournamentScore)$/)) {
                            continue;
                        }
                        var value = p.stats[k];
                        if (typeof value == 'number') {
                            if (k.match(/maximum/)) {
                                if (typeof pstats[k] == 'undefined' || value > pstats[k]) {
                                    pstats[k] = value;
                                }
                            } else if (k.match(/minimum/)) {
                                if (typeof pstats[k] == 'undefined' || value < pstats[k]) {
                                    pstats[k] = value;
                                }
                            } else {
                                pstats[k] |= 0;
                                pstats[k] += p.stats[k];
                            }
                        }
                    }
                }
            });
        },
        isGameActive: function() {
            return gameStartTime !== null && gameFinishTime === null;
        }
    };
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        JSON.parse('{"test":"test"}');
        JSON.stringify({
            "test": "test"
        });
        stats.supported = true;
        return true;
    } catch (e) {
        stats.supported = false;
    }
    if (!stats.supported) {
        for (var k in stats) {
            if (k != 'supported') {
                stats[k] = function() {};
            }
        }
    }
})();
if (stats.supported) {
    $('.stats-link').show();
}
Card = function Card(suit, rank) {
    this.init(suit, rank);
}
Card.prototype = {
    playable: false,
    init: function(suit, rank) {
        this.shortName = suit + rank;
        this.suit = suit;
        this.rank = rank;
        if (suit == 'bj') {
            this.longName = 'black joker';
            this.shortName = 'BJ';
            return;
        } else if (suit == 'rj') {
            this.longName = 'red joker';
            this.shortName = 'RJ';
            return;
        }
        this.red = suit == 'h' || suit == 'd';
        this.black = suit == 's' || suit == 'c';
        var sorts = {
            "h": 'heart',
            "s": 'spade',
            "d": 'diamond',
            "c": 'club'
        };
        var specialCards = {
            11: '3/150',
            12: '30/63',
            13: '10/18',
            1: '30/12',
            14: '30/12'
        }
        this.suitName = sorts[this.suit];
        if (specialCards[rank]) {
            this.longName = specialCards[rank] + ' of ' + sorts[suit] + 's';
            this[specialCards[rank]] = true;
        } else {
            this.longName = rank + ' of ' + sorts[suit] + 's';
        }
        this.shortName = this.suit.toUpperCase() + this.rank;
    },
    toString: function() {
        return this.shortName;
    },
    rankName: function() {
        var names = [null, null, '12/20', '10/15', '3/18', '27/54', '6/30', '9/27', '12/14', '4/40', '18/24', '3/150', '30/63', '10/18', '30/12'];
        return names[this.rank];
    },
    shortRankName: function() {
        var names = [null, null, '12/20', '10/15', '3/18', '27/54', '6/30', '9/27', '12/14', '4/40', '18/24', '3/150', '30/63', '10/18', '30/12'];
        return names[this.rank];
    },
    sign: function() {
        var ranks = ['', '30/12', '12/20', '10/15', '3/18', '27/54', '6/30', '9/27', '12/14', '4/40', '18/24', '3/150', '30/63', '10/18', '30/12'];
        var suits = {
            h: '&hearts;',
            s: '&spades;',
            d: '&diams;',
            c: '&clubs;'
        };
        var colors = {
            h: 'red',
            d: 'red',
            s: 'black',
            c: 'black'
        };
        var str = '<span style="color:' + colors[this.suit] + ';">' + suits[this.suit] + ranks[this.rank] + '</span>';
        return str;
    },
    override: function(obj) {
        for (var x in obj) {
            this[x] = obj[x];
        }
    }
};
cson = function cson(o) {
    if (typeof JSON == 'undefined') {
        return 'JSON Not Available';
    }

    function _(o) {
        var str = Object.prototype.toString;
        if (typeof JSON == 'undefined') {
            return 'JSON Not Available';
        } else if (o == null || typeof o == 'undefined') {
            return o;
        } else if (o.name || o.shortName) {
            return o.name || o.shortName;
        } else if (str.call(o) == '[object Array]') {
            var clone = [];
            for (var i = 0; i < o.length; i++) {
                clone.push(_(o[i]));
            }
            return clone;
        } else if (str.call(o) == '[object Object]') {
            var clone = {};
            for (var k in o) {
                clone[k] = _(o[k]);
            }
            return clone;
        } else {
            return o;
        }
    }
    var jsonResult = JSON.stringify(_(o), null, 2);
    return jsonResult.replace(/\s*"([HSDC]\d\d?)"\s*(\]|,)/gm, '$1$2').replace(/"([HSDC]\d\d?)"/gm, '$1');
}
CardGame = function CardGame() {
    this.initDefaults();
}
CardGame.prototype = {
    cardCount: 8,
    enableRendering: true,
    defaultPlayerCount: 2,
    canChangePlayerCount: false,
    useBlackJoker: false,
    useRedJoker: false,
    acesHigh: true,
    mayAlwaysDraw: false,
    makeRenderFunc: function(format) {
        return function(e) {
            with(e) {
                var msg = eval(format.replace(/@(\w+(\.\w+)*)/g, "'+$1+'").replace(/(.*)/, "'$1'"));
                console.log(msg);
            }
            setTimeout(e.callback, 0);
        };
    },
    initDefaults: function() {
        this.renderers = {};
        this.renderers['deckready'] = this.makeRenderFunc('deckready');
        this.renderers['dealcard'] = this.makeRenderFunc('dealcard - @card - @player.name - hand: @player.hand');
        this.renderers['selectcard'] = this.makeRenderFunc('selectcard - @card - @player.name');
        this.renderers['unselectcard'] = this.makeRenderFunc('unselectcard - @card - @player.name');;
        this.renderers['start'] = this.makeRenderFunc('start');
        this.renderers['playerturn'] = this.makeRenderFunc('playerturn - @player.name');
        this.renderers['play'] = this.makeRenderFunc('play - @player.name played @cards - hand: @player.hand');
        this.renderers['draw'] = this.makeRenderFunc('draw - @card - @player.name');
        this.renderers['pass'] = this.makeRenderFunc('pass - @player.name');
        this.renderers['win'] = this.makeRenderFunc('win - @player.name');
        this.renderers['sorthand'] = this.makeRenderFunc('sorthand - @player.name - @player.hand');
        this.renderers['pickdealer'] = this.makeRenderFunc('pickdealer - @player.name');
        this.players = [];
    },
    message: function(msg) {},
    renderEvent: function(name, callback, eventData) {
        if (!eventData) {
            eventData = {};
        }
        if (!eventData.player) {
            eventData.player = this.currentPlayer();
        }
        eventData.name = name;
        eventData.game = this;
        var game = this;
        eventData.callback = function() {
            callback.call(game);
        };
        if (this.enableRendering) {
            this.renderers[name](eventData);
        } else {
            eventData.callback();
        }
    },
    setEventRenderer: function(eventName, func) {
        this.renderers[eventName] = func;
    },
    getPlayableCards: function(player) {
        var playableCards = [];
        $A(player.hand).each(function(c) {
            if (c.playable) {
                playableCards.push(c);
            }
        });
        return playableCards;
    },
    addTestScenario: function(name, cards) {
        this.tests[name] = cards;
    },
    players: null,
    tests: {},
    deck: null,
    pile: null,
    currentPlayerIndex: 0,
    playCards: function(player, cards) {
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            if (!this.canPlayCard(player, card)) {
                throw 'Illegal card from ' + player.name + ', ' + card;
            }
            this.pile.push(card);
            card.selected = false;
            if (!player.remove(card)) {
                throw 'Card ' + card + ' is not held by player ' + player.name;
            }
        }
        player.selectedCards = [];
        player.canPlay = false;
        this.renderEvent('play', this.afterPlayCards, {
            cards: cards
        });
    },
    afterPlayCards: function() {
        this.nextPlayerTurn();
    },
    selectCard: function(player, card, callback) {
        if (!player.hasCard(card)) {
            throw "Player can't select a card he doesn't hold!";
        }
        if (card.selected) {
            throw 'Card is already selected!';
        }
        if (player.selectedCards === this.undefined) {
            player.selectedCards = [];
        }
        card.selected = true;
        player.selectedCards.push(card);
        this.renderEvent('selectcard', callback || function() {}, {
            card: card,
            player: player
        });
    },
    unselectCard: function(player, card, callback) {
        if (!player.hasCard(card)) {
            throw "Player can't unselect a card he doesn't hold!";
        }
        if (!card.selected) {
            throw 'Card is not selected!';
        }
        card.selected = false;
        $A(player.selectedCards).remove(card);
        this.renderEvent('unselectcard', callback || function() {}, {
            card: card,
            player: player
        });
    },
    sortHand: function(player, callback, dontRender) {
        if (!player.hand) {
            return;
        }
        var diff = function(a, b) {
            if (player.handSorted == 'ASC') {
                return b - a;
            }
            return a - b;
        }
        if (this.sortType == 'suit') {
            player.hand.sort(function(c1, c2) {
                var suits = {
                    "h": 0,
                    "s": 1,
                    "d": 2,
                    "c": 3
                };
                if (c1.suit == c2.suit) {
                    return diff(c1.rank, c2.rank);
                }
                return diff(suits[c1.suit], suits[c2.suit]);
            });
        } else if (this.sortType == 'rank') {
            player.hand.sort(function(c1, c2) {
                var suits = {
                    "h": 0,
                    "s": 1,
                    "d": 2,
                    "c": 3
                };
                if (c1.rank == c2.rank) {
                    return diff(suits[c1.suit], suits[c2.suit]);
                }
                return diff(c1.rank, c2.rank);
            });
        }
        player.handSorted = (player.handSorted == 'ASC') ? 'DESC' : 'ASC';
        if (!dontRender) {
            this.renderEvent('sorthand', callback || function() {}, {
                player: player
            });
        }
    },
    drawCard: function(player) {
        player.hand.push(this.deck.pop());
        player.handSorted = false;
        player.canPlay = false;
        this.renderEvent('draw', this.playerPlay, {
            card: $A(player.hand).last(),
            cardpos: player.hand.length - 1
        });
    },
    currentPlayerTurn: function() {
        this.beforePlayerTurn(this.currentPlayer());
        this.renderEvent('playerturn', this.playerPlay);
    },
    playerDraw: function(player) {
        player.draw();
    },
    playerPlay: function() {
        var p = this.currentPlayer();
        var playable = [];
        for (var i = 0; i < p.hand.length; i++) {
            var card = p.hand[i];
            card.playable = this.canPlayCard(p, card);
            if (card.playable) {
                playable.push(card);
            }
        }
        p.canPlay = true;
        p.hasPlayableCards = playable.length > 0;
        if (playable.length == 0) {
            if (this.mustSayPass(p)) {
                this.renderEvent('pass', this.nextPlayerTurn);
            } else if (this.mustDraw(p)) {
                this.playerDraw(p);
            } else {
                throw 'Game must implement mustSayPass or mustDraw correctly';
            }
        } else {
            this.currentPlayer().play(playable);
        }
    },
    nextPlayerTurn: function() {
        var player = this.currentPlayer();
        if (this.hasWon(player)) {
            this.message(player.name + ' wins!');
            this.renderEvent('win', function() {});
        } else {
            this.currentPlayerIndex = this.pickNextPlayerIndex();
            if (this.isNewRoundStarting()) {
                this.round++;
            }
            this.currentPlayerTurn();
        }
    },
    addPlayer: function(player) {
        player.game = this;
        player.pos = this.players.length;
        this.players.push(player);
    },
    getNextPlayer: function(player) {
        var pos = $A(this.players).indexOf(player);
        return this.players[this.nextIndex(pos)];
    },
    start: function() {
        this.pile = [];
        this.round = 0;
        this.newDeck();
    },
   /* pickDealer: function(playerIds) {
        if (this.lastDealerIndex >= 0) {
            this.dealerIndex = (this.lastDealerIndex + 1) % playerIds.length;
        } else {
            this.dealerIndex = Math.floor(Math.random() * playerIds.length);
        }
        this.nextPlayerToDealTo = (this.dealerIndex + 1) % playerIds.length;
        this.renderEvent('pickdealer', function() {}, {
            dealerId: playerIds[this.dealerIndex]
        });
    },*/
    afterDealing: function() {
        this.currentPlayerIndex = this.pickFirstPlayerIndex();
        this.renderEvent('start', this.currentPlayerTurn);
    },
    checkForTestScenario: function() {
        if (!this.currentTest || !this.tests[this.currentTest]) {
            return;
        }
        var test = this.tests[this.currentTest];
        var playerIndex = this.nextPlayerToDealTo;
        var firstPlayerIndex = playerIndex;
        var deckIndex = 51;
        var handIndex = 0;
        var guiCards = $A(this.deck).map(function(c) {
            return c.guiCard;
        });
        var existing = {};
        for (var i = 0; i < test.length; i++) {
            var h = test[i];
            for (var j = 0; j < h.length; j++) {
                var c = h[j];
                if (existing[c]) {
                    alert(c + ' is in two hands, bad scenario');
                } else {
                    existing[c] = 1;
                }
            }
        }
        while (true) {
            var cardName = test[playerIndex][handIndex];
            if (!cardName) {
                break;
            }
            var foundIndex = this.findDeckIndex(cardName);
            var foundCard = this.deck[foundIndex];
            this.deck[foundIndex] = this.deck[deckIndex];
            this.deck[deckIndex] = foundCard;
            deckIndex--;
            playerIndex = this.nextIndex(playerIndex);
            if (playerIndex == firstPlayerIndex) {
                handIndex++;
            }
        }
        for (var i = 0; i < this.deck.length; i++) {
            this.deck[i].guiCard = guiCards[i];
            this.deck[i].guiCard.card = this.deck[i];
        }
        this.currentTest = null;
    },
    findDeckIndex: function(cardName) {
        for (var i = 0; i < this.deck.length; i++) {
            var card = this.deck[i];
            if (card.shortName == cardName) {
                return i;
            }
        }
        alert()
        return -1;
    },
    currentPlayer: function() {
        return this.players[this.currentPlayerIndex];
    },
    newDeck: function() {
        this.deck = [];
        var start = this.acesHigh ? 2 : 1;
        var end = start + 12;
        for (var i = start; i <= end; i++) {
            this.deck.push(new Card('h', i));
            this.deck.push(new Card('s', i));
            this.deck.push(new Card('d', i));
            this.deck.push(new Card('c', i));
        }
        if (this.useBlackJoker) {
            this.deck.push(new Card('bj', 0));
        }
        if (this.useRedJoker) {
            this.deck.push(new Card('rj', 0));
        }
        this.shuffle(this.deck);
        this.renderEvent('deckready', function() {});
    },
    shuffle: function(deck) {
        var count = Math.ceil(Math.random() * 7);
        for (var c = 0; c < count; c++) {
            var i = deck.length;
            if (i == 0) return;
            while (--i) {
                var j = Math.floor(Math.random() * (i + 1));
                var tempi = deck[i];
                var tempj = deck[j];
                deck[i] = tempj;
                deck[j] = tempi;
            }
        }
    },
    dealtCardCount: 0,
    nextPlayerToDealTo: 0,
    dealerIndex: -1,
    lastDealerIndex: -1,
    deal: function() {
        this.checkForTestScenario();
        if (this.dealtCardCount == this.cardCount * this.players.length) {
            this.afterDealing();
        } else {
            var card = this.deck.pop();
            var player = this.players[this.nextPlayerToDealTo];
            player.hand.push(card);
            this.nextPlayerToDealTo = this.nextIndex(this.nextPlayerToDealTo);
            this.dealtCardCount++;
            this.renderEvent('dealcard', this.deal, {
                player: player,
                cardpos: player.hand.length - 1,
                card: card
            });
        }
    },
    create: function(realGame) {
        for (var i in this) {
            if (typeof realGame[i] === 'undefined') {
                realGame[i] = this[i];
            }
        }
        realGame.base = this;
    },
    pickFirstPlayerIndex: function() {
        return this.nextIndex(this.dealerIndex);
    },
    hasWon: function(player) {
        return false;
    },
    beforePlayerTurn: function(player) {},
    canPlayCard: function(player, card) {
        return true;
    },
    canSelectCard: function(player, card) {
        return true;
    },
    mustSayPass: function(player) {
        return false;
    },
    mustDraw: function(player) {
        return false;
    },
    nextIndex: function(index) {
        return (index + 1) % this.players.length;
    },
    pickNextPlayerIndex: function() {
        return this.nextIndex(this.currentPlayerIndex);
    },
    isNewRoundStarting: function() {
        return this.currentPlayerIndex == 0;
    }
}
if (typeof setTimeout == 'undefined') {
    setTimeout = function(func, ms) {
        func();
    };
}

function GoFish() {
    CardGame.prototype.create(this);
    this.init();
}
GoFish.prototype = {
    cardCount: 5,
    sortType: 'rank',
    canSelectCards: false,
    defaultPlayerCount: 4,
    canChangePlayerCount: true,
    state: -1,
    init: function() {
        this.initDefaults();
        this.renderers['ask'] = this.makeRenderFunc('ask - @asker.name asks @askee.name for @rank');
        this.renderers['playerturn'] = this.makeRenderFunc('playerturn - @player.name - @player.hand');
        this.renderers['playerfinished'] = this.makeRenderFunc('playerfinished - @player.name is out of the game with @player.tricks.length tricks');
        this.renderers['taketrick'] = this.makeRenderFunc('taketrick - @player.name takes trick: @trick');
        this.renderers['givecards'] = this.makeRenderFunc('givecards - @askee.name gives @cards to @asker.name');
        this.renderers['gofish'] = this.makeRenderFunc('gofish - @askee.name tells @asker.name to go pick a card for @rank');
        this.renderers['drawrightcard'] = this.makeRenderFunc('drawrightcard - @asker.name drew a @drawcard');
        this.renderers['drawwrongcard'] = this.makeRenderFunc('drawwrongcard - @asker.name drew a @drawcard');
        this.renderers['drawcard'] = this.makeRenderFunc('drawcard - @player.name drew @card from the deck');
        this.renderers['win'] = this.makeRenderFunc('win - @winners');
    },
    ask: function(asker, askee, rank) {
        if (asker != this.currentPlayer()) {
            throw 'It is not ' + asker.name + 's turn to ask';
        }
        this.current = {
            asker: asker,
            askee: askee,
            rank: rank
        };
        if (asker.name == 'You') {
            this.message('You ask ' + askee.name + ' for ' + this.pluralnames[rank] + '.');
        } else if (askee.name == 'You') {
            this.message(asker.name + ' asks you for ' + this.pluralnames[rank] + '.');
        } else {
            this.message(asker.name + ' asks ' + askee.name + ' for ' + this.pluralnames[rank] + '.');
        }
        this.renderEvent('ask', function() {
            askee.requestRank(asker, rank);
        }, this.current);
    },
    giveCards: function(askee, asker, cards) {
        if (!cards) throw 'giving empty cards';
        this.current.cards = cards;
        $A(cards).each(function(c) {
            if (!$A(askee.hand).remove(c)) {
                throw askee + ' doesnt have card ' + c;
            }
            asker.hand.push(c);
        });
        $A(this.players).each(function(p) {
            p.notifyGiveCards(asker, askee, cards);
        });
        if (asker.isHuman && asker.sortHand) {
            asker.sortHand();
        }
        var cardString = this.names[cards[0].rank];
        if (cards.length == 2) {
            cardString = 'two ' + this.pluralnames[cards[0].rank];
        } else if (cards.length == 3) {
            cardString = 'three ' + this.pluralnames[cards[0].rank];
        }
        if (askee.name == 'You') {
            this.message('You give ' + asker.name + ' ' + cardString + '.');
        } else if (asker.name == 'You') {
            this.message(askee.name + ' gives you ' + cardString + '.');
        } else {
            this.message(askee.name + ' gives ' + asker.name + ' ' + cardString + '.');
        }
        this.renderEvent('givecards', this.playerTurn, this.current);
    },
    checkForTrick: function(callback) {
        var player = this.currentPlayer();
        var trick;
        var counter = {};
        for (var i = 0; i < player.hand.length; i++) {
            var card = player.hand[i];
            if (!counter[card.rank]) {
                counter[card.rank] = [];
            }
            counter[card.rank].push(card);
            if (counter[card.rank].length == 4) {
                trick = counter[card.rank];
                break;
            }
        }
        if (trick) {
            $A(trick).each(function(c) {
                $A(player.hand).remove(c);
            });
            if (!player.tricks) {
                player.tricks = [];
            }
            player.tricks.push(trick);
            this.current.trick = trick;
            $A(this.players).each(function(p) {
                p.notifyTakeTrick(player, trick[0].rank);
            });
            if (player.name == 'You') {
                this.message('You take a trick of ' + this.pluralnames[trick[0].rank] + '.');
            } else {
                this.message(player.name + ' takes a trick of ' + this.pluralnames[trick[0].rank] + '.');
            }
            this.renderEvent('taketrick', function() {
                if ($A(this.players).all(function(p) {
                        return p.hand.length == 0;
                    }) && this.deck.length == 0) {
                    var game = this;
                    var winners = $A(this.players).where(function(p) {
                        return p.tricks.length == $A(game.players).max(function(p) {
                            return p.tricks.length;
                        });
                    });
                    if (winners.length == 1) {
                        this.message(winners[0].name + ' wins the game!');
                    } else if (winners.length == 2) {
                        this.message(winners[0].name + ' and ' + winners[1].name + ' win the game!');
                    } else if (winners.length == 3) {
                        this.message(winners[0].name + ', ' + winners[1].name + ' and ' + winners[2].name + ' win the game!');
                    }
                    this.renderEvent('win', function() {}, {
                        "winners": winners
                    });
                } else {
                    callback.call(this);
                }
            }, this.current);
        } else {
            callback.call(this);
        }
    },
    checkForTrickAfterFishing: function() {
        this.checkForTrick(this.checkPlayerDrawAfterWrongCard);
    },
    checkForTrickStartOfTurn: function() {
        this.checkForTrick(this.checkOpponentDraw);
    },
    checkOpponentDraw: function() {
        var player = this.currentPlayer();
        var op = $A(this.players).where(function(p) {
            return p !== player && p.hand.length == 0;
        })[0];
        if (op && this.deck.length > 0) {
            if (op.name == 'You') {
                this.message('You have no cards left. Please draw ' + Math.min(this.cardCount, this.deck.length) + ' cards from the pile.');
            } else {
                this.message(op.name + ' has no cards left and must draw new cards from the pile.');
            }
            this.drawingOpponent = op;
            this.opponentDraw();
        } else {
            this.checkPlayerDraw();
        }
    },
    opponentDraw: function() {
        var op = this.drawingOpponent;
        if (this.deck.length == 0 || op.hand.length == this.cardCount) {
            this.drawingOpponent = null;
            this.checkPlayerDraw();
        } else {
            if (op.name == 'You' && op.hand.length > 0) {
                this.message('Please draw ' + Math.min(this.deck.length, (this.cardCount - op.hand.length)) + ' more cards from the pile.');
            }
            op.draw();
        }
    },
    deal: function() {
        this.cardCount = 7 - (this.players.length - 2);
        this.base.deal.call(this);
    },
    afterDealing: function() {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].isHuman && this.players[i].sortHand) {
                this.sortHand(this.players[i]);
            }
        }
        this.currentPlayerIndex = this.pickFirstPlayerIndex();
        this.renderEvent('start', this.currentPlayerTurn);
    },
    playerDraw: function() {
        var p = this.currentPlayer();
        if (this.deck.length == 0 || p.hand.length == this.cardCount) {
            this.playerPlay();
        } else {
            p.draw();
        }
    },
    checkPlayerDraw: function() {
        var player = this.currentPlayer();
        if (player.hand.length == 0 && this.deck.length > 0) {
            this.playerDraw();
        } else {
            this.playerPlay();
        }
    },
    playerPlay: function() {
        var p = this.currentPlayer();
        if (p.hand.length == 0 && this.deck.length == 0) {
            this.renderEvent('playerfinished', this.nextPlayerTurn);
        } else {
            p.play();
        }
    },
    playerDrawAfterWrongCard: function() {
        var p = this.currentPlayer();
        if (this.deck.length == 0 || p.hand.length == this.cardCount) {
            this.drawingAfterFishing = false;
            this.checkForTrickAfterFishing();
        } else {
            this.drawingAfterFishing = true;
            p.draw();
        }
    },
    checkPlayerDrawAfterWrongCard: function() {
        var player = this.currentPlayer();
        if (player.hand.length == 0 && this.deck.length > 0) {
            this.playerDrawAfterWrongCard();
        } else {
            this.nextPlayerTurn();
        }
    },
    drawCard: function(player, card) {
        if (!$A(this.deck).remove(card)) {
            throw 'Card ' + card + ' is not in the deck!';
        }
        player.hand.push(card);
        if (this.drawingOpponent) {
            var callback = this.opponentDraw;
        } else if (this.drawingAfterFishing) {
            var callback = this.playerDrawAfterWrongCard;
        } else {
            var callback = this.playerDraw;
        }
        $A(this.players).each(function(p) {
            p.notifyDrawCard(player);
        });
        if (player.isHuman && player.sortHand) {
            player.sortHand();
        }
        this.renderEvent('drawcard', callback, {
            "player": player,
            "card": card
        });
    },
    nextPlayerTurn: function() {
        this.currentPlayerIndex = this.pickNextPlayerIndex();
        this.playerTurn();
    },
    playerTurn: function() {
        $A(this.players).each(function(p) {
            if (!p.tricks) {
                p.tricks = [];
            }
        });
        this.renderEvent('playerturn', this.checkForTrickStartOfTurn);
    },
    goFish: function(askee, asker) {
        if (askee.name == 'You') {
            this.message('You tell ' + asker.name + ' to pick a card!');
        } else if (asker.name == 'You') {
            this.message(askee.name + ' tells you to pick a card!');
        } else {
            this.message(askee.name + ' tells ' + asker.name + ' to pick a card!');
        }
        this.renderEvent('gofish', function() {
            if (this.deck.length == 0) {
                var me = this;
                setTimeout(function() {
                    me.nextPlayerTurn();
                }, 1500);
            } else {
                asker.goFish();
            }
        }, this.current);
    },
    names: {
        2: "12/20",
        3: "10/15",
        4: "3/18",
        5: "27/54",
        6: "6/30",
        7: "9/27",
        8: "12/14",
        9: "4/40",
        10: "18/24",
        11: "3/150",
        12: "30/63",
        13: "10/18",
        14: "30/12"
    },
    pluralnames: {
        2: "12/20's",
        3: "10/15's",
        4: "3/18's",
        5: "27/54's",
        6: "6/30's",
        7: "9/27's",
        8: "12/14's",
        9: "4/40's",
        10: "18/24's",
        11: "3/150's",
        12: "30/63's",
        13: "10/18's",
        14: "30/12's"
    },
    fish: function(player, card) {
        if (player !== this.current.asker) {
            throw player.name + ' is picking a card when it should be ' + this.current.asker.name;
        }
        if (!$A(this.deck).remove(card)) {
            throw card + ' is not available for picking a card';
        }
        player.hand.push(card);
        if (player.isHuman && player.sortHand) {
            player.sortHand();
        }
        this.current.drawcard = card;
        var curr = this.current;
        if (card.rank == this.current.rank) {
            $A(this.players).each(function(p) {
                p.notifyDrawRightCard(curr.asker, curr.askee, curr.rank);
            });
            if (player.name == 'You') {
                this.message('You picked a card and draw ' + this.names[this.current.rank] + '!!!');
            } else {
                this.message(player.name + ' picks a card and draws ' + this.names[this.current.rank] + '!!!');
            }
            this.renderEvent('drawrightcard', this.playerTurn, this.current);
        } else {
            $A(this.players).each(function(p) {
                p.notifyDrawWrongCard(curr.asker, curr.askee, curr.rank);
            });
            if (player.name == 'You') {
                this.message('You picked a card, but don\'t get ' + this.names[this.current.rank]);
            } else {
                this.message(player.name + ' picks a card, but doesn\'t get ' + this.names[this.current.rank]);
            }
            this.renderEvent('drawwrongcard', this.checkForTrickAfterFishing, this.current);
        }
    },
    toString: function() {
        return 'GoFish';
    }
};

function createGame() {
    return new GoFish();
}
ComputerPlayer = function ComputerPlayer(name) {
    this.init(name);
}
ComputerPlayer.prototype = {
    name: null,
    hand: null,
    isHuman: false,
    init: function(name) {
        this.name = name;
        this.hand = [];
        this.selectedCards = [];
        this.stats = {};
    },
    play: function(playable) {
        var randomCard = playable[Math.floor(Math.random() * playable.length)];
        var playCards = [randomCard];
        this.game.playCards(this, playCards);
    },
    draw: function() {
        this.game.drawCard(this);
    },
    extend: function(type) {
        this.base = {};
        for (var i in type) {
            if (this[i]) {
                this.base[i] = this[i];
            }
            this[i] = type[i];
        }
        if (type.hasOwnProperty('toString')) {
            this.toString = type.toString;
        }
    },
    toString: function() {
        var str = this.name;
        if (this.hand.length) {
            str += ' - HAND: ' + this.hand;
        }
        return str;
    },
    hasCard: function(card) {
        return $A(this.hand).contains(card);
    },
    remove: function(card) {
        return $A(this.hand).remove(card);
    }
};
var UNKNOWN = -1;
var FINISHED = -2;
ComputerPlayer.prototype.extend({
    thinkTime: 1000,
    lastMoves: [],
    play: function() {
        var cards = {};
        for (var i = 0; i < this.hand.length; i++) {
            var card = this.hand[i];
            if (!cards[card.rank]) {
                cards[card.rank] = 1;
            } else {
                cards[card.rank]++;
            }
        }
        var me = this;
        var others = $A(this.game.players).where(function(p) {
            return p !== me && p.hand.length > 0;
        });
        var moves = [];
        for (var i = 0; i < others.length; i++) {
            var op = others[i];
            var state = this.getPlayerInfo(op);
            var known = 0;
            for (var rank in state) {
                if (state[rank] > 0) {
                    known += state[rank];
                }
            }
            var unknown = op.hand.length - known;
            for (var rank in cards) {
                moves.push({
                    op: op,
                    rank: rank,
                    myCount: cards[rank],
                    theirCount: state[rank],
                    id: op.name + '-' + rank,
                    toString: function() {
                        return '<' + this.op.name + ': rank=' + this.rank + ',their=' + this.theirCount + ',my=' + this.myCount + '>';
                    }
                });
            }
        }
        $A(moves).each(function(m) {
            if (m.theirCount == 0) {
                m.impossible = true;
                m.goodness = -100;
            } else if (m.myCount + m.theirCount == 4) {
                m.goodness = 100;
                m.guaranteed = true;
            } else if (m.theirCount > 0) {
                m.goodness = 50 + m.theirCount + m.myCount;
                m.guaranteed = true;
            } else if (m.theirCount == UNKNOWN) {
                m.goodness = m.myCount + unknown;
                m.possible = true;
            } else {
                throw 'Unexpected state, ' + m;
            }
        });
        moves.sort(function(a, b) {
            return b.goodness - a.goodness;
        });
        var move = moves[0];
        var moves = $A(moves).where(function(m) {
            return m.goodness == move.goodness
        });
        $A(moves).shuffle();
        if (move.possible) {
            for (var i = 0; i < moves.length; i++) {
                var testMove = moves[i];
                if ($A(me.lastMoves).contains(testMove.id)) {} else if (testMove.possible) {
                    move = testMove;
                    break;
                } else if (!testMove.possible) {
                    break;
                }
            }
        }
        var g = this.game;
        var me = this;
        setTimeout(function() {
            g.ask(me, move.op, move.rank);
            me.lastMoves.push(move.id);
            if (me.lastMoves.length > 3) {
                me.lastMoves.splice(0, 1);
            }
        }, this.thinkTime / 1);
    },
    requestRank: function(asker, rank) {
        var me = this;
        setTimeout(function() {
            var cards = $A(me.hand).where(function(c) {
                return c.rank == rank;
            });
            if (cards.length > 0) {
                me.game.giveCards(me, asker, cards);
            } else {
                me.game.goFish(me, asker);
            }
        }, this.thinkTime);
    },
    logState: function() {
        var all = '';
        for (var name in this.state) {
            all += '\n' + name;
            for (var r in this.state[name]) {
                all += r + '=' + this.state[name][r] + ',';
            }
        }
        log(all);
    },
    goFish: function() {
        var card = $A(this.game.deck).random();
        var me = this;
        setTimeout(function() {
            me.game.fish(me, card);
        }, this.thinkTime);
    },
    draw: function() {
        this.game.drawCard(this, $A(this.game.deck).random());
    },
    getPlayerInfo: function(player) {
        if (!this.state) {
            this.state = {};
        }
        if (!this.state[player.name]) {
            this.state[player.name] = {};
            for (var i = 2; i <= 14; i++) {
                this.state[player.name][i] = UNKNOWN;
            }
        }
        return this.state[player.name];
    },
    notifyDrawRightCard: function(asker, askee, rank) {
        var askerState = this.getPlayerInfo(asker);
        if (askerState[rank] == UNKNOWN) {
            askerState[rank] = 2;
        } else {
            askerState[rank] += 1;
        }
        var askeeState = this.getPlayerInfo(askee);
        askeeState[rank] = 0;
    },
    notifyDrawWrongCard: function(asker, askee, rank) {
        var askerState = this.getPlayerInfo(asker);
        if (askerState[rank] == UNKNOWN) {
            askerState[rank] = 1;
        }
        for (var i in askerState) {
            if (askerState[i] == 0) {
                askerState[i] = UNKNOWN;
            }
        }
        var askeeState = this.getPlayerInfo(askee);
        askeeState[rank] = 0;
    },
    notifyTakeTrick: function(player, rank) {
        var me = this;
        $A(this.game.players).each(function(p) {
            var state = me.getPlayerInfo(p);
            state[rank] = FINISHED;
        });
    },
    notifyDrawCard: function(player) {
        var state = this.getPlayerInfo(player);
        for (var i in state) {
            if (state[i] == 0) {
                state[i] = UNKNOWN;
            }
        }
    },
    notifyGiveCards: function(asker, askee, cards) {
        var askerState = this.getPlayerInfo(asker);
        var rank = cards[0].rank;
        if (askerState[rank] == UNKNOWN) {
            askerState[rank] = cards.length + 1;
        } else {
            askerState[rank] += cards.length;
        }
        var askeeState = this.getPlayerInfo(askee);
        askeeState[rank] = 0;
    }
});
HumanPlayer = function HumanPlayer(name) {
    this.init(name);
}
HumanPlayer.prototype = {
    name: null,
    hand: null,
    isHuman: true,
    canOnlyDraw: false,
    playable: null,
    init: function(name) {
        this.name = name;
        this.hand = [];
        this.selectedCards = [];
        this.stats = {};
    },
    wrongCardMessageIndex: 0,
    play: function(playable) {
        this.playable = playable;
    },
    draw: function() {
        this.canOnlyDraw = true;
        this.mustDrawMessage();
    },
    useCard: function(card, selecting) {
        if (!card) {
            throw 'card was null';
        }
        if (selecting && !this.game.canSelectCards) {
            return;
        }
        this.game.message('');
        if (this.canOnlyDraw) {
            this.drawing(card);
        } else if (this.game.mayAlwaysDraw && this.canPlay && card == $A(this.game.deck).last()) {
            this.drawing(card);
        } else if (!this.hasCard(card)) {
            this.illegalCardUsed(card, selecting);
        } else if (!this.canPlay) {
            this.notYourTurnMessage();
        } else if (selecting) {
            this.selecting(card);
        } else if ($A(this.playable).contains(card) || this.game.canSelectCard(this, card)) {
            this.playing(card);
        } else {
            this.nonPlayableCardUsed(card, selecting);
        }
    },
    playing: function(card) {
        if ($A(this.selectedCards).contains(card)) {
            this.game.playCards(this, this.selectedCards);
        } else if (!this.game.canSelectCard(this, card)) {
            this.cannotSelectCardMessage(card);
        } else {
            this.selectedCards.push(card);
            this.game.playCards(this, this.selectedCards);
        }
    },
    drawing: function(card) {
        if (card == $A(this.game.deck).last()) {
            this.game.message('');
            this.canOnlyDraw = false;
            this.game.drawCard(this);
        } else {
            this.mustDrawMessage();
        }
    },
    selecting: function(card) {
        if (!card.selected) {
            if (this.game.canSelectCard(this, card)) {
                this.game.selectCard(this, card);
            } else {
                this.cannotSelectCardMessage(card);
            }
        } else {
            this.game.unselectCard(this, card);
        }
    },
    illegalCardUsed: function(card, selecting) {
        if (card == $A(this.game.deck).last()) {
            this.cannotDrawCardMessage();
        } else if ($A(this.game.pile).contains(card)) {
            this.game.message('You cannot take cards from the pile!');
        } else {
            if (this.wrongCardMessageIndex == this.wrongCardMessages.length) {
                this.game.message('');
            } else {
                this.game.message(this.wrongCardMessages[this.wrongCardMessageIndex++]);
            }
            if (this.wrongCardPressed) {
                this.wrongCardPressed(card.toString());
            }
        }
    },
    nonPlayableCardUsed: function(card, selecting) {
        this.cannotPlayCardMessage(card);
    },
    wrongCardMessages: ['That\'s not even your card!', 'No, really, you can\'t play the opponents cards!', 'Are you sure you understand the rules of this game?', 'THESE ARE NOT THE CARDS YOU\'RE LOOKING FOR!', 'OK, now you\'re just messing with me!', 'STOP TOUCHING MY CARDS!', 'STOP IT!', 'Play your own cards, not mine!', 'Ok, have you had your fun now? Can we keep on playing the game?', 'Just play!', 'If you touch my cards one more time there will be CONSEQUENCES!!!', 'At some point this is just gonna stop being funny...', 'I\'m giving you the silent treatment from now on!'],
    notYourTurnMessage: function() {
        this.game.message('It\'s not your turn to play!');
    },
    cannotSelectCardMessage: function(card) {
        if (this.selectedCards.length == 0) {
            this.cannotPlayCardMessage(card);
        } else {
            this.game.message('You cannot play this card with the other cards you have selected.');
        }
    },
    cannotPlayCardMessage: function(card) {
        this.game.message('You cannot play the ' + card.longName + ' now.');
    },
    cannotDrawCardMessage: function(card) {
        this.game.message('You may not draw a card now, you have cards in your hand that you can play!');
    },
    mustDrawMessage: function() {
        this.game.message('You have no cards you can play, you must draw.');
    },
    extend: ComputerPlayer.prototype.extend,
    toString: ComputerPlayer.prototype.toString,
    hasCard: ComputerPlayer.prototype.hasCard,
    remove: ComputerPlayer.prototype.remove
}
var states = {
    WAITING: 0,
    ASKING: 1,
    ASKING_RANK: 2,
    ASKED: 3,
    DRAWING: 4,
    FISHING: 5
}
HumanPlayer.prototype.extend({
    state: states.WAITING,
    isHuman: true,
    play: function() {
        log('Set ASKING - play')
        this.state = states.ASKING;
        if (this.game.players.length == 2) {
            var op = this.game.players[0] === this ? this.game.players[1] : this.game.players[0];
            this.game.message('Which of these equivalent unsimplified fractions do you want to ask ' + op.name + ' for?');
            this.showRankDiv(op);
        } else {
            this.game.message('Your turn. Click on the player you want to ask.');
        }
    },
    clickPlayer: function(id) {
        if (this.state == states.ASKING_RANK) {
            this.game.message('You\'ve already selected a player to ask. Now choose which rank to ask them for.');
            return;
        }
        if (this.state != states.ASKING) {
            this.game.message('It\'s not your turn to ask!');
            return;
        }
        var p = $A(this.game.players).where(function(p) {
            return p.id == id;
        })[0];
        if (p === this) {
            this.game.message('You can\'t ask yourself!');
        } else {
            this.showRankDiv(p);
        }
    },
    showRankDiv: function(player) {
        this.askingPlayer = player;
        $('#askdiv span').hide();
        $A(this.hand).each(function(c) {
            $('#askdiv #ask-' + c.rank).show();
        });
        $('#askdiv p strong').text(player.name);
        $('#askdiv').css('z-index', zIndexCounter++).show();
        log('Set ASKING_RANK - showRankDiv');
        this.state = states.ASKING_RANK;
    },
    clickRank: function(rank) {
        this.game.ask(this, this.askingPlayer, rank);
        log('Set WAITING clickRank')
        this.state = states.WAITING;
    },
    clickGoFish: function() {
        if (this.state != states.ASKED) {
            return this.game.message('Uh, no one was asking you! You can\'t tell anyone to go pick a card now!');
        }
        var askedRank = this.askedRank;
        var count = $A(this.hand).where(function(c) {
            return c.rank == askedRank;
        }).length;
        if (count == 0) {
            log('SET WAITING - clickGoFish');
            this.state = states.WAITING;
            this.game.goFish(this, this.asker);
        } else if (count == 1) {
            this.game.message('No cheating! You have ' + this.game.names[this.askedRank] + ' or the equivalent, you must give it to ' + this.asker.name + '.');
        } else if (count > 1) {
            this.game.message('Nice try... You have ' + this.game.pluralnames[this.askedRank] + ' or the equivalent, you must give them to ' + this.asker.name + '.');
        }
    },
    requestRank: function(asker, rank) {
        log('Set ASKED - requestRank');
        this.state = states.ASKED;
        this.asker = asker;
        this.askedRank = rank;
        this.game.message('If you have any ' + this.game.pluralnames[rank] + ' or the equivalent, click on them to give them to ' + asker.name + '. If not, press the Pass button.');
    },
    goFish: function() {
        this.game.message('Click a card in the pile to pick it.');
        log('Set FISHING - goFish')
        this.state = states.FISHING;
    },
    draw: function() {
        log('Set DRAWING - draw')
        this.state = states.DRAWING;
        var count = this.game.cardCount;
        var deck = this.game.deck;
        var total = Math.min(count, deck.length);
        if (this.hand.length == 0) {
            this.game.message('Please draw ' + total + ' cards from the pile.');
        } else if (deck.length < count - this.hand.length) {
            this.game.message('Please draw ' + deck.length + ' more cards from the pile.');
        } else {
            this.game.message('Please draw ' + (count - this.hand.length) + ' more cards from the pile.');
        }
    },
    sortHand: function() {
        this.hand.sort(function(c1, c2) {
            var suits = {
                "h": 0,
                "s": 1,
                "d": 2,
                "c": 3
            };
            if (c1.rank == c2.rank) {
                return suits[c1.suit] - suits[c2.suit];
            }
            return c1.rank - c2.rank;
        });
    },
    useCard: function(card) {
        if (this.state == states.FISHING) {
            if ($A(this.game.deck).contains(card)) {
                log('Set WAITING - useCard 1');
                this.state = states.WAITING;
                this.game.fish(this, card);
            } else {
                this.game.message('You can only pick cards from the pile!');
            }
        } else if (this.state == states.DRAWING) {
            if ($A(this.game.deck).contains(card)) {
                log('Set WAITING - useCard 2');
                this.state = states.WAITING;
                this.game.drawCard(this, card);
            } else {
                this.game.message('You can only draw cards from the pile!');
            }
        } else if (this.state == states.ASKED) {
            this.askedBuffer = this.askedBuffer || [];
            this.askedBufferReady = this.askedBufferReady || [];
            if ($A(this.askedBuffer).contains(card)) {
                this.game.message('You\'ve already selected this card. Click the rest of your ' + this.game.pluralnames[this.askedRank] + '.');
            } else if (!$A(this.hand).contains(card)) {
                this.game.message('You can only give your own cards to ' + this.asker.name + '.');
            } else if (card.rank != this.askedRank) {
                this.game.message(this.asker.name + ' asked for ' + this.game.pluralnames[this.askedRank] + ', not ' + this.game.pluralnames[card.rank] + '.');
            } else {
                this.askedBuffer.push(card);
                var askedRank = this.askedRank;
                var count = $A(this.hand).where(function(c) {
                    return c.rank == askedRank;
                }).length;
                var me = this;
                webRenderer.moveHumanCardToCenter(card, this.askedBuffer.length - 1, count, function() {
                    me.askedBufferReady.push(card);
                    if (me.askedBufferReady.length == count) {
                        me.game.giveCards(me, me.asker, me.askedBufferReady);
                        me.state = states.WAITING;
                        me.askedBuffer = null;
                        me.askedBufferReady = null;
                    }
                });
            }
        } else if (this.state == states.ASKING) {
            this.game.message('You are supposed to click a player to ask them now, not click on cards!');
        } else if (this.state == states.ASKING_RANK) {
            this.game.message('You are supposed to click the rank you want to ask for now, not click on cards!');
        } else {
            this.game.message('What exactly do you think you\'re doing?');
        }
    },
    notifyDrawRightCard: function(asker, askee, rank) {},
    notifyDrawWrongCard: function(asker, askee, rank) {},
    notifyTakeTrick: function(player, rank) {},
    notifyDrawCard: function(player) {},
    notifyGiveCards: function(asker, askee, cards) {}
});
var TABLE_SIZE = {
    width: 750,
    height: 600
};
var CARD_SIZE = {
    width: 71,
    height: 96
};
var CONDENSE_COUNT = 6;
var DECK_POS = {
    left: TABLE_SIZE.width / 2 - 1.3 * CARD_SIZE.width,
    top: TABLE_SIZE.height / 2 - CARD_SIZE.height / 2
};
var PILE_POS = {
    left: DECK_POS.left + 1.3 * CARD_SIZE.width,
    top: DECK_POS.top
};
var CARD_PADDING = 70;
var HORIZONTAL_MARGIN = 60;
var VERTICAL_MARGIN = 80;
var OVERLAY_MARGIN = 2;
var HORIZONTAL = 'h';
var VERTICAL = 'v';
var LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom';
var BOTTOM_PLAYER_TOP = TABLE_SIZE.height - CARD_SIZE.height - VERTICAL_MARGIN;
var TOP_PLAYER_TOP = VERTICAL_MARGIN;
var LEFT_PLAYER_TOP = TABLE_SIZE.height / 2;
var RIGHT_PLAYER_TOP = TABLE_SIZE.height / 2;
var BOTTOM_PLAYER_LEFT = TABLE_SIZE.width / 2;
var TOP_PLAYER_LEFT = TABLE_SIZE.width / 2;
var LEFT_PLAYER_LEFT = HORIZONTAL_MARGIN;
var RIGHT_PLAYER_LEFT = TABLE_SIZE.width - CARD_SIZE.height - HORIZONTAL_MARGIN;
var ANIMATION_SPEED = 500;
var TAKE_TRICK_DELAY = 750;
var zIndexCounter = 1;
var CARDBACK = {
    x: -13 * CARD_SIZE.width,
    y: 0
};
var HCARDBACK = {
    x: -13 * CARD_SIZE.width,
    y: -2 * CARD_SIZE.height
};
jQuery.fn.moveCard = function(top, left, callback, speed) {
    var props = {};
    props['top'] = top;
    props['left'] = left;
    props['queue'] = false;
    this.animate(props, speed || ANIMATION_SPEED, callback);
    return this;
};
jQuery.fn.setBackground = function(x, y) {
    var props = {};
    props['background-position'] = x + ' ' + y;
    this.css(props);
    return this;
};
if (jQuery.support.transition) {}
Card.prototype.move = function(top, left, callback, speed) {
    $(this.guiCard).moveCard(top, left, callback, speed);
}
Card.prototype.rotate = function(angle) {
    $(this.guiCard).css('-webkit-transform', 'rotate(' + angle + 'deg)').css('-moz-transform', 'rotate(' + angle + 'deg)').css('-ms-transform', 'rotate(' + angle + 'deg)').css('transform', 'rotate(' + angle + 'deg)').css('-o-transform', 'rotate(' + angle + 'deg)');
}
Card.prototype.left = function() {
    return parseFloat($(this.guiCard).css('left'));
}
Card.prototype.top = function() {
    return parseFloat($(this.guiCard).css('top'));
}
Card.prototype.width = function() {
    return parseFloat($(this.guiCard).css('width'));
}
Card.prototype.height = function() {
    return parseFloat($(this.guiCard).css('height'));
}
Card.prototype.normalizeRotationOnMove = true;
Card.prototype.showCard = function(position) {
    var offsets = {
        "c": 0,
        "d": 1,
        "h": 2,
        "s": 3
    };
    var xpos, ypos;
    if (!position) {
        position = BOTTOM;
    }
    var h = $(this.guiCard).height(),
        w = $(this.guiCard).width();
    if (position == TOP || position == BOTTOM) {
        var rank = this.rank;
        if (rank == 1) {
            rank = 14;
        }
        xpos = (-rank + 2) * CARD_SIZE.width;
        ypos = -offsets[this.suit] * CARD_SIZE.height;
        if (position == TOP && this.rank > 10) {
            ypos = -4 * CARD_SIZE.height;
            var aboveTen = rank - 10;
            xpos = -((aboveTen - 1) + offsets[this.suit] * 4) * CARD_SIZE.width;
        }
        if (this.rank == 0) {
            ypos = -5 * CARD_SIZE.height;
            if (this.suit == 'rj' && position == TOP) {
                xpos = -14 * CARD_SIZE.width;
            } else if (this.suit == 'bj' && position == TOP) {
                xpos = -15 * CARD_SIZE.width;
            } else if (this.suit == 'rj' && position == BOTTOM) {
                xpos = -12 * CARD_SIZE.width;
            } else if (this.suit == 'bj' && position == BOTTOM) {
                xpos = -13 * CARD_SIZE.width;
            }
        }
        if (w > h) {
            $(this.guiCard).height(w).width(h);
        }
        if (this.normalizeRotationOnMove) {
            this.rotate(0);
        }
    } else {
        ypos = -5 * CARD_SIZE.height;
        var rank = this.rank;
        if (rank == 1) {
            rank = 14;
        }
        if (this.rank == 0) {
            xpos = -8 * CARD_SIZE.height;
            var extra = position == RIGHT ? 0 : 2;
            if (this.suit == 'rj') {
                ypos -= (2 + extra) * CARD_SIZE.width;
            } else if (this.suit == 'bj') {
                ypos -= (3 + extra) * CARD_SIZE.width;
            }
        } else if (this.rank <= 10) {
            ypos -= (this.rank - 2) * CARD_SIZE.width;
            xpos = -offsets[this.suit] * CARD_SIZE.height;
        } else {
            xpos = -4 * CARD_SIZE.height - offsets[this.suit] * CARD_SIZE.height;
            if (position == LEFT) {
                ypos -= (this.rank - 7) * CARD_SIZE.width;
            } else {
                ypos -= (this.rank - 11) * CARD_SIZE.width;
            }
        }
        if (h > w) {
            $(this.guiCard).height(w).width(h);
        }
        if (this.normalizeRotationOnMove) {
            this.rotate(0);
        }
    }
    $(this.guiCard).setBackground(xpos + 'px', ypos + 'px');
};
Card.prototype.moveToFront = function() {
    this.guiCard.style.zIndex = zIndexCounter++;
};
Card.prototype.hideCard = function(position) {
    if (!position) {
        position = BOTTOM;
    }
    var h = $(this.guiCard).height(),
        w = $(this.guiCard).width();
    if (position == TOP || position == BOTTOM) {
        $(this.guiCard).setBackground(CARDBACK.x + 'px', CARDBACK.y + 'px');
        if (w > h) {
            $(this.guiCard).height(w).width(h);
        }
    } else {
        $(this.guiCard).setBackground(HCARDBACK.x + 'px', HCARDBACK.y + 'px');
        if (h > w) {
            $(this.guiCard).height(w).width(h);
        }
    }
    this.rotate(0);
};

function showCards(cards, position, speed) {
    setTimeout(function() {
        for (var i = 0; i < cards.length; i++) {
            cards[i].showCard(position);
        }
    }, speed || (ANIMATION_SPEED / 1));
}

function hideCards(cards, position, speed) {
    setTimeout(function() {
        for (var i = 0; i < cards.length; i++) {
            cards[i].hideCard(position);
        }
    }, speed || (ANIMATION_SPEED / 1));
}
var webRenderer = {
    extend: function(type) {
        this.base = {};
        for (var i in type) {
            if (this[i]) {
                this.base[i] = this[i];
            }
            this[i] = type[i];
        }
    },
    deckReady: function(e) {
        var left = DECK_POS.left,
            top = DECK_POS.top;
        webRenderer._createCardPile(e.game.deck, DECK_POS.top, DECK_POS.left, false);
        e.callback();
    },
    _createCardPile: function(cards, top, left, showCards) {
        var tableDiv = $('#play-page');
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            if ((i + 1) % CONDENSE_COUNT == 0) {
                left -= OVERLAY_MARGIN;
                top -= OVERLAY_MARGIN;
            }
            webRenderer._createGuiCard(card, {
                "left": left,
                "top": top
            });
            if (showCards) {
                card.showCard();
            } else {
                card.hideCard();
            }
        }
    },
    _createGuiCard: function(card, cssProps) {
        var tableDiv = $('#play-page');
        var divCard = $('<div>').addClass('card').css(cssProps);
        tableDiv.append(divCard[0]);
        card.guiCard = divCard[0];
        divCard[0].card = card;
        card.moveToFront();
        card.hideCard();
    },
    _getCardPos: function(player, pos, handLength) {
        if (!handLength) {
            handLength = player.hand.length;
        }
        var handWidth = (handLength - 1) * CARD_PADDING + CARD_SIZE.width;
        var props = {};
        var selectOffset = 0;
        if (player.hand[pos] && player.hand[pos].selected) {
            selectOffset = 15;
        }
        if (player.position == TOP) {
            props.left = (player.left + handWidth / 2 - CARD_SIZE.width) - pos * CARD_PADDING;
            props.top = player.top + selectOffset;
        } else if (player.position == BOTTOM) {
            props.left = player.left - (handWidth / 2) + pos * CARD_PADDING;
            props.top = player.top - selectOffset;
        } else if (player.position == LEFT) {
            props.top = player.top - (handWidth / 2) + pos * CARD_PADDING;
            props.left = player.left + selectOffset;
        } else if (player.position == RIGHT) {
            props.top = (player.top + handWidth / 2 - CARD_SIZE.width) - pos * CARD_PADDING;
            props.left = player.left - selectOffset;
        }
        return props;
    },
    dealCard: function(e) {
        webRenderer._adjustHand(e.player, e.callback, ANIMATION_SPEED / 2, false, e.game.cardCount);
    },
    selectCard: function(e) {
        webRenderer._adjustHand(e.player, e.callback, ANIMATION_SPEED / 3);
    },
    unselectCard: function(e) {
        webRenderer._adjustHand(e.player, e.callback, ANIMATION_SPEED / 3);
    },
    /*pickDealer: function(e) {
        $('#dealer-chip').remove();
        $('.avatar small').removeClass('dealer');
        $('#' + e.dealerId + ' small').addClass('dealer');
        e.callback();
    },*/
    pass: function(e) {
        var pass = $('#pass');
        pass.css({
            "font-size": '16px',
            "top": e.player.top,
            "z-index": zIndexCounter + 1000
        });
        if (e.player.position == BOTTOM) {
            pass.css("top", e.player.top + 100);
        }
        var props = {
            "top": PILE_POS.top - 40,
            "font-size": '120px'
        };
        if (e.player.align == VERTICAL) {
            if (e.player.position == LEFT) {
                pass.css({
                    "right": '',
                    "left": 0
                });
            } else {
                pass.css({
                    "left": '',
                    "right": 0
                });
            }
            pass.css("width", '100px');
            props['width'] = TABLE_SIZE.width;
        } else {
            pass.css('width', TABLE_SIZE.width + 'px');
            pass.css('text-align', 'center');
        }
        pass.show().animate(props, ANIMATION_SPEED * 2).fadeOut(ANIMATION_SPEED, e.callback);
    },
    play: function(e) {
        var beforeCount = e.game.pile.length - e.cards.length;

        function renderCard(i) {
            if (e.cards.length == 0) {
                e.callback();
            } else {
                var zIndexCards = e.player.hand.slice(0);
                $A(e.cards).each(function(c) {
                    zIndexCards.push(c);
                });
                zIndexCards.sort(function(c1, c2) {
                    return $(c1.guiCard).css('z-index') - $(c2.guiCard).css('z-index');
                });
                for (var i = zIndexCards.length - 1; i >= 0; i--) {
                    $(zIndexCards[i].guiCard).css('z-index', zIndexCounter + i + 1);
                }
                zIndexCounter += zIndexCards.length + 3;
                var card = e.cards[0];
                $A(e.cards).remove(e.cards[0]);
                var top = PILE_POS.top - (Math.floor((beforeCount + i) / CONDENSE_COUNT) * OVERLAY_MARGIN);
                var left = PILE_POS.left - (Math.floor((beforeCount + i) / CONDENSE_COUNT) * OVERLAY_MARGIN);
                $(card.guiCard).moveCard(top, left, function() {
                    renderCard(i + 1);
                });
                if (e.cards.length == 0) {
                    webRenderer._adjustHand(e.player, null, ANIMATION_SPEED, true);
                }
                showCards([card]);
            }
        }
        if (e.cards.length > 1 && $($A(e.cards).last().guiCard).css('top') != $(e.cards[0].guiCard).css('top')) {
            $($A(e.cards).last().guiCard).animate({
                "top": $(e.cards[0].guiCard).css('top')
            }, ANIMATION_SPEED / 4, function() {
                renderCard(0);
            });
        } else {
            renderCard(0);
        }
    },
    _adjustHand: function(player, callback, speed, dontMoveToFront, handLength) {
        if (!speed) {
            speed = ANIMATION_SPEED;
        }
        for (var i = 0; i < player.hand.length; i++) {
            var card = player.hand[i];
            var props = webRenderer._getCardPos(player, i, handLength);
            var f;
            if (i == player.hand.length - 1) {
                f = callback;
            }
            $(card.guiCard).moveCard(props.top, props.left, f, speed);
            if (!dontMoveToFront) {
                card.moveToFront();
            }
        }
        if (player.showCards) {
            showCards(player.hand, player.position, speed / 2);
        } else {
            hideCards(player.hand, player.position, speed / 2);
        }
    },
    draw: function(e) {
        webRenderer._adjustHand(e.player, e.callback);
    },
    sortHand: function(e) {
        webRenderer._adjustHand(e.player, e.callback);
    },
    takeTrick: function(e) {
        setTimeout(function() {
            $A(e.trick).each(function(c) {
                $(c.guiCard).addClass('trick');
            });
            var props = {};
            var cssClass;
            var trickProps = {};
            var playerMargin = 2;
            var trickHeight = 45;
            var trickWidth = 33;
            var halfTrickHeight = trickHeight / 2;
            var halfTrickWidth = trickWidth / 2;
            var overlay = 10;
            var playerSize = 50;
            var sidePlayerTop = 250;
            var edgeDistance = playerMargin + (playerSize - trickHeight) / 2;
            var cardDistance = (TABLE_SIZE.width / 2) + playerSize / 2 + e.player.tricks.length * overlay;
            if (e.player.position == TOP) {
                props['left'] = ((TABLE_SIZE.width - CARD_SIZE.width) / 2) + 'px';
                cssClass = 'verticalTrick';
                trickProps['top'] = edgeDistance;
                trickProps['left'] = cardDistance;
                props = trickProps;
            } else if (e.player.position == BOTTOM) {
                cssClass = 'verticalTrick';
                trickProps['bottom'] = playerMargin + $('#bottom-player').height() - playerSize + ((playerSize - trickHeight) / 2);
                trickProps['right'] = cardDistance + 20;
                props['top'] = TABLE_SIZE.height - trickProps['bottom'] - CARD_SIZE.height;
                props['left'] = TABLE_SIZE.width - trickProps['right'] - CARD_SIZE.width;
            } else if (e.player.position == LEFT) {
                cssClass = 'horizontalTrick';
                trickProps['bottom'] = TABLE_SIZE.height - sidePlayerTop + e.player.tricks.length * overlay;
                trickProps['left'] = edgeDistance + 1;
                props['top'] = TABLE_SIZE.height - trickProps['bottom'] - CARD_SIZE.height;
                props['left'] = trickProps['left'];
            } else if (e.player.position == RIGHT) {
                cssClass = 'horizontalTrick';
                trickProps['top'] = sidePlayerTop + $('#left-player').height() + e.player.tricks.length * overlay;
                trickProps['right'] = edgeDistance;
                props['top'] = trickProps['top'];
                props['left'] = TABLE_SIZE.width - trickProps['right'] - CARD_SIZE.width;
            }
            for (var i = 0; i < e.trick.length; i++) {
                e.trick[i].moveToFront();
            }
            for (var i = 0; i < e.trick.length; i++) {
                var callback = function() {};
                if (i == e.trick.length - 1) {
                    callback = function() {
                        $('.trick').hide();
                        $('#play-page').append($('<div/>').addClass(cssClass).css(trickProps));
                        if (e.player.isHuman) {
                            $('#current-score').text('Your points: ' + e.player.points);
                        }
                        e.callback();
                    };
                }
                $(e.trick[i].guiCard).animate(props, ANIMATION_SPEED, callback);
            }
        }, TAKE_TRICK_DELAY);
    }
};

function testCards(suit, rank) {
    var positions = {
        0: BOTTOM,
        1: LEFT,
        2: TOP,
        3: RIGHT
    };
    for (var j = 0; j < game.players.length; j++) {
        var p = game.players[j];
        for (var i = 0; i < p.hand.length; i++) {
            p.hand[i].suit = suit;
            p.hand[i].rank = rank;
            p.hand[i].showCard(positions[j]);
        }
    }
}
var AFTER_PILE_DELAY = ANIMATION_SPEED * 2;
var GOFISH_DELAY = 2000;
var SHOWCARDS_DELAY = 2000;
var ASK_DELAY = 2000;
webRenderer.extend({
    dealCard: function(e) {
        ANIMATION_SPEED = 100;
        webRenderer.base.dealCard.call(webRenderer, e);
        ANIMATION_SPEED = 500;
    },
    start: function(e) {
        var topOffset = 230 - CARD_SIZE.height / 2;
        var leftOffset = 210 - CARD_SIZE.width / 2;
        for (var i = 0; i < e.game.deck.length; i++) {
            var card = e.game.deck[i];
            var point = this.getRandomPointInCircle(280, 90);
            $(card.guiCard).moveCard(point.y + topOffset, point.x + leftOffset);
            var angle = parseInt(Math.random() * 180);
            card.rotate(angle);
        }
        $('#fish-button').fadeIn();
        setTimeout(e.callback, AFTER_PILE_DELAY);
    },
    goFish: function(e) {
        var bubble = '#' + e.askee.id + '-bubble';
        $(bubble + ' div').hide();
        $(bubble + ' img').show();
        $(bubble + ' p span').text('');
        $(bubble).show();
        e.callback();
    },
    giveCards: function(e) {
        var adjustHands = function(e) {
            webRenderer._adjustHand(e.askee, function() {}, ANIMATION_SPEED, false, e.askee.hand.length);
            webRenderer._adjustHand(e.asker, e.callback, ANIMATION_SPEED, false, e.asker.hand.length);
        }
        if (e.askee.isHuman) {
            setTimeout(function() {
                adjustHands(e);
            }, SHOWCARDS_DELAY);
        } else {
            webRenderer.moveToCenter(e.cards, function() {
                adjustHands(e);
            });
        }
    },
    drawRightCard: function(e) {
        var p = e.asker;

        function showRightCard() {
            webRenderer.moveToCenter([e.drawcard], function() {
                webRenderer._adjustHand(p, e.callback, ANIMATION_SPEED, false, p.hand.length);
            })
        }
        webRenderer._adjustHand(p, showRightCard, ANIMATION_SPEED, false, p.hand.length);
    },
    drawWrongCard: function(e) {
        var p = e.asker;
        webRenderer._adjustHand(p, e.callback, ANIMATION_SPEED, false, p.hand.length);
    },
    drawCard: function(e) {
        var p = e.player;
        webRenderer._adjustHand(p, e.callback, ANIMATION_SPEED, false, p.hand.length);
    },
    moveHumanCardToCenter: function(card, nr, totalCount, callback) {
        var pos = webRenderer.getMidTablePos(nr, totalCount);
        $(card.guiCard).moveCard(pos.top, pos.left, callback);
    },
    moveToCenter: function(cards, callback) {
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var pos = webRenderer.getMidTablePos(i, cards.length);
            $(card.guiCard).moveCard(pos.top, pos.left);
        };
        showCards(cards, BOTTOM, ANIMATION_SPEED / 2);
        setTimeout(callback, SHOWCARDS_DELAY);
    },
    getMidTablePos: function(cardIndex, cardCount) {
        var index = 0;
        var padding = 20;
        var totalWidth = cardCount * CARD_SIZE.width + (cardCount - 1) * padding;
        var leftStart = (TABLE_SIZE.width - totalWidth) / 2;
        var left = leftStart + cardIndex * (CARD_SIZE.width + padding);
        var top = 200;
        return {
            top: top,
            left: left
        };
    },
    takeTrick: function(e) {
        webRenderer.moveToCenter(e.trick, function() {
            webRenderer._adjustHand(e.asker, function() {}, ANIMATION_SPEED, false, e.asker.hand.length);
            return webRenderer.base.takeTrick.call(webRenderer, e);
        });
    },
    ask: function(e) {
        e.asker.id;
        var bubble = '#' + e.asker.id + '-bubble';
        $(bubble + ' img').hide();
        //$(bubble + ' div').show().css('background-position', (-img[e.askee.id] * 35) + 'px 0px');
        var rankText = e.rank.toString();
        if (rankText == '2') {
			rankText = '12/20';
		} else if (rankText == '3') {
            rankText = '10/15';
		} else if (rankText == '4') {
            rankText = '3/18';
		} else if (rankText == '5') {
            rankText = '27/54';
		} else if (rankText == '6') {
            rankText = '6/30';
		} else if (rankText == '7') {
            rankText = '9/27';
		} else if (rankText == '8') {
            rankText = '12/14';
		} else if (rankText == '9') {
            rankText = '4/40';
		} else if (rankText == '10') {
            rankText = '18/24';
		} else if (rankText == '11') {
            rankText = '3/150';
        } else if (rankText == '12') {
            rankText = '30/63';
        } else if (rankText == '13') {
            rankText = '10/18';
        } else if (rankText == '14') {
            rankText = '30/12';
        }
        $(bubble + ' p span').text(rankText + '?');
        $(bubble).show();
        e.callback();
    },
    playerTurn: function(e) {
        $('.bubble').hide();
        e.callback();
    },
    getRandomPointInCircle: function(width, height) {
        var t = 2 * Math.PI * Math.random()
        var u = Math.random() + Math.random();
        var r;
        if (u > 1) {
            r = 2 - u;
        } else {
            r = u;
        }
        var x = r * Math.cos(t);
        var y = r * Math.sin(t);
        x = parseInt(width / 2 + x * width / 2);
        y = parseInt(height / 2 + y * height / 2);
        return {
            x: x,
            y: y
        };
    },
    win: function(e) {
        e.callback();
    },
    play: function(e) {}
});

function WebCardGame() {}
WebCardGame.prototype = {
    createGameObject: function() {
        throw "Game must override createGameObject!";
    },
    createHumanPlayer: function() {
        if (location.search && location.search.indexOf('autoplay') != -1) {
            human = new ComputerPlayer('You');
            ANIMATION_SPEED = 100;
        } else {
            human = new HumanPlayer('You');
            human.isHuman = true;
        }
        human.top = BOTTOM_PLAYER_TOP;
        human.left = BOTTOM_PLAYER_LEFT;
        human.align = HORIZONTAL;
        human.position = BOTTOM;
        human.showCards = true;
        human.id = 'bottom-player';
        human.stats = {};
        human.wrongCardPressed = function(label) {
            trackEvent('ClickWrongCard', label);
        }
    },
    /*saveLastDealer: function() {
        cake('lastDealerIndex', game.dealerIndex);
    },
    loadLastDealer: function() {
        var lastDealerIndex = cake('lastDealerIndex');
        if ((lastDealerIndex + '').match(/^[0-3]$/)) {
            window.game.lastDealerIndex = parseInt(lastDealerIndex);
        }
    },*/
    createComputerPlayers: function() {
        var showCards = document.location.search == "?YoureGameSucks";
        topPlayer = new ComputerPlayer('Computer');
        topPlayer.top = TOP_PLAYER_TOP;
        topPlayer.left = TOP_PLAYER_LEFT;
        topPlayer.align = HORIZONTAL;
        topPlayer.position = TOP;
        topPlayer.id = 'top-player';
        topPlayer.showCards = showCards;
        topPlayer.stats = {};
        img['top-player'] = 2;
        leftPlayer = new ComputerPlayer('Player1');
        leftPlayer.top = LEFT_PLAYER_TOP;
        leftPlayer.left = LEFT_PLAYER_LEFT;
        leftPlayer.align = VERTICAL;
        leftPlayer.position = LEFT;
        leftPlayer.id = 'left-player';
        leftPlayer.showCards = showCards;
        leftPlayer.stats = {};
        img['left-player'] = 1;
        rightPlayer = new ComputerPlayer('Player2');
        rightPlayer.top = RIGHT_PLAYER_TOP;
        rightPlayer.left = RIGHT_PLAYER_LEFT;
        rightPlayer.align = VERTICAL;
        rightPlayer.position = RIGHT;
        rightPlayer.id = 'right-player';
        rightPlayer.showCards = showCards;
        rightPlayer.stats = {};
        img['right-player'] = 3;
        if (showCards) {
            var exp = new Image();
            exp.onload = function() {
                $('.card').css('background-image', 'url(img/expanded-cards.png)');
            }
            exp.src = 'img/expanded-cards.png';
        }
    },
    setEventRenderers: function() {
        for (var name in game.renderers) {
            game.setEventRenderer(name, function(e) {
                e.callback();
            });
        }
        game.setEventRenderer('deckready', webRenderer.deckReady);
        game.setEventRenderer('dealcard', webRenderer.dealCard);
        game.setEventRenderer('selectcard', webRenderer.selectCard);
        game.setEventRenderer('unselectcard', webRenderer.unselectCard);
        game.setEventRenderer('play', webRenderer.play);
        game.setEventRenderer('draw', webRenderer.draw);
        game.setEventRenderer('pass', webRenderer.pass);
        game.setEventRenderer('sorthand', webRenderer.sortHand);
        /*game.setEventRenderer('pickdealer', webRenderer.pickDealer);*/
    },
    setupSortHandler: function() {
        $('#sortHand').click(function() {
            if (!window.human.canPlay && !window.human.mustDraw) {
                game.message('You can only sort when it is your turn to play.');
            } else {
                game.sortHand(window.human, function() {});
            }
        });
    },
    setupPlayerCountHandler: function() {
        window.playerCount = game.defaultPlayerCount;
        /*if (game.canChangePlayerCount) {
            var cookiePlayerCount = cake('playerCount');
            if (cookiePlayerCount && cookiePlayerCount.match(/^2|3|4$/)) {
                window.playerCount = parseInt(cookiePlayerCount);
            }
        }*/
        if (playerCount > 2) {
            $('#left-player').show();
        }
        if (playerCount == 4) {
            $('#right-player').show();
        }
        var playerCountSelect = $('#player-count')[0];
        if (playerCountSelect) {
            playerCountSelect.options[playerCount - 2].selected = 'selected';
        }
        $('#player-count').change(function() {
            window.playerCount = this.selectedIndex + 2;
            //cake('playerCount', window.playerCount);
            //webGame.pickDealer();
            if (playerCount == 4) {
                $('#right-player').fadeIn();
                $('#left-player').fadeIn();
            }
            if (playerCount == 3) {
                $('#right-player').fadeOut();
                $('#left-player').fadeIn();
            }
            if (playerCount == 2) {
                $('#right-player').fadeOut();
                $('#left-player').fadeOut();
            }
        });
    },
    bindCardEventHandlers: function() {
        var pushedCard;
        if (window.isTouch && game.canSelectCards) {
            $('.card').bind('touchstart', function(ev) {
                pushedCard = this.card;
                setTimeout(function() {
                    if (pushedCard) {
                        human.useCard(pushedCard, true);
                        pushedCard = null;
                    }
                }, 800);
            });
            $('.card').bind('touchend', function(ev) {
                if (pushedCard !== this.card) {
                    return;
                }
                pushedCard = null;
                human.useCard(this.card, false);
            });
        } else {
            $('.card').mousedown(function(ev) {
                human.useCard(this.card, ev.which == 3 || ev.metaKey);
            });
        }
        $('.card').bind('contextmenu', function(e) {
            return false;
        });
    },
    setupStartHandler: function() {
        game.setEventRenderer('start', function(e) {
            $('#sortHand').show();
            webGame.bindCardEventHandlers();
            if (webRenderer.start) {
                webRenderer.start(e);
            } else {
                e.callback();
            }
        });
    },
    setupTurnHandler: function() {
        game.setEventRenderer('playerturn', function(e) {
            if (e.player.isHuman) {
                if (e.game.round <= 3) {
                    var msg = 'Your turn! Click a card to play.';
                    if (game.canSelectCards) {
                        if (window.isTouch) {
                            msg += ' Press and hold card to select multiple cards.';
                        } else {
                            msg += ' Right click to select multiple cards.';
                        }
                    }
                    e.game.message(msg);
                } else {
                    e.game.message('Your turn!');
                }
            } else {
                e.game.message(e.player.name + "'s turn!");
            }
            e.callback();
        });
    },
    setupDealHandler: function() {
        $('#deal').click(function(e) {
            try {
                window.started = true;
                var imgs = ['horizontal-trick', 'vertical-trick', 'players-thumbs', 'players-medium', 'players-large', 'speechleft', 'speechright', 'speechtop', 'trophy'];
                var img = new Image();
                for (var i = 0; i < imgs.length; i++) {
                    img.src = 'img/' + imgs[i] + '.png';
                }
                game.addPlayer(human);
                if (playerCount > 2) {
                    game.addPlayer(leftPlayer);
                }
                game.addPlayer(topPlayer);
                if (playerCount == 4) {
                    game.addPlayer(rightPlayer);
                }
                stats.startGame(game.players);
                game.message('');
                if (location.search && location.search.match(/scenario=(\w+)/)) {
                    game.currentTest = RegExp.$1;
                }
                game.deal();
                $('#deal').hide();
                $('#open-player-picker').hide();
                $('#player-count').hide();
                setCustomVar(1, 'PlayerCount', playerCount + ' players');
                trackEvent('StartGame', playerCount + ' players', playerCount);
            } catch (e) {
                alert(e);
            }
        });
    },
    setupRestartHandler: function() {
        $('#start-new-game').click(function(e) {
            trackEvent('Restart', result);
            reloadPage();
        });
    },
    setupMessageHandler: function() {
        game.message = message;
    },
    setupWinHandler: function() {
        game.setEventRenderer('win', function(e) {
            trackEvent('Win', e.player.name);
            trackEvent('FinishGame');
            makePlayersSad([e.player.id]);
            for (var i = 0; i < game.pile.length; i++) {
                $(game.pile[i].guiCard).hide();
            }
            for (var i = 0; i < game.deck.length; i++) {
                $(game.deck[i].guiCard).hide();
            }
            window.zIndexCounter++;
            if (e.player.isHuman) {
                $('#result-box h3').text('CONGRATULATIONS!!! YOU WIN!');
                result = 'Win';
            } else {
                $('#result-box h3').text(e.player.name.toUpperCase() + ' WINS!!!');
                result = 'Lose';
            }
            for (var i = 0; i < game.players.length; i++) {
                var p = game.players[i];
                if (p === e.player) {
                    p.stats.result = 'win';
                } else {
                    p.stats.result = 'lose';
                }
            }
            stats.finishGame(game.players);
            $('#result-box span.winner-img').css('display', 'none');
            $('#result-box span#' + e.player.id + '-win').css({
                display: 'inline-block',
                width: 120,
                height: 120
            });
            $('#messageBox').hide();
            $('#result-box').css('z-index', zIndexCounter).show();
        });
    },
    setupLogging: function() {
        if (location.search && location.search.indexOf('log') != -1) {
            window.log = function(msg) {
                for (var i = 1; i < arguments.length; i++) {
                    msg = msg.replace('%' + i, arguments[i]);
                }
                if (this.console) {
                    this.console.log(msg);
                }
            };
        }
    },
    startGame: function() {
        game.start();
        //this.pickDealer();
    },
    /*pickDealer: function() {
        var count = window.playerCount || game.defaultPlayerCount;
        var ids;
        if (count == 2) {
            ids =   ['bottom-player', 'top-player'];
        } else if (count == 3) {
            ids =   ['bottom-player', 'left-player', 'top-player'];
        } else {
            ids =   ['bottom-player', 'left-player', 'top-player', 'right-player'];
        }
        game.pickDealer(ids);
    },*/
    extraSetup: function() {},
    extend: function(obj) {
        for (var i in this) {
            if (!obj[i]) {
                obj[i] = this[i];
            }
        }
        obj.base = this;
    }
};
$(document).ready(function() {
    try {
        window.game = webGame.createGameObject();
        webGame.createHumanPlayer();
        webGame.createComputerPlayers();
        webGame.setEventRenderers();
        webGame.setupSortHandler();
        webGame.setupPlayerCountHandler();
        webGame.setupDealHandler();
        webGame.setupRestartHandler();
        webGame.setupWinHandler();
        webGame.setupStartHandler();
        webGame.setupTurnHandler();
        webGame.setupMessageHandler();
        webGame.extraSetup();
        webGame.startGame();
        window.isTouch = false;
        $(document).bind('touchstart', function() {
            window.isTouch = true;
        });
    } catch (e) {
        alert(e);
    }
});

function WebGoFish() {}
WebGoFish.prototype = {
    createGameObject: function() {
        return new GoFish();
    },
    setupStartHandler: function() {
        game.setEventRenderer('start', function(e) {
            if (location.search && location.search.indexOf('autoplay') != -1) {
                ANIMATION_SPEED = 100;
                TAKE_TRICK_DELAY = 100;
                SHOWCARDS_DELAY = 100;
                for (var i = 0; i < game.players.length; i++) {
                    game.players[i].thinkTime = 200;
                }
            }
            webGame.bindCardEventHandlers();
            webRenderer.start(e);
        });
    },
    setupWinHandler: function() {
        game.setEventRenderer('win', function(e) {
            webGame.saveLastDealer();
            var winnerNames;
            if (e.winners.length == 1) {
                winnerNames = e.winners[0].name;
            } else if (e.winners.length == 2) {
                winnerNames = e.winners[0].name + ' and ' + e.winners[1].name;
            } else if (e.winners.length == 3) {
                winnerNames = e.winners[0].name + ', ' + e.winners[1].name + ' and ' + e.winners[2].name;
            }
            trackEvent('Win', winnerNames);
            trackEvent('FinishGame', winnerNames);
            makePlayersSad($A(e.winners).map(function(p) {
                return p.id;
            }));
            window.zIndexCounter++;
            if (e.winners.length == 1) {
                if (e.winners[0].name == 'You') {
                    window.result = 'Win';
                    $('#result-box h3').text('YOU WIN THE GAME!');
                } else {
                    window.result = 'Lose';
                    $('#result-box h3').text(winnerNames.toUpperCase() + ' WINS THE GAME!');
                }
            } else {
                window.result = 'Multiple';
                $('#result-box h3').text(winnerNames.toUpperCase() + ' WIN THE GAME!');
            }
            for (var i = 0; i < e.game.players.length; i++) {
                var p = e.game.players[i];
                p.stats.score = p.tricks.length;
                if ($A(e.winners).contains(p)) {
                    if (e.winners.length == 1) {
                        p.stats.result = 'win';
                    } else {
                        p.stats.result = 'draw';
                    }
                } else {
                    p.stats.result = 'lose';
                }
            }
            stats.finishGame(e.game.players);
            var resultBoxWidth = '330px';
            if (e.winners.length == 2) {
                resultBoxWidth = '400px';
            } else if (e.winners.length == 3) {
                resultBoxWidth = '510px';
            }
            $('#result-box span.winner-img').css('display', 'none');;
            for (var i = 0; i < e.winners.length; i++) {
                $('#result-box span#' + e.winners[i].id + '-win').css('display', 'inline-block');
            }
            $('#messageBox').hide();
            $('#result-box').css({
                'z-index': zIndexCounter,
                width: resultBoxWidth
            }).show();
        });
    },
    setupTurnHandler: function() {
        game.setEventRenderer('playerturn', function(e) {
            if (e.player.isHuman) {
                e.game.message('Your turn! Click on the person you want to ask');
            } else {
                e.game.message(e.player.name + "'s turn!");
            }
            webRenderer.playerTurn(e);
        });
    },
    extraSetup: function() {
        $('#askdiv span').click(function() {
            var rank = parseInt($(this).attr('id').substr('ask-'.length));
            $('#askdiv').hide();
            human.clickRank(rank);
        });
        $('#fish-button').click(function() {
            human.clickGoFish();
        });
        $('.avatar').click(function() {
            human.clickPlayer($(this).attr('id'));
        });
        $('.bubble').html('<img src="img/fish.png"/><div></div><p><span></span></p>');
        /*webGame.loadLastDealer();*/
    },
    setEventRenderers: function() {
        this.base.setEventRenderers.call(this);
        game.setEventRenderer('ask', webRenderer.ask);
        game.setEventRenderer('gofish', webRenderer.goFish);
        game.setEventRenderer('drawrightcard', webRenderer.drawRightCard);
        game.setEventRenderer('drawwrongcard', webRenderer.drawWrongCard);
        game.setEventRenderer('givecards', webRenderer.giveCards);
        game.setEventRenderer('drawcard', webRenderer.drawCard);
        game.setEventRenderer('taketrick', webRenderer.takeTrick);
    }
}
WebCardGame.prototype.extend(WebGoFish.prototype);
window.webGame = new WebGoFish();
stats.enabled = true;