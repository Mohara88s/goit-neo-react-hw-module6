import { useSelector, useDispatch } from "react-redux";
import { getContacts, getFilter } from "../../redux/selectors";
import { deleteContact as deleteContactAction } from "../../redux/contactsSlice";
import style from "./ContactList.module.css";
import Contact from "../Contact/Contact";

export default function ContactList() {
	const dispatch = useDispatch();
	const contacts = useSelector(getContacts);
	const filter = useSelector(getFilter);

	const deleteContact = (contactId) => {
		dispatch(deleteContactAction(contactId));
	};

	const contactsToShow = contacts
		.filter((contact) =>
			contact.name.toLowerCase().includes(filter.toLowerCase())
		)
		.sort((a, b) => a.name.localeCompare(b.name));

	return (
		<ul className={style.contacts_list}>
			{contactsToShow.map((contact) => {
				return (
					<li className={style.contacts_list_item} key={contact.id}>
						<Contact contact={contact} deleteContact={deleteContact} />
					</li>
				);
			})}
		</ul>
	);
}
