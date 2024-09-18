/**
 * Configs
 */
let configAPI = [{
    // 
    api: "24c7a9bc2b6e742701f6f352ee34048b",
    disabled: "disabled"
    }, {
    api: "fa07ccaa26c7bdd1c1ca481fee871485",
    disabled: "disabled"
    }, {
    api: "0a2efe98359291b7e5e0206dedd0b6b3",
    disabled: "disabled"
    }, {
    // jiaweiliao121+1
    api: "d431ecb3d778521ba570b9c8a83451af",
    disabled: "disabled"
    }, {
    // fiametta011+1
    api: "e29843fd97c01c1a8e3d1876828623b7",
    disabled: ""
 }];

let configSports = ["aussierules_afl", "basketball_nba", "cricket_test_match", "soccer_australia_aleague"];
let configAvoidBookmakers = ["betr_au"];

let API_KEY;
let regions = `au`
let markets = `h2h`

let sports = [];
let selectedSports = [];

let matchData = [];
let arbitrageData = [];

/**
 * Displays the API keys in the config
 */
function displayConfigAPI() {
    let displayConfigAPIContainer = document.getElementById("displayConfigAPI");
    let container = "";
    for (let i = 0; i < configAPI.length; i++) {
        container += `<button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" onclick="useAPI(${i})" ${configAPI[i].disabled}>API ${i + 1}</button>`
    }
    displayConfigAPIContainer.innerHTML = container;
}

/**
 * Fills the API key input with the preset API
 */
function useAPI(index) {
    document.getElementById(`api`).value = configAPI[index].api;
    getSports();
}

/**
 * Gets the sports from the API
 * Does not cost quota
 */
async function getSports() {
    API_KEY = document.getElementById(`api`).value;
    let response = await fetch(`https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEY}`);
    sports = await response.json();
    showSports();
}

/**
 * Shows the sports in a list
 * If the sport is a default sport, it will be checked
 */
function showSports() {
    let sportsListContainer = document.getElementById(`sports`);
    previousGroup = ``;
    currentGroup = ``;
    let container = `
        <div class="bet-type">
            <span>Bet Type: </span>
            <label class = "mdl-radio mdl-js-radio" for = "arbitrage">
            <input type = "radio" id = "arbitrage" name = "betType" class = "mdl-radio__button" checked>
            <span class = "mdl-radio__label">Arbitrage</span></label>
            <label class = "mdl-radio mdl-js-radio" for = "value">
            <input type = "radio" id = "value" name = "betType" class = "mdl-radio__button">
            <span class = "mdl-radio__label">Value</span></label>
        </div>
    `;
    container += `<div>`;
    for (let i=0; i<sports.length; i++) {
        currentGroup = sports[i].group;
        if (currentGroup !== previousGroup) {
            container += `</div><div class="arbitrage-table-bet"><b>${currentGroup}</b></div><div class="sports-checkbox">`;
            previousGroup = currentGroup;
        }
        container += `
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${sports[i].key}">
        <input type="checkbox" id="${sports[i].key}" class="mdl-checkbox__input" value="${sports[i].key}" ${(configSports.includes(sports[i].key)) ? "checked" : ""}>
        <span class="mdl-checkbox__label">${sports[i].title}</span>
        </label>`
    }
    container += 
    `<div class="sports-checkbox">
    <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" onclick="getMatches()">Get Matches</button>
    </div>`
    sportsListContainer.innerHTML = container;
}


/**
 * Gets the match list from the API
 */
async function getMatches() {
    getSelectedSports();
    matchData = [];

    for (let i=0; i<selectedSports.length; i++) {
        console.log(`Getting Matches from: https://api.the-odds-api.com/v4/sports/${selectedSports[i]}/odds/?apiKey=${API_KEY}&regions=${regions}&markets=${markets},spreads&oddsFormat=decimal`);
        let response = await fetch(`https://api.the-odds-api.com/v4/sports/${selectedSports[i]}/odds/?apiKey=${API_KEY}&regions=${regions}&markets=${markets},spreads&oddsFormat=decimal`);
        let data = await response.json();
        for (let j=0; j<data.length; j++) {
            if (data[j].message !== `undefined`) {
                matchData.push(data[j]);
            }
        }
    }
    for (let i=0; i<matchData.length; i++) {
        if (Date.now() > Date.parse(matchData[i].commence_time)) {
            matchData.splice(i,1);
        }
    }
    if (document.getElementsByName(`betType`)[0].checked) {
        arbitrageAPIMatches();
    } else {
        valueAPIMatches();
    }
}

