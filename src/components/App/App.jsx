import { useState, useEffect } from "react";
import Section from "../Section/Section";
import Container from "../Container/Container";
import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import style from "./App.module.css";

// Зробив Id як в прикладі
const getNewId = (existingContacts) => {
	if (existingContacts.length === 0) {
		return "id-1";
	}
	const lastContact = existingContacts[existingContacts.length - 1];
	const newIdNumber = parseInt(lastContact.id.split("-")[1], 10) + 1;
	return `id-${newIdNumber}`;
};

export default function App() {
	const [contacts, setContacts] = useState(() => {
		const savedContacts = localStorage.getItem("contacts");
		if (savedContacts !== null) {
			try {
				return JSON.parse(savedContacts);
			} catch (error) {
				console.error("Помилка парсингу Local Storage:", error);
				return [];
			}
		}

		return [];
	});

	const [filter, setFilter] = useState("");

	useEffect(() => {
		localStorage.setItem("contacts", JSON.stringify(contacts));
	}, [contacts]);

	const addContact = (contactData) => {
		const newContact = { id: getNewId(contacts), ...contactData };
		setContacts([...contacts, newContact]);
	};

	const deleteContact = (contactId) => {
		setContacts(contacts.filter((contact) => contact.id !== contactId));
	};

	const handleFilterChange = (evt) => {
		setFilter(evt.target.value);
	};

	const contactsToShow = contacts
		.filter((contact) =>
			contact.name.toLowerCase().includes(filter.toLowerCase())
		)
		.sort((a, b) => a.name.localeCompare(b.name));

	return (
		<>
			<Section>
				<Container>
					<h1 className={style.h1}>Phonebook</h1>
					<ContactForm addContact={addContact} />
					<SearchBox filter={filter} handleFilterChange={handleFilterChange} />
					<ContactList
						contacts={contactsToShow}
						deleteContact={deleteContact}
					/>
				</Container>
			</Section>
		</>
	);
}
