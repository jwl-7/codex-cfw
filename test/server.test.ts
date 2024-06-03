import { expect } from 'chai'
import { describe, it, beforeEach, afterEach } from 'mocha'
import { InteractionResponseType, InteractionType } from 'discord-interactions'
import sinon, { SinonStub } from 'sinon'
import server, { IEnv } from '../src/server'


describe('Server', () => {
    const REQUEST_URL = 'http://test.url/'
    const REQUEST_ENV: IEnv = { DISCORD_APPLICATION_ID: '123456789' }

    describe('GET /', () => {
        it('should return a greeting message with the Discord application ID', async () => {
            const request = {
                method: 'GET',
                url: REQUEST_URL,
            }
            const response = await server.fetch(request, REQUEST_ENV)
            const body = await response.text()

            expect(body).to.equal('👋 123456789')
        })
    })

    describe('POST /', () => {
        let verifyDiscordRequestStub: SinonStub

        beforeEach(() => {
            verifyDiscordRequestStub = sinon.stub(server, 'verifyDiscordRequest')
        })

        afterEach(() => {
            verifyDiscordRequestStub.restore()
        })

        it('should handle a PING interaction', async () => {
            const interaction = {
                type: InteractionType.PING,
            }
            const request = {
                method: 'POST',
                url: REQUEST_URL
            }

            verifyDiscordRequestStub.resolves({
                isValid: true,
                interaction: interaction,
            })

            const response = await server.fetch(request, REQUEST_ENV)
            const body = await response.json()

            expect(body.type).to.equal(InteractionResponseType.PONG)
        })

        it('should handle an unknown command interaction', async () => {
            const interaction = {
                type: InteractionType.APPLICATION_COMMAND,
                data: {
                    name: 'unknown',
                },
            }
            const request = {
                method: 'POST',
                url: REQUEST_URL
            }

            verifyDiscordRequestStub.resolves({
                isValid: true,
                interaction: interaction,
            })

            const response = await server.fetch(request, {})
            const body = await response.json()

            expect(response.status).to.equal(400)
            expect(body.error).to.equal('Unknown Type')
        })
    })
})