/**
 * Gets the selected sports from the checkboxes
 */
function getSelectedSports() {
    let selected = document.querySelectorAll(`input[type="checkbox"]:checked`);
    selectedSports = [];
    for (let i=0; i<selected.length; i++) {
        selectedSports.push(selected[i].value);
    }
}

/**
 * Processes data from matchData
 */
function arbitrageAPIMatches() {
    arbitrageData = [];
    for (let i=0; i<matchData.length; i++) {
        scanMatch(i);
        if (matchData[i].bookmakers.length > 0) {
            arbitrageMatch(matchData[i]);
        }
    }
    displayArbitrage();
}

/**
 * Scans the match for any bookmakers that are "bad"
 */
function scanMatch(index) {
    for (let i=0; i<matchData[index].bookmakers.length; i++) {
        if (configAvoidBookmakers.includes(matchData[index].bookmakers[i].key)) {
            matchData[index].bookmakers.splice(i,1);
        }
    }
}

/**
 * Insert arbitrage data into arbitrageData, biggest odds first
 */
function arbitrageDataInsert(data) {
    for (let i=0; i<arbitrageData.length; i++) {
        if (data.odds > arbitrageData[i].odds) {
            arbitrageData.splice(i,0,data);
            return;
        }
    }
    arbitrageData.push(data);
}

/**
 * Checks for arbitrage opportunities
 */
function arbitrageMatch(match) {
    hasDraw = (match.bookmakers[0].markets[0].outcomes.length == 3);
    homeTeam = match.home_team;
    homeTeamOdds = match.bookmakers[0].markets[0].outcomes[0].price;
    homeTeamBookmaker = match.bookmakers[0].title;
    awayTeam = match.away_team;
    awayTeamOdds = match.bookmakers[0].markets[0].outcomes[1].price;
    awayTeamBookmaker = match.bookmakers[0].title;

    if (hasDraw) {
        drawTeam = "Draw";
        drawTeamOdds = match.bookmakers[0].markets[0].outcomes[2].price;
        drawTeamBookmaker = match.bookmakers[0].title;
    }

    for (let i=1; i<match.bookmakers.length; i++) {
        currentOdds = match.bookmakers[i]
        if (homeTeamOdds < currentOdds.markets[0].outcomes[0].price) {
            homeTeamOdds = currentOdds.markets[0].outcomes[0].price;
            homeTeamBookmaker = currentOdds.title;
        }
        if (awayTeamOdds < currentOdds.markets[0].outcomes[1].price) {
            awayTeamOdds = currentOdds.markets[0].outcomes[1].price;
            awayTeamBookmaker = currentOdds.title;
        }
        if (hasDraw) {
            if (drawTeamOdds < currentOdds.markets[0].outcomes[2].price) {
                drawTeamOdds = currentOdds.markets[0].outcomes[2].price;
                drawTeamBookmaker = currentOdds.title;
            }
        }
    }
    if (hasDraw) {
        odds = 1/homeTeamOdds + 1/awayTeamOdds + 1/drawTeamOdds;
    } else {
        odds = 1/homeTeamOdds + 1/awayTeamOdds
    }

    if (odds < 1) {
        if (hasDraw) {
            arbitrageDataInsert({
                odds: 1/odds,
                data: {homeTeam: homeTeam,
                    homeTeamOdds: homeTeamOdds,
                    homeTeamBookmaker: homeTeamBookmaker,
                    awayTeam: awayTeam,
                    awayTeamOdds: awayTeamOdds,
                    awayTeamBookmaker: awayTeamBookmaker,
                    drawTeam: drawTeam,
                    drawTeamOdds: drawTeamOdds,
                    drawTeamBookmaker: drawTeamBookmaker,
                    commence_time: match.commence_time,
                    group: match.sport_title,
                    odds: odds
                }
            });
        } else {
            arbitrageDataInsert({
                odds: 1/odds,
                data: {homeTeam: homeTeam,
                    homeTeamOdds: homeTeamOdds,
                    homeTeamBookmaker: homeTeamBookmaker,
                    awayTeam: awayTeam,
                    awayTeamOdds: awayTeamOdds,
                    awayTeamBookmaker: awayTeamBookmaker,
                    commence_time: match.commence_time,
                    group: match.sport_title,
                    odds: odds
                }
            });
        }
    }
}

