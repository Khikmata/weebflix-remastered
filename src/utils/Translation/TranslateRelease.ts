export function TranslateSeasonToRussian(season: string) {
    switch (season) {
        case 'winter':
            return 'Зима'
        case 'summer':
            return 'Лето'
        case 'fall':
            return 'Осень'
        case 'spring':
            return 'Весна'
        default:
            return season
    }
}
