import { api } from '../lib/axios'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-years-beginning.ts'
import { HabitDay } from './HabitDay'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDtesSizes = 18 * 7 //18 semanas
const amountOfDaysToFill = minimumSummaryDtesSizes - summaryDates.length

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[]

export function SummaryTable() {

  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get('summary').then(response => setSummary(response.data))
  }, [])

  return (
    <div className='w-full h-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-1'>
        {weekDays.map((weekDay, i) => {
          return (
            <div key={`${weekDay}-${i}`} className='text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center'>
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className='grid grid-rows-7 grid-flow-col gap-2'>
        {summary.length > 0 && summaryDates.map(date => {

          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
            />)
        })}
        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => { //por causa do array vazio(caso especifico)
          return (
            <div
              key={i}
              className='bg-zinc-900 w-10 h-10 text-white rounded m-1/2 text-center flex items-center justify-center opacity-40 cursor-not-allowed' />
          )
        })}
      </div>
    </div>
  )
}