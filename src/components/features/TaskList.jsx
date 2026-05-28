import { useState } from 'react';
import useApp from '../../context/useApp';
// import Card from '../components/ui/Card'
import Button from '../ui/Button';
import Input from '../ui/Input'; // Import the Input component
import Modal from '../ui/Modal';
import EmptyState from '../ui/EmptyState';
import { Trash2, Edit2, Check, ListTodo } from 'lucide-react';


const TaskList = () => {
    const { state, dispatch } = useApp()
    const [showNewTaskInput, setShowNewTaskInput] = useState(false);
    const [newTaskText, setNewTaskText] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');

    const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskId: null });
    const [clearAllModal, setClearAllModal] = useState(false);

    const handleDelete = (id) => {
        setDeleteModal({ isOpen: true, taskId: id });
    };

    const handleEdit = (task) => {
        setEditingId(task.id);
        setEditingText(task.text);
    };

    const handleSaveEdit = (id) => {
        if (editingText.trim()) {
            dispatch({ type: 'EDIT_TASK', payload: { id, text: editingText.trim() } });
            setEditingId(null);
        }
    };

    const handleAddNewTask = () => {
        if (newTaskText.trim()) {
            dispatch({ 
                type: 'ADD_TASK', 
                payload: { id: Date.now(), text: newTaskText.trim(), done: false } 
            });
            setNewTaskText('');
            setShowNewTaskInput(false);
        }
    };

    const handleClearAll = () => {
        setClearAllModal(true);
    };

    return (
        <div className='p-3 bg-surface rounded-card mt-6'>
        <h1 className='text-sm font-light italic mb-4 text-white border-l-4 border-streak pl-3 opacity-70'>Every small step today helps you reach your big dreams.</h1>
        <div className='p-3 bg-surface rounded-card'>
            <div className='mb-6'>
                {showNewTaskInput ? (
                    <div className='flex items-center space-x-2 animate-in fade-in slide-in-from-top-2'>
                        <Input 
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            placeholder="What needs to be done?"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddNewTask();
                                if (e.key === 'Escape') {
                                    setShowNewTaskInput(false);
                                    setNewTaskText('');
                                }
                            }}
                            autoFocus
                        />
                        <Button variant='primary' onClick={handleAddNewTask}>Add</Button>
                        <Button variant='secondary' onClick={() => setShowNewTaskInput(false)}>Cancel</Button>
                    </div>
                ) : (
                    <div className='flex items-center space-x-2'>
                        <Button variant='primary' onClick={() => setShowNewTaskInput(true)}>
                            + Plan a New Win
                        </Button>
                    </div>
                )}
            </div>

            {state.tasks.length > 0 && (
                <div className='mb-6'>
                    <div className='relative h-3 bg-surface-20 border border-border rounded-full overflow-hidden shadow-inner'>
                        <div
                            className='absolute top-0 left-0 h-full bg-streak transition-all duration-500 ease-out'
                            style={{ width: `${(state.tasks.filter(task => task.done).length / state.tasks.length) * 100}%` }}
                        ></div>
                    </div>
                    <p className='text-sm text-muted mt-2 text-right'>
                        {state.tasks.filter(task => task.done).length} of {state.tasks.length} goals reached
                    </p>
                </div>
            )}

            {state.tasks.length === 0 ? (
                <EmptyState 
                    title="No wins planned yet"
                    description="Start by adding a task to your list. Every small step counts towards your bigger goals."
                    icon={ListTodo}
                />
                ) : (
                <ul className='space-y-2'>
                    {state.tasks.map((task) => (
                        <li key={task.id} className={`flex items-center justify-between p-3 rounded-card transition-all duration-500 ${task.done ? 'bg-surface-10 border-l-4 border-streak shadow-inner' : 'bg-surface-20 border-l-4 border-transparent hover:bg-surface-10'}`}>
                            <div className='flex items-center space-x-3 min-w-0 flex-1 mr-3'>
                                <button
                                    onClick={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                                    className={`relative flex items-center justify-center w-5 h-5 rounded-lg border-2 transition-all duration-500 transform active:scale-75 ${
                                        task.done 
                                            ? 'bg-streak border-streak rotate-0 scale-110' 
                                            : 'border-border hover:border-streak -rotate-90'
                                    }`}
                                >
                                    <Check 
                                        size={12} 
                                        className={`text-white transition-all duration-300 ${task.done ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} 
                                    />
                                    {task.done && <span className='absolute inset-0 rounded-lg bg-streak animate-ping opacity-40' />}
                                </button>
                                {editingId === task.id ? (
                                    <Input 
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveEdit(task.id);
                                            if (e.key === 'Escape') setEditingId(null);
                                        }}
                                        autoFocus
                                    />
                                ) : (
                                    <span className={`grow min-w-0 truncate text-sm font-medium transition-all duration-500 ${task.done ? 'line-through text-muted opacity-60' : 'text-white'}`}>
                                        {task.text}
                                    </span>
                                )}
                            </div>
                            <div className='shrink-0 space-x-2'>
                                {editingId === task.id ? (
                                    <Button variant='primary' onClick={() => handleSaveEdit(task.id)}>Save</Button>
                                ) : (
                                    <>
                                        <Button variant='secondary' onClick={() => handleEdit(task)}>
                                            <Edit2 size={18} />
                                        </Button>
                                        <Button variant='danger' onClick={() => handleDelete(task.id)}>
                                            <Trash2 />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {state.tasks.length > 0 && (
                <div className="mt-8 flex justify-center border-t border-border/30 pt-4">
                    <Button 
                        variant='ghost' 
                        onClick={handleClearAll}
                        className="text-muted-foreground hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/10 transition-all duration-200"
                    >
                        Clear All Tasks
                    </Button>
                </div>
            )}

            {/* Modal for Deleting Single Task */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, taskId: null })}
                title="Delete Task"
                variant="warning"
                confirmText="Delete"
                onConfirm={() => dispatch({ type: 'DELETE_TASK', payload: deleteModal.taskId })}
            >
                Are you sure you want to delete this task? This action cannot be undone.
            </Modal>

            {/* Modal for Clearing All Tasks */}
            <Modal
                isOpen={clearAllModal}
                onClose={() => setClearAllModal(false)}
                title="Clear All Tasks"
                variant="warning"
                confirmText="Clear All"
                onConfirm={() => dispatch({ type: 'CLEAR_TASKS' })}
            >
                This will permanently remove all tasks from your list. This is a destructive action.
            </Modal>
        </div>
        </div>
    )
}

export default TaskList;