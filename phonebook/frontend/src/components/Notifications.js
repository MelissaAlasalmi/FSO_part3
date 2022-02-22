import ReactDOM from 'react-dom'

export const errorNotification = (error) =>{
	ReactDOM.render(
		<h3 style={{...styles.error}}>{error}</h3>, 
		document.getElementById('notification')
	)
}

export const successNotification = (name) =>{
	ReactDOM.render(
		<h3 style={{...styles.notification}}>Added {name} to phonebook</h3>, 
		document.getElementById('notification')
	)
}

const styles = {
	notification: {
		color: 'green',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px',
	},
	error: {
		color: 'red',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '10px',
		marginBottom: '10px',
	},
}