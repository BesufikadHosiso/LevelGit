import TaskList from '../components/features/TaskList'

const Dashboard = () => {

   return ( 
    <div className='p-4 bg-[#1e1e2f] rounded-lg'>
        <h1 className='text-sm font-light italic mb-6 text-[#e8eaf0] border-l-4 border-streak pl-4 opacity-70'>Success is not final, failure is not fatal: it is the courage to continue that counts.</h1>
        <TaskList />
    </div>
    )
}

export default Dashboard;