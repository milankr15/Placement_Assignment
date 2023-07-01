import Chip from '@mui/material/Chip';

const TaskListChip = ({ label, color, icon }) => {
	return <Chip label={label} color={color} sx={{ width: '100%' }} icon={icon} />;
};

export default TaskListChip;