import React from 'react';
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

const FilterTask = ({ filterLabel, onFilter }) => {
	const classes = useStyles();
	const TASK_LABELS = getLabels();

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
						value={filterLabel}
						onChange={(_, value) => onFilter(value)}
						renderInput={(params) => (
							<TextField
								{...params}
								label='Filter by Label'
								name='label'
								variant='outlined'
								size='small'
								value={filterLabel}
								onChange={e => onFilter(e.target.value)}
							/>
						)}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default FilterTask;
