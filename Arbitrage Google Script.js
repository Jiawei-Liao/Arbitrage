const PROJECT_ID = 'arbitrage-604fb';
const COLLECTION_NAME = 'users';
const PRIVATE_KEY_ID = 'PRIVATE_KEY_ID';
const CLIENT_EMAIL = 'CLIENT_EMAIL';
const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\PRIVATE_KEY=\n-----END PRIVATE KEY-----\n';

const API_KEYS = ['', '', '', '', ''];

const TEST_ARBITRAGE_DATA = [
  {
    awayTeam: "Liberty Flames",
    awayTeamOdds: 1.91,
    profitPercentage: 41.76,
    homeTeamOdds: 17.0,
    homeTeam: "Kennesaw State Owls",
    odds: 0.5823837388358485,
    homeTeamBookmaker: "SportsBet",
    group: "NCAAF",
    awayTeamBookmaker: "Unibet",
    commence_time: "2024-10-23T23:00:00Z"
  },
  {
    commence_time: "2024-10-26T16:00:00Z",
    group: "NCAAF",
    odds: 0.5823837388358485,
    homeTeamOdds: 17.0,
    awayTeamBookmaker: "PlayUp",
    profitPercentage: 41.76,
    awayTeamOdds: 1.91,
    awayTeam: "Nebraska Cornhuskers",
    homeTeamBookmaker: "SportsBet",
    homeTeam: "Ohio State Buckeyes"
  },
  {
    awayTeamOdds: 15.0,
    group: "NCAAF",
    commence_time: "2024-10-26T19:30:00Z",
    homeTeamOdds: 1.85,
    homeTeamBookmaker: "PlayUp",
    homeTeam: "James Madison Dukes",
    profitPercentage: 39.28,
    awayTeam: "Southern Mississippi Golden Eagles",
    odds: 0.6072072072072071,
    awayTeamBookmaker: "Neds"
  },
  {
    awayTeam: "Florida State Seminoles",
    homeTeamBookmaker: "Neds",
    awayTeamOdds: 1.92,
    homeTeamOdds: 11.0,
    commence_time: "2024-10-26T23:00:00Z",
    profitPercentage: 38.83,
    homeTeam: "Miami Hurricanes",
    awayTeamBookmaker: "PlayUp",
    group: "NCAAF",
    odds: 0.6117424242424243
  },
  {
    homeTeamOdds: 1.88,
    odds: 0.7260896508985747,
    awayTeam: "Baltimore Ravens",
    homeTeamBookmaker: "TopSport",
    commence_time: "2024-10-27T17:00:00Z",
    awayTeamBookmaker: "SportsBet",
    profitPercentage: 27.39,
    group: "NFL",
    homeTeam: "Cleveland Browns",
    awayTeamOdds: 5.15
  },
  {
    awayTeam: "New Orleans Saints",
    homeTeamOdds: 1.9,
    awayTeamOdds: 4.2,
    awayTeamBookmaker: "Betfair",
    odds: 0.7644110275689222,
    homeTeam: "Los Angeles Chargers",
    homeTeamBookmaker: "TopSport",
    group: "NFL",
    commence_time: "2024-10-27T20:05:00Z",
    profitPercentage: 23.56
  },
  {
    profitPercentage: 17.82,
    odds: 0.8217699660807893,
    awayTeam: "New York Giants",
    homeTeam: "Pittsburgh Steelers",
    group: "NFL",
    awayTeamOdds: 1.88,
    homeTeamBookmaker: "Betfair",
    homeTeamOdds: 3.45,
    awayTeamBookmaker: "TopSport",
    commence_time: "2024-10-29T00:16:00Z"
  },
  {
    homeTeamBookmaker: "Unibet",
    homeTeam: "Tampa Bay Buccaneers",
    awayTeam: "Baltimore Ravens",
    profitPercentage: 10.81,
    odds: 0.8919022154316272,
    group: "NFL",
    awayTeamOdds: 2.8,
    homeTeamOdds: 1.87,
    commence_time: "2024-10-22T00:15:54Z",
    awayTeamBookmaker: "TopSport"
  },
  {
    homeTeamOdds: 2.58,
    commence_time: "2024-10-27T17:00:00Z",
    homeTeamBookmaker: "Betfair",
    homeTeam: "Miami Dolphins",
    awayTeamOdds: 1.89,
    profitPercentage: 8.33,
    odds: 0.9166974283253353,
    awayTeamBookmaker: "TopSport",
    awayTeam: "Arizona Cardinals",
    group: "NFL"
  },
  {
    awayTeam: "Campbell Hatton",
    profitPercentage: 2.55,
    odds: 0.974512743628186,
    homeTeamBookmaker: "Betfair",
    commence_time: "2024-10-26T18:00:00Z",
    awayTeamBookmaker: "Betfair",
    awayTeamOdds: 2.32,
    homeTeam: "James Flint",
    group: "Boxing",
    homeTeamOdds: 1.84
  },
  {
    group: "NFL",
    commence_time: "2024-10-27T20:25:00Z",
    awayTeamOdds: 2.32,
    homeTeamOdds: 1.82,
    awayTeamBookmaker: "Betfair",
    odds: 0.98048503220917,
    homeTeamBookmaker: "TopSport",
    homeTeam: "Washington Commanders",
    awayTeam: "Chicago Bears",
    profitPercentage: 1.95
  },
  {
    group: "NFL",
    homeTeam: "Tampa Bay Buccaneers",
    homeTeamOdds: 2.2,
    odds: 0.9950859950859949,
    commence_time: "2024-10-27T17:00:00Z",
    profitPercentage: 0.49,
    awayTeam: "Atlanta Falcons",
    homeTeamBookmaker: "Betr",
    awayTeamOdds: 1.85,
    awayTeamBookmaker: "TopSport"
  },
  {
    profitPercentage: 0.27,
    awayTeamBookmaker: "Betfair",
    commence_time: "2024-10-26T20:45:00Z",
    homeTeam: "Ilia Topuria",
    awayTeamOdds: 3.25,
    group: "MMA",
    homeTeamBookmaker: "TAB",
    homeTeamOdds: 1.45,
    awayTeam: "Max Holloway",
    odds: 0.9973474801061009
  }
];

