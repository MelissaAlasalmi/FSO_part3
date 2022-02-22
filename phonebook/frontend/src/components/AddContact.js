import React from 'react'
import { createContact, updateContact } from './Service'
import { errorNotification, successNotification } from './Notifications'

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
			try {
				const response = createContact(newContact);
				successNotification(response.name);	
			} catch (error) {
				errorNotification(error.message);
			}
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
