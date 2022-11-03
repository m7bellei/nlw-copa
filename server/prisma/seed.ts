import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Snow',
            email: 'john_snow@gmail.com',
            avatarUrl: 'https://github.com/johnsnow.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Pool 1',
            code: '123456',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id,
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2021-11-04T12:00:00.201Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })

    await prisma.game.create({
        data: {
            date: '2021-11-05T12:00:00.201Z',
            firstTeamCountryCode: 'AR',
            secondTeamCountryCode: 'BR',

            guesses: {
                create: {
                    firstTeamPoints: 1,
                    secondTeamPoints: 2,
                    
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })

}

main() 