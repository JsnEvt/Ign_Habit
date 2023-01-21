import { View, ScrollView, Text, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native'
import { BackButton } from '../components/BackButton';
import dayjs from 'dayjs'
import { ProgressBar } from '../components/ProgressBar';
import { CheckBox } from '../components/CheckBox';
import { useState, useEffect } from 'react';
import { Loading } from '../components/Loading';
import { api } from '../lib/axios';
import { generateProgressPercentage } from '../utils/generate-progress-percentage'
import { HabitsEmpty } from '../components/HabitsEmpty'
import clsx from 'clsx'


interface Params {
  date: string;
}

interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[]
}

export function Habit() {

  // sera necessario a criacao de uma lista para distribuicao e map nos componentes...
  //useState ... useEffect, se fosse para carregar atraves do dispositivo ...nserao usados.

  const [loading, setLoading] = useState(true)
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([])

  const route = useRoute()
  const { date } = route.params as Params

  const parsedDate = dayjs(date)
  //se for uma data que ja passou, nao sera permitido modificar a marcacao do habito completado!
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
  //a linha acima retorna um boolean.

  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')

  //administrando a barra de progresso:
  //verificando qual o tamanho da lista de habitos do dia
  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length)
    : 0


  async function fetchHabits() {
    try {
      setLoading(true)

      const response = await api.get('/day', { params: { date: date } }) //ou {params:{date}}
      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits) //armazena apenas os habitos completados.

    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos')
    } finally {
      setLoading(false)
    }
  }

  //lidando com as selecoes dos habitos:
  async function hanbleToggleHabit(habitId: string) {
    try {
      // a linha abaixo serve para atualizar o status do exercicio no back-end.
      await api.patch(`/habits/${habitId}/toggle`)
      if (completedHabits.includes(habitId)) {//isso indica que o habito existe e esta selecionado (pq foi completado)
        //agora a pessoa pode querer tirar a selecao:
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
      } else {
        //agora, e para a pessoa adicionar a selecao:
        setCompletedHabits(prevState => [...prevState, habitId])
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível atualizar o status do hábito.')
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
          {dayOfWeek}
        </Text>

        <Text className='text-white font-extrabold text-3xl'>
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View className={clsx('mt-6', {
          ['opacity-50']: isDateInPast
        })}>

          {
            dayInfo?.possibleHabits ? //para informar se nao e nulo
              dayInfo?.possibleHabits.map(habit => (
                <CheckBox
                  key={habit.id}
                  title={habit.title}
                  checked={completedHabits.includes(habit.id)}
                  disabled={isDateInPast}
                  onPress={() => hanbleToggleHabit(habit.id)}
                />
              )) :
              <HabitsEmpty />
          }
        </View>
        {
          isDateInPast &&
          <Text className='text-white mt-10 text-center'>
            Você não pode editar hábitos de uma data passada.
          </Text>
        }


      </ScrollView>

    </View>
  )
}