import { useQuery } from 'react-query'
import axios from 'axios'

export const useVisitsByMonth = () =>
  useQuery(
    ['visitsByMonth'],
    () =>
      axios
        .get(
          `/.netlify/functions/callMatomo/?module=API&date=last13&period=month&format=json&idSite=153&method=VisitsSummary.getVisits`
        )
        .then((res) => res.data)
        .then((data) => {
          let total = {}
          for (let key in data) {
            for (let date in data[key]) {
              if (!total[date]) {
                total[date] = data[key][date]
              } else {
                total[date] += data[key][date]
              }
            }
          }
          return { ...data, total }
        }),
    {
      keepPreviousData: false,
    }
  )
