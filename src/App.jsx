import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Focus from './pages/Focus'
import Logs from './pages/Logs'
import Path from './pages/Path'
import Stats from './pages/Stats'
import Layout from './components/layout/Layout'

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/focus" element={<Focus />} />
        <Route path="/path" element={<Path />} />
        <Route path="/log" element={<Logs />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Layout>
  )
}

export default App
