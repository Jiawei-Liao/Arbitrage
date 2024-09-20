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
  
export const mockSuccessResponse = {
    ok: true,
    json: () => Promise.resolve(mockSportsData),
    headers: mockHeaders
}
  
export const mockErrorResponse = {
    ok: false
}

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