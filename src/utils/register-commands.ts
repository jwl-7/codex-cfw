import { commands } from '@/commands'
import 'dotenv/config'


(async function registerDiscordCommands(): Promise<void> {
    const DISCORD_TOKEN = process.env.DISCORD_TOKEN
    const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID
    const DISCORD_API_URL = `https://discord.com/api/v10/applications/${DISCORD_APPLICATION_ID}/commands`

    if (!DISCORD_TOKEN) throw new Error('Missing DISCORD_TOKEN environment variable.')
    if (!DISCORD_APPLICATION_ID) throw new Error('Missing DISCORD_APPLICATION_ID environment variable.')

    try {
        const response = await fetch(DISCORD_API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${DISCORD_TOKEN}`,
            },
            body: JSON.stringify(Object.values(commands)),
        })

        if (response.ok) {
            console.log('Registered all commands successfully.')
            const data = await response.json()
            console.log(JSON.stringify(data, null, 2))
        } else {
            console.error(`Failed to register commands. Status: ${response.status} ${response.statusText}`)
            const errorText = await response.text()
            if (errorText) console.error('Error details:', errorText)
        }
    } catch (error) {
        console.error('An error occurred while registering commands:', error)
    }
})()
