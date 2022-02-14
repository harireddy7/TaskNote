import React, { useState } from 'react';
import { Grid, TextField, Container, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getLabels } from '../useLocalStorage';

const useStyles = makeStyles((theme) => ({
	taskFormContainer: {
		padding: '2rem 1rem',
	},
	taskGrid: {
		display: 'grid',
		gridTemplateColumns: '100%',
		gridGap: '1rem',
		[theme.breakpoints.up('sm')]: {
			gridTemplateColumns: 'repeat(3, 32%)',
		},
		[theme.breakpoints.only('xs')]: {
			maxWidth: '380px',
			margin: '0 auto',
		},
	},
	gridItem: {
		width: '100%',
	},
}));

const FilterTask = ({ onFilter }) => {
	const classes = useStyles();
	const [label, setLabel] = useState('');
	const TASK_LABELS = getLabels();

	const handleTextChange = (e) => {
        const { value } = e.target;
		setLabel(value);
		onFilter(value);
	};

	return (
		<Container
			maxWidth='md'
			className={classes.taskFormContainer}
			id='new-task-container'
		>
			<Grid container className={classes.taskGrid}>
				<Grid item className={classes.gridItem}>
					<Autocomplete
						id='label'
						options={TASK_LABELS}
						autoComplete
						freeSolo
						value={label}
						onChange={(_, value) =>
							handleTextChange({ target: { name: 'label', value } })
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Filter by Label'
								name='label'
								variant='outlined'
								size='small'
								value={label}
								onChange={handleTextChange}
							/>
						)}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default FilterTask;
