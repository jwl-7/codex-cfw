export function getRandomElement<T>(list: Array<T>): T {
    return list[Math.floor((Math.random() * list.length))]
}

export function getRandomDiceRoll(): number {
    return Math.floor(Math.random() * 6) + 1
}
