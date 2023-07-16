import { useQuery } from 'react-query'
import axios from 'axios'

export const useSimulationsByMonth = () =>
  useQuery(
    ['simulationsByMonth'],
    () =>
      axios
        .get(
          `/.netlify/functions/callMatomo/?module=API&method=Events.getAction&idSite=153&date=last13&period=month&format=JSON`
        )
        .then((res) => res.data),
    {
      keepPreviousData: false,
    }
  )
