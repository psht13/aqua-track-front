import { useState } from "react";
import WaterModal from "../../components/WaterModal/WaterModal";
import css from "../WaterItem/WaterItem.module.css";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal.jsx";
import sprite from "../../assets/sprite.svg";

const WaterItem = ({ item: { id, date, amount } }) => {
	const [isEditModalOpen, setEditModalIsOpen] = useState(false);
	const [isDeleteModalOpen, setDeleteModalIsOpen] = useState(false);

	const openModalEdit = () => setEditModalIsOpen(true);
	const closeModalEdit = () => setEditModalIsOpen(false);

	const openModalDelete = () => setDeleteModalIsOpen(true);
	const closeModalDelete = () => setDeleteModalIsOpen(false);


	const formatTime = (time) => {
		if (!time) return "Invalid time";
		const dateObj = new Date(time);
		const hours = String(dateObj.getHours()).padStart(2, "0");
		const minutes = String(dateObj.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	};

	return (
		<>
			<div className={css.waterContainer}>
				<svg
					className={css.icon}
					width={32}
					height={32}
				>
					<use href={`${sprite}#icon-glass`} />
				</svg>
				<div className={css.details}>
					<span className={css.amount}>{amount} ml</span>
					<span className={css.time}>{formatTime(date)}</span>
				</div>
				<div className={css.actions}>
					<button
						className={css.actionButton}
						onClick={openModalEdit}
					>
						<svg
							width={14}
							height={14}
							className={css.btnSvg}
						>
							<use href={`${sprite}#icon-edit`}></use>
						</svg>
					</button>
					<button
						className={css.actionButton}
						onClick={openModalDelete}
						type='button'
						aria-label='Delete item'
					>
						<svg
							width={14}
							height={14}
							className={css.btnSvg}
						>
							<use href={`${sprite}#icon-trash`} />
						</svg>
					</button>
				</div>
			</div>

			{isEditModalOpen && (
				<WaterModal
					operationType='edit'
					id={id}
					waterPortion={amount}
					myTime={date}
					handleClose={closeModalEdit}
				/>
			)}

			{isDeleteModalOpen && (
				<DeleteWaterModal
					id={id}
					onClose={closeModalDelete}
				/>
			)}
		</>
	);
};

export default WaterItem;
