import { expect } from 'chai'
import sinon, { SinonStub } from 'sinon'
import { pingAPI } from '@utils/requests'


describe('Requests Tests', () => {
    describe('pingAPI', () => {
        const API_URL = 'https://jsonplaceholder.typicode.com/posts/1'
        let fetchStub: SinonStub

        beforeEach(() => {
            fetchStub = sinon.stub(global, 'fetch')
        })

        afterEach(() => {
            sinon.restore()
        })

        it('should return true for successful API ping', async () => {
            fetchStub.resolves({ ok: true })
            const result = await pingAPI(API_URL)

            expect(result).to.be.true
        })

        it('should return false for failed API ping', async () => {
            fetchStub.resolves({ ok: false })
            const result = await pingAPI(API_URL)

            expect(result).to.be.false
        })

        it('should return false for error in API ping', async () => {
            fetchStub.rejects(new Error('Fetch error'))
            const result = await pingAPI(API_URL)

            expect(result).to.be.false
        })
    })
})
