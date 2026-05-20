import TaskList from '../components/features/TaskList'

const Dashboard = () => {

   return ( 
    <div className='p-4 bg-[#1e1e2f] rounded-lg'>
        <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
        <TaskList />
    </div>
    )
}

export default Dashboard;