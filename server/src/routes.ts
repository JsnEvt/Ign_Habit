import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export async function appRoutes(app: FastifyInstance) {
  //rota da criacao do novo habito
  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)) //representando de domingo a sabado.
    })
    const { title, weekDays } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay,
            }
          })
        }
      }
    })
  })
  //rota do detalhe do dia (habitos completos/possiveis)
  app.get('/day', async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date() //para forcar a conversao da data(string) em uma data de fato.
    })

    const { date } = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')

    //todos os habitos possiveis
    //habitos que ja foram cumpridos.

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    }) ?? []

    return {
      possibleHabits,
      completedHabits,
    }
  })
  //marcar e desmarcar o habito ----- analisar pq nao esta retornando o completado no insomnia
  app.patch('/habits/:id/toggle', async (request) => {
    const toogleHabitParams = z.object({
      id: z.string().uuid(),
    })
    const { id } = toogleHabitParams.parse(request.params)

    const today = dayjs().startOf('day').toDate() //para considerar apenas a data e ignorar as horas.

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      }
    })
    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        }
      }
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        }
      })
    } else {
      //completar o habito
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    }
  })

  app.get('/summary', async () => {
    //retorne um [{data, amountOfHabits, amountCompleted} , {}]
    //sera digitado as querys manualmente, nao serao compativeis com outros banco de dados
    //compatibilidade: SQLite
    //Epoch Timestamp guarda a data em segundos desde 1/1/1970

    const summary = await prisma.$queryRaw`
      SELECT 
      D.id, 
      D.date,
      (
        SELECT 
        cast(count(*) as float)
        FROM days_habits DH 
        WHERE DH.day_id = D.id
      ) as completed,
      (
        SELECT
        cast(count(*) as float)
        FROM habit_week_days HWD
        JOIN habits H 
          ON H.id = HWD.habit_id
        WHERE
          HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
          AND H.created_at <= D.date
      ) as amount
      FROM days D 
    `
    return summary

  })

}

