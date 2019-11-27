import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { DietSchedule } from 'src/components/DietSchedule'
import { DailyDiet } from 'src/models'
import { useDietsQuery } from 'src/rest'

const dailyDiets: DailyDiet[] = [
  {
    _id: '1',
    diet: '0',
    dailyMeals: {
      breakfast: 'cos',
      afternoonSnack: null,
      dinner: null,
      lunch: null,
      morningSnack: null,
    },
    date: new Date(),
  },
  {
    _id: '2',
    diet: '0',
    dailyMeals: {
      breakfast: null,
      afternoonSnack: 'nic',
      dinner: null,
      lunch: null,
      morningSnack: null,
    },
    date: new Date(),
  },
  {
    _id: '3',
    diet: '0',
    dailyMeals: {
      breakfast: null,
      afternoonSnack: null,
      dinner: null,
      lunch: null,
      morningSnack: null,
    },
    date: new Date(),
  },
  {
    _id: '4',
    diet: '0',
    dailyMeals: {
      breakfast: null,
      afternoonSnack: null,
      dinner: null,
      lunch: null,
      morningSnack: null,
    },
    date: new Date(),
  },
]

const DietView = () => {
  const { dietId } = useParams()

  const { data, loading } = useDietsQuery()
  const diet = (loading || !data) ? null : data.find(v => v._id == dietId) || null

  return (
    <Container fluid={true}>
      {diet ? <h1>Dieta {diet.name}</h1> : <h1 className="bp3-skeleton">Dieta abc</h1>}
      <DietSchedule dailyDiets={dailyDiets} />
    </Container>
  )
}

export { DietView }
