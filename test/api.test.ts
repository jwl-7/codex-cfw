import { expect } from 'chai'
import { describe, it} from 'mocha'
import { pingAPI } from '@utils/requests'
import { constants } from '@/utils/constants'


describe('API Tests', () => {
    it('should ping Merriam-Webster API', async () => {
        const ping = await pingAPI(constants.MERRIAM_WEBSTER_API_URL)
        expect(ping).to.be.true
    })

    it('should ping Urban Dictionary API', async () => {
        const ping = await pingAPI(constants.URBAN_DICTIONARY_API_URL)
        expect(ping).to.be.true
    })

    it('should ping CS Joke API', async () => {
        const ping = await pingAPI(constants.CS_JOKE_API_URL)
        expect(ping).to.be.true
    })

    it('should ping Joke API', async () => {
        const ping = await pingAPI(constants.JOKE_API_URL)
        expect(ping).to.be.true
    })


    it('should ping Dog API', async () => {
        const ping = await pingAPI(constants.DOG_API_URL)
        expect(ping).to.be.true
    })

    it('should ping LMDDGTFY', async () => {
        const ping = await pingAPI(constants.LMDDGTFY_URL)
        expect(ping).to.be.true
    })
})
