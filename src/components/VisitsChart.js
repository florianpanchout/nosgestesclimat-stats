import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts'

import { useVisitsByMonth } from '../hooks/useVisitsByMonth'
import { useSimulationsByMonth } from '../hooks/useSimulationsByMonth'

const Wrapper = styled.div`
  width: 70rem;
  height: 30rem;
`
function App() {
  const { data: visitsByMonth } = useVisitsByMonth()
  const { data: simulationsByMonth } = useSimulationsByMonth()

  const [data, setData] = useState(null)

  useEffect(() => {
    if (visitsByMonth && simulationsByMonth) {
      let dates = Object.keys(visitsByMonth)
      dates.length--
      setData(
        dates.map((date) => {
          let points = { date }
          points['Visites'] = visitsByMonth[date]

          points['Simulations terminées'] = simulationsByMonth[date].find(
            (event) => ['A terminé la simulation'].includes(event.label)
          )?.nb_visits

          points['A vu les actions'] = simulationsByMonth[date].find((event) =>
            ['Clic bouton action page /fin'].includes(event.label)
          )?.nb_visits

          return points
        })
      )
    }
  }, [visitsByMonth, simulationsByMonth])

  return (
    <Wrapper>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <XAxis
            dataKey='date'
            tick={{ fontSize: 10 }}
            tickFormatter={(tick) => {
              const date = new Date(tick.split(',')[0])

              return date.toLocaleDateString('fr-fr', {
                month: 'long',
                year: 'numeric',
              })
            }}
            interval={0}
            minTickGap={1}
          />
          <YAxis
            tickFormatter={(tick) =>
              tick.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
            }
          />
          <Area type='monotone' dataKey={'Visites'} stroke={'transparent'} />
          <Area
            type='monotone'
            dataKey={'Simulations terminées'}
            stroke={'transparent'}
          />
          <Area
            type='monotone'
            dataKey={'A vu les actions'}
            stroke={'transparent'}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  )
}

export default App