function main() {
  let arbitrages = fetchArbitrages();
  let emails = fetchFirestoreData();
  sendEmails(emails, arbitrages);
}

function findArbitrageOpportunity(match) {
  let { bookmakers, home_team, away_team, commence_time, sport_title } = match;

  if (bookmakers.length === 0) return null;

  let hasDraw = bookmakers[0].markets[0].outcomes.length === 3;
  let bestOdds = { home: 0, away: 0, draw: 0 };
  let bestBookmakers = { home: '', away: '', draw: '' };

  for (let bookmaker of bookmakers) {
    let outcomes = bookmaker.markets[0].outcomes;

    if (outcomes[0].price > bestOdds.home) {
      bestOdds.home = outcomes[0].price;
      bestBookmakers.home = bookmaker.title;
    }

    if (outcomes[1].price > bestOdds.away) {
      bestOdds.away = outcomes[1].price;
      bestBookmakers.away = bookmaker.title;
    }

    if (hasDraw && outcomes[2].price > bestOdds.draw) {
      bestOdds.draw = outcomes[2].price;
      bestBookmakers.draw = bookmaker.title;
    }
  }

  let totalOdds = 1 / bestOdds.home + 1 / bestOdds.away + (hasDraw ? 1 / bestOdds.draw : 0);

  if (totalOdds < 1) {
    let arbitrageData = {
      homeTeam: home_team,
      homeTeamOdds: bestOdds.home,
      homeTeamBookmaker: bestBookmakers.home,
      awayTeam: away_team,
      awayTeamOdds: bestOdds.away,
      awayTeamBookmaker: bestBookmakers.away,
      commence_time,
      group: sport_title,
      odds: totalOdds,
      profitPercentage: ((1 - totalOdds) * 100).toFixed(2)
    };

    if (hasDraw) {
      arbitrageData.data.drawTeam = 'Draw';
      arbitrageData.data.drawTeamOdds = bestOdds.draw;
      arbitrageData.data.drawTeamBookmaker = bestBookmakers.draw;
    }

    return arbitrageData;
  }

  return null;
}

