import React from 'react'
import axios from 'axios'

let baseUrl = 'http://localhost:3001/api/persons/'

const Contact = ({contact}) => <label>{contact} </label>

async function deleteContact (contactID) {
	if (window.confirm("Do you really want to delete this contact?"))
		await axios.delete(`${baseUrl}/${contactID}`)
	return "done"
}
const Delete = ({contact}) => <button type="submit" onClick={(() => deleteContact(contact))}>delete</button>

export const Contacts = ({contacts}) => {
	return (
		<div>
			{ contacts.map(person => 
				<div key={person.name}>
					<Contact contact={person.name.concat(' ' + person.number)} />
					<Delete contact={person.id} />
				</div>) }
		</div>
	)
}