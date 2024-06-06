import { expect } from 'chai'
import { describe, it} from 'mocha'
import { getRandomDiceRoll, getRandomElement } from '@/utils/random'


describe('Random Tests', () => {
    describe('getRandomElement', () => {
        const numbers: Array<number> = [1, 2, 3, 4, 5]
        const letters: Array<string> = ['a', 'b', 'c', 'd', 'e']

        it('should get random element of same type as input', () => {
            const numberResults = new Set<number>()
            const letterResults = new Set<string>()

            for (let i = 0; i < 10; i++) {
                const randomNumber = getRandomElement(numbers)
                const randomLetter = getRandomElement(letters)
                expect(randomNumber).to.be.a('number')
                expect(randomLetter).to.be.a('string')
                numberResults.add(randomNumber)
                letterResults.add(randomLetter)
            }

            expect(numberResults.size).to.be.greaterThan(3)
            expect(letterResults.size).to.be.greaterThan(3)
        })
    })

    describe('getRandomDiceRoll', () => {
        it('should get random number within range', () => {
            for (let i = 0; i < 10; i++) {
                const diceRoll = getRandomDiceRoll()
                expect(diceRoll).to.be.a('number')
                expect(diceRoll).to.be.within(1, 6)
            }
        })
    })
})
