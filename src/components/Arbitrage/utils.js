export function findArbitrageOpportunities(match) {
    const { bookmakers, home_team, away_team, commence_time, sport_title } = match

    if (bookmakers.length === 0) return null

    const hasDraw = bookmakers[0].markets[0].outcomes.length === 3
    let bestOdds = { home: 0, away: 0, draw: 0 }
    let bestBookmakers = { home: '', away: '', draw: '' }

    for (const bookmaker of bookmakers) {
        const outcomes = bookmaker.markets[0].outcomes

        if (outcomes[0].price > bestOdds.home) {
            bestOdds.home = outcomes[0].price
            bestBookmakers.home = bookmaker.title
        }

        if (outcomes[1].price > bestOdds.away) {
            bestOdds.away = outcomes[1].price
            bestBookmakers.away = bookmaker.title
        }

        if (hasDraw && outcomes[2].price > bestOdds.draw) {
            bestOdds.draw = outcomes[2].price
            bestBookmakers.draw = bookmaker.title
        }
    }

    const totalOdds = 1 / bestOdds.home + 1 / bestOdds.away + (hasDraw ? 1 / bestOdds.draw : 0)

    if (totalOdds < 1) {
        const arbitrageData = {
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
        }

        if (hasDraw) {
            arbitrageData.data.drawTeam = "Draw"
            arbitrageData.data.drawTeamOdds = bestOdds.draw
            arbitrageData.data.drawTeamBookmaker = bestBookmakers.draw
        }

        return arbitrageData
    }

    return null
}