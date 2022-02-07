import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'

let baseUrl = 'http://localhost:3001/persons'

const createContact = newContact => {
	const request = axios.post(baseUrl, newContact)
	return request.then(response => response.data)
}

const updateContact = (contact, number) => {
	contact.number = number
	const request = axios.put(`${baseUrl}/${contact.id}`, contact)
	return (
		request.then(response => response.data)
		.catch(error => {
			failedNotification()
			console.log(error)
		})
	)
}

const failedNotification = () =>{
	ReactDOM.render(
		<h3 style={{...styles.error}}>This person has already been removed from the phonebook</h3>, 
		document.getElementById('notification')
	)
}

const successNotification = (name) =>{
	ReactDOM.render(
		<h3 style={{...styles.notification}}>Added {name}</h3>, 
		document.getElementById('notification')
	)
}

export const AddContact = ({
	persons,
	newName,
	setNewName,
	number,
	setNumber }) => {
	const handleNameChange = (event) => 
		setNewName(event.target.value)

	const handleNumberChange = (event) => 
		setNumber(event.target.value)

	const addContact = (event) => {
		event.preventDefault()
		const pNum = isNaN(parseInt(number)) ? '' : number
		const personExists = persons.find(person => 
			person.name.toUpperCase() === newName.toUpperCase())
		const numberExists = !isNaN(parseInt(personExists?.number))

		if (personExists){
			if((numberExists && window.confirm('This contact is already in the phonebook, replace the old number with a new one?')) || !numberExists)
				updateContact(personExists, pNum)
		}
		else {
			const newContact = {
				name: newName,
				number: pNum,
			}
			createContact(newContact)
			successNotification(newName)
		}
		setNewName('')
		setNumber('')
	}

	return(
	<form onSubmit={addContact}>
		<div>
			name: <input 
				value={newName} 
				onChange={handleNameChange}
				/>
		</div>
		<div>
			number: <input 
				value={number} 
				onChange={handleNumberChange}
				/>
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
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