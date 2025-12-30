import style from "./ContactList.module.css";
import Contact from "../Contact/Contact";

export default function ContactList({ contacts, deleteContact }) {
	return (
		<ul className={style.contacts_list}>
			{contacts.map((contact) => {
				return (
					<li className={style.contacts_list_item} key={contact.id}>
						<Contact contact={contact} deleteContact={deleteContact} />
					</li>
				);
			})}
		</ul>
	);
}
