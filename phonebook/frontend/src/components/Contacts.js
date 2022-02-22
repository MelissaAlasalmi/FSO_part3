import React from 'react'
import { deleteContact } from './Service'

const Contact = ({contact}) => <label>{contact} </label>

export const Contacts = ({contacts}) => {
	return (
		<div>
			{ contacts.map(person => 
				<div key={person.name}>
					<Contact contact={person.name.concat(' ' + person.number)} />
					<button type="submit" onClick={() => deleteContact(person.id)}>delete</button>
				</div>) }
		</div>
	)
}