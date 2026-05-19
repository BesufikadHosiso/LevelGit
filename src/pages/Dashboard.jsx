import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Input from '../components/ui/Input'

const Dashboard = () => {
   return ( <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <Card>
        <h2 className='text-lg text-[#e8eaf0] font-semibold mb-2'>Card Title</h2>
        <p className='text-sm text-muted mb-2'>This is a card component. It can be used to display content in a structured way.</p>
        <Button variant='danger'>Delete</Button>
      </Card>
      <Card>
        <Badge label="Feature" color="green" />
        <h2 className='text-lg text-[#e8eaf0] font-semibold mb-2'>Third Card</h2>
        <Input placeholder="Type Something..." onChange={(e) => console.log(e.target.value)} arialLabel="Search" />
        <p className='text-sm text-muted mb-2'>This is a third card component. It can be used to display even more content.</p>
        <Button variant='primary'>Save</Button>
        <Button variant='ghost'>View Details</Button>
      </Card>
      </div> 
    )
}

export default Dashboard;