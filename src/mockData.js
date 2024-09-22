
export const localStorageMock = (function() {
    let store = {}
    return {
        getItem: function(key) {
            return store[key] || null
        },
        setItem: function(key, value) {
            store[key] = value.toString()
        },
        clear: function() {
            store = {}
        }
    }
})()

export const mockSportsData = [
    {
        "key": "aussierules_afl",
        "group": "Aussie Rules",
        "title": "AFL",
        "description": "Aussie Football",
        "active": true,
        "has_outrights": false
    },
    {
        "key": "basketball_nba",
        "group": "Basketball",
        "title": "NBA",
        "description": "US Basketball",
        "active": true,
        "has_outrights": false
    },
    {
        "key": "cricket_test_match",
        "group": "Cricket",
        "title": "Test Matches",
        "description": "International Test Matches",
        "active": true,
        "has_outrights": false
    }
]
  
export const mockHeaders = new Headers({
    'x-requests-remaining': '100'
})
  
export const mockValidationSuccessResponse = {
    ok: true,
    json: () => Promise.resolve(mockSportsData),
    headers: mockHeaders
}
  
export const mockValidationErrorResponse = {
    ok: false
}

export const mockMatchData = {
    awayTeam: "Chicago Blackhawks",
    awayTeamBookmaker: "TABtouch",
    awayTeamOdds: 1.93,
    commence_time: "2024-10-09T02:10:00Z",
    group: "NHL",
    homeTeam: "Utah Hockey Club",
    homeTeamBookmaker: "TABtouch", 
    homeTeamOdds: 3.2,
    odds: 0.8306347150259068,
    profitPercentage: "16.94"
}