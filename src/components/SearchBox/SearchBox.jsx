import { useId } from "react";
import style from "./SearchBox.module.css";

export default function SearchBox({ filter, handleFilterChange }) {
	const searchFieldId = useId();

	return (
		<form className={style.search_form} autocomplete="off">
			<label htmlFor={searchFieldId} className={style.search_form_label}>
				Find contacts by name
			</label>
			<input
				type="text"
				name="search"
				id={searchFieldId}
				onChange={handleFilterChange}
				value={filter}
				className={style.search_input}
			/>
		</form>
	);
}