function fetchArbitrages() {
  // Fetch available sports
  let url = `https://api.the-odds-api.com/v4/sports/?apiKey=${API_KEYS[0]}`;

  let options = {
    'method': 'GET',
    'muteHttpExceptions': true
  };

  let sports = []
  try {
    let response = UrlFetchApp.fetch(url, options);
    let data = JSON.parse(response.getContentText());

    sports = data.map(function(sport) {
      return sport.key;
    });
  } catch (e) {
    Logger.log('Error fetching available sports: ', e.message);
  }

  // For each sports, try to find an arbitrage opportunity
  let arbitrages = [];
  let apiKey = API_KEYS[(new Date()).getDate() % API_KEYS.length];

  for (let sport of sports) {
    let url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=au&markets=h2h,spreads&oddsFormat=decimal`;
    try {
      let response = UrlFetchApp.fetch(url, options);
      let data = JSON.parse(response.getContentText());

      for (let match of data) {
        let newArbitrageOpportunity = findArbitrageOpportunity(match);
        if (newArbitrageOpportunity) {
          arbitrages.push(newArbitrageOpportunity);
        }
      }
    } catch(e) {
      Logger.log(e);
    }
  }

  arbitrages.sort((a, b) => {
    let profitA = parseFloat(a.profitPercentage.replace('%', ''));
    let profitB = parseFloat(b.profitPercentage.replace('%', ''));
    return profitB - profitA;
  })

  return arbitrages;
}

function getAccessToken() {
  // Define request details
  let tokenUrl = 'https://oauth2.googleapis.com/token';
  
  let header = {
    'alg': 'RS256',
    'typ': 'JWT'
  };
  
  let now = Math.floor(Date.now() / 1000);
  let claimSet = {
    'iss': CLIENT_EMAIL,
    'scope': 'https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/cloud-platform',
    'aud': tokenUrl,
    'iat': now,
    'exp': now + 3600
  };

  let jwt = Utilities.base64EncodeWebSafe(JSON.stringify(header)) + '.' + Utilities.base64EncodeWebSafe(JSON.stringify(claimSet));
  let signature = Utilities.base64EncodeWebSafe(Utilities.computeRsaSha256Signature(jwt, PRIVATE_KEY));
  let signedJwt = jwt + '.' + signature;

  let options = {
    'method': 'POST',
    'contentType': 'application/x-www-form-urlencoded',
    'payload': {
      'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      'assertion': signedJwt
    }
  };

  // Fetch access token
  let response = UrlFetchApp.fetch(tokenUrl, options);
  let token = JSON.parse(response.getContentText()).access_token;
  return token;
}

function fetchFirestoreData() {
  // Get Firebase data
  let accessToken = getAccessToken();
  let url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION_NAME}`;
  
  let options = {
    'method': 'GET',
    'headers': {
      'Authorization': 'Bearer ' + accessToken
    }
  };

  let response = UrlFetchApp.fetch(url, options);
  let data = JSON.parse(response.getContentText());

  // In case document is empty or collection doesn't exist
  if (!data || !data.documents) {
    Logger.log('No documents found or collection is empty.');
    return [];
  }

  // Extract emails from data
  let emails = [];
  data.documents.forEach(function(document) {
    if (document.fields && document.fields.email && document.fields.email.stringValue) {
      let email = document.fields.email.stringValue;
      let docID = document.name.split('/').pop();
      emails.push([email, docID]);
    }
  });

  return emails;
}

function sendEmails(emails, arbitrages) {
  if (emails.length === 0 || arbitrages.length === 0) {
    Logger.log('No emails or arbitrages to send.');
    return;
  }

  let subject = 'Latest Arbitrage Opportunities';

  // Create the initial message body
  let message = `
    <p style="font-family: Arial, sans-serif;">Here are the latest arbitrage opportunities:</p>
  `;

  // Loop through each arbitrage opportunity to build the message content
  for (let arbitrage of arbitrages) {
    let homeTeam = arbitrage.homeTeam;
    let awayTeam = arbitrage.awayTeam;
    let homeTeamOdds = arbitrage.homeTeamOdds;
    let awayTeamOdds = arbitrage.awayTeamOdds;
    let profitPercentage = arbitrage.profitPercentage;
    let drawOdds = arbitrage.drawOdds ? arbitrage.drawOdds : "N/A"; // Handle drawOdds if available
    let homeTeamBookmaker = arbitrage.homeTeamBookmaker || "N/A";
    let awayTeamBookmaker = arbitrage.awayTeamBookmaker || "N/A";
    let drawTeamOdds = arbitrage.drawTeamOdds || "N/A"; // Handle drawTeamOdds if available
    let drawTeamBookmaker = arbitrage.drawTeamBookmaker || "N/A";

    // Construct the card-like structure for the arbitrage opportunity
    message += `
      <div style="border: 1px solid #ccc; border-radius: 8px; padding: 16px; margin: 10px 0; max-width: 400px;">
        <h2 style="text-align: center; font-family: Arial, sans-serif;">${homeTeam} vs ${awayTeam}</h2>
        <p style="text-align: center; color: #666; font-family: Arial, sans-serif;">
          Group: ${arbitrage.group} <br />
          Date: ${new Date(arbitrage.commence_time).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })}
        </p>
        <hr style="border: 1px solid #eee;" />
        <div style="text-align: center;">
          <strong>Profit: ${profitPercentage}%</strong>
        </div>
        <hr style="border: 1px solid #eee;" />
        <div style="text-align: center;">
          <strong>${homeTeam}</strong><br />
          Odds: ${homeTeamOdds} | Bookmaker: ${homeTeamBookmaker}
        </div>
        ${arbitrage.drawTeam ? `
          <hr style="border: 1px solid #eee;" />
          <div style="text-align: center;">
            <strong>Draw</strong><br />
            Odds: ${drawTeamOdds} | Bookmaker: ${drawTeamBookmaker}
          </div>
        ` : ''}
        <hr style="border: 1px solid #eee;" />
        <div style="text-align: center;">
          <strong>${awayTeam}</strong><br />
          Odds: ${awayTeamOdds} | Bookmaker: ${awayTeamBookmaker}
        </div>
      </div>
    `;
  }

  message += `
    <p style="font-family: Arial, sans-serif;">Best Regards,<br>Your Arbitrage Calculator</p>
  `;

  // Helper function to capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Iterate through emails to send personalized messages
  for (let emailObj of emails) {
    let email = emailObj[0];
    let docID = emailObj[1];

    // Extract username from email
    let username = email.split('@')[0] || "Subscriber"; // Get the part before the '@' or default to "Subscriber"
    username = capitalizeFirstLetter(username); // Capitalize the first letter

    let unsubscribeLink = `https://jiawei-liao.github.io/Unsubscribe/${docID}`;
    let unsubscribeMessage = `If you wish to unsubscribe, click <a href="${unsubscribeLink}">here</a>.`;

    // Send the email with the personalized greeting and unsubscribe link
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: `
        <div style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
          <p style="margin: 0; padding: 0;">Dear ${username},</p>
          ${message}
          <p style="margin: 0; padding: 0;">${unsubscribeMessage}</p>
        </div>
      `
    });
  }
}
