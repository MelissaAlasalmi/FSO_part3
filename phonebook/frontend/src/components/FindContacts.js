import { useState } from "react";

export const FindContacts = ({contacts}) => {

    const[searchTerm, setSearchTerm] = useState('');

	const handleChange = (event) => 
		setSearchTerm(event.target.value)

	return(
		<div>
			<input 
				type="text" 
				placeholder="Search..." 
				onChange={handleChange}/>
				{/* eslint-disable-next-line */}
				{ contacts.filter(values => {
					if (values.name.toLowerCase().includes(searchTerm.toLowerCase()) 
					&& searchTerm !== '')
						return(values)
				}).map((items, index) => 
					<p key={index}>
						{items.name.concat(' ' + items.number)}
					</p>) }
		</div>
	)
}