/**
 * Displays arbitrage opportunities
 */
function displayArbitrage() {
    let arbitrageContainer = document.getElementById(`arbitrageOpportunities`);
    let container = ``;
    if (arbitrageData.length == 0) {
        container += `<h5 class="no-arbitrage">No arbitrage opportunities found</h5>`;
    }
    for (let i=0; i<arbitrageData.length; i++) {
        data = arbitrageData[i].data;
        let commenceTime = new Date(data.commence_time);
        let displayCommenceTime = `${commenceTime.toString().split(" ").splice(0,4).join(" ")}`;
        let AmOrPm = commenceTime.getHours() > 12 ? "PM" : "AM";
        let hours = (commenceTime.getHours() % 12) || 12;
        betAmount = calculateBetAmount(data);
        if (i>0) {
            container += `<hr class="hr">`;
        }
        container += `
            <div class="arbitrage-table">
                <h4 class="arbitrage-table-p">${data.group}: ${data.homeTeam} vs. ${data.awayTeam}</h4>
                <h5 class="arbitrage-table-p">Profit: ${Math.round((1/data.odds - 1)*10000)/100}%</h5>
                <h5 class="arbitrage-table-p">${displayCommenceTime}, ${hours}:${("0" + commenceTime.getMinutes()).slice(-2)} ${AmOrPm}<h5>
            </div>
            <div class="arbitrage-table-option-flex">
                <div class="arbitrage-table-option">
                    <p class="arbitrage-table-option-p">${data.homeTeam}</p>
                    <p class="arbitrage-table-option-p">${data.homeTeamOdds}</p>
                    <p class="arbitrage-table-option-p">${data.homeTeamBookmaker}</p>
                </div>
                <div class="arbitrage-table-option">
                    <p class="arbitrage-table-option-p">${data.awayTeam}</p>
                    <p class="arbitrage-table-option-p">${data.awayTeamOdds}</p>
                    <p class="arbitrage-table-option-p">${data.awayTeamBookmaker}</p>
                </div>`;
        if (data.drawTeam) {
            container += `
                <div class="arbitrage-table-option">
                    <p class="arbitrage-table-option-p">${data.drawTeam}</p>
                    <p class="arbitrage-table-option-p">${data.drawTeamOdds}</p>
                    <p class="arbitrage-table-option-p">${data.drawTeamBookmaker}</p>
                </div>`
            }
        container += `
        </div>
        <br>
        <div>
            <h5 class="arbitrage-table-bet">Bet: ${(data.drawTeam)? calculateBetAmountDraw(data) : calculateBetAmount(data)}<h5>
        </div>
        `;
    }
    arbitrageContainer.innerHTML = container;
}

function calculateBetAmount(data) {
    maxBetAmount = 100;
    odds = [Number(data.homeTeamOdds), Number(data.awayTeamOdds)];
    betAmount = [
        maxBetAmount/(1 + (odds[0]/odds[1])),
        maxBetAmount/(1 + (odds[1]/odds[0]))
    ];
    minIndex = odds.indexOf(Math.min(...odds));
    ratio = maxBetAmount/betAmount[minIndex];
    betAmount = betAmount.map(x => Math.round(100*x*ratio)/100);

    return `$${betAmount[0]} | $${betAmount[1]}`;
}

function calculateBetAmountDraw(data) {
    maxBetAmount = 100;
    odds = [Number(data.homeTeamOdds), Number(data.awayTeamOdds), Number(data.drawTeamOdds)];
    betAmount = [
        maxBetAmount/(1 + (odds[0]/odds[1]) + (odds[0]/odds[2])),
        maxBetAmount/(1 + (odds[1]/odds[0]) + (odds[1]/odds[2])),
        maxBetAmount/(1 + (odds[2]/odds[0]) + (odds[2]/odds[1]))
    ];
    minIndex = betAmount.indexOf(Math.min(...betAmount));
    ratio = maxBetAmount/betAmount[minIndex];
    betAmount = betAmount.map(x => Math.round(100*x*ratio)/100);

    return `$${betAmount[0]} | $${betAmount[1]} | $${betAmount[2]}`;
}

function valueAPIMatches() {
    console.log("NOT DONE");
}