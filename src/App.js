import { QueryClient, QueryClientProvider } from 'react-query'

import VisitsChart from './components/VisitsChart'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VisitsChart />
    </QueryClientProvider>
  )
}

export default App
