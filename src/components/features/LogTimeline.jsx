import { useState } from 'react';
import useApp from '../../context/useApp';
import LogEntry from './LogEntry';
import Modal from '../ui/Modal';
import Input from '../ui/Input';

const LogTimeline = () => {
    const { state, dispatch } = useApp();
    const { logEntries } = state;

    const [deleteModal, setDeleteModal] = useState({ isOpen: false, logId: null });
    const [editModal, setEditModal] = useState({ isOpen: false, log: null });
    const [editData, setEditData] = useState({ title: '', description: '' });

    const handleDeleteClick = (id) => {
        setDeleteModal({ isOpen: true, logId: id });
    };

    const handleEditClick = (log) => {
        setEditModal({ isOpen: true, log });
        setEditData({ title: log.title, description: log.description });
    };

    const handleConfirmDelete = () => {
        dispatch({ type: 'DELETE_LOG', payload: deleteModal.logId });
        setDeleteModal({ isOpen: false, logId: null });
    };

    const handleConfirmEdit = () => {
        dispatch({ 
            type: 'EDIT_LOG', 
            payload: { ...editModal.log, title: editData.title, description: editData.description } 
        });
        setEditModal({ isOpen: false, log: null });
    };

    return(
        <>
        {!logEntries.length ? (
            <div className="text-center py-12 bg-surface/30 rounded-card border border-dashed border-border/50">
                <p className="text-muted-foreground text-sm">No logs yet. Start by adding a new insight above!</p>
            </div>
        ) : (
            <div className="relative pt-2 px-1">
                {logEntries.map((entry, index) => (
                    <LogEntry 
                        key={entry.id} 
                        id={entry.id}
                        title={entry.title} 
                        description={entry.description} 
                        tag={entry.tags} 
                        date={entry.createdAt}
                        isLast={index === logEntries.length - 1}
                        onEdit={() => handleEditClick(entry)}
                        onDelete={() => handleDeleteClick(entry.id)}
                    />
                ))}
            </div>
        )}

        <Modal
            isOpen={deleteModal.isOpen}
            onClose={() => setDeleteModal({ isOpen: false, logId: null })}
            title="Delete Insight"
            variant="warning"
            confirmText="Delete"
            onConfirm={handleConfirmDelete}
        >
            Are you sure you want to remove this insight? This cannot be undone.
        </Modal>

        <Modal
            isOpen={editModal.isOpen}
            onClose={() => setEditModal({ isOpen: false, log: null })}
            title="Edit Insight"
            onConfirm={handleConfirmEdit}
        >
            <div className="space-y-4">
                <Input 
                    label="Title"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
                <Input 
                    label="Description"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    textarea
                />
            </div>
        </Modal>
        </>
    );
}

export default LogTimeline;