import { useState } from "react";
import clsx from "clsx";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { addWater, updateWater } from "../../redux/water/operations";
import css from "./WaterForm.module.css";
import { FaMinus, FaPlus } from "react-icons/fa6";

const WaterForm = ({
  operationType,
  myTime,
  waterPortion,
  id,
  handleClose,
}) => {
  const [waterAmount, setWaterAmount] = useState(waterPortion || 50);

  const dispatch = useDispatch();

  const dateFromUrl = new Date();

  const year = dateFromUrl.getFullYear();
  const month = String(dateFromUrl.getMonth() + 1).padStart(2, "0");
  const day = String(dateFromUrl.getDate()).padStart(2, "0");

  const currentTime = myTime ? new Date(myTime) : new Date();
  const hours = String(currentTime.getHours()).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");

  const [formHours, setFormHours] = useState(hours);
  const [formMinutes, setFormMinutes] = useState(minutes);

  const waterFormSchema = Yup.object().shape({
    waterValue: Yup.number()
      .required("Water amount is required")
      .min(50, "Minimum value is 50 ml")
      .max(5000, "Maximum value is 5000 ml"),
    recordingTime: Yup.string()
      .required("Recording time is required")
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(waterFormSchema),
    defaultValues: {
      waterValue: waterAmount.toString(),
      recordingTime: `${formHours}:${formMinutes}`,
    },
  });

  const onSubmit = (data) => {
    const combinedDateTime = new Date(
      `${year}-${month}-${day}T${formHours}:${formMinutes}:00`
    );
    const timeToSend = combinedDateTime.getTime().toString(); // Unix timestamp у мілісекундах

    const addWaterValue = {
      amount: data.waterValue,
      date: timeToSend,
    };

    const editWaterValue = {
      amount: data.waterValue,
      date: timeToSend,
    };

    switch (operationType) {
      case "add": {
        const result = dispatch(addWater(addWaterValue));
        if (!result.error) {
          handleClose();
        }
        break;
      }
      case "edit": {
        const result = dispatch(updateWater({ id, ...editWaterValue }));
        if (!result.error) {
          handleClose();
        }
        break;
      }
      default:
        break;
    }
  };

  const handleWaterAmountChange = (amount) => {
    setWaterAmount(amount);
    setValue("waterValue", amount.toString());
  };

  const isMinusButtonDisabled = waterAmount === 50;
  const isPlusButtonDisabled = waterAmount === 5000;

  return (
    <form
      className={css.waterForm}
      onSubmit={handleSubmit(onSubmit)}>
      <p className={css.amountWaterLabel}>Amount of water:</p>
      <div className={css.btnBox}>
        <button
          className={css.buttons}
          type="button"
          onClick={() => handleWaterAmountChange(Math.max(waterAmount - 50, 0))}
          disabled={isMinusButtonDisabled}>
          <FaMinus />
        </button>
        <span className={css.numberSpan}>{waterAmount} ml</span>
        <button
          className={css.buttons}
          type="button"
          onClick={() => handleWaterAmountChange(waterAmount + 50)}
          disabled={isPlusButtonDisabled}>
          <FaPlus />
        </button>
      </div>
      <label className={css.recordingTimeLabel}>
        Recording time:
        <Controller
          name="recordingTime"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={clsx(css.recordingTimeInput)}
              placeholder="HH:MM"
              onChange={(e) => {
                const [newHours, newMinutes] = e.target.value.split(":");
                setFormHours(newHours);
                setFormMinutes(newMinutes);
                field.onChange(e);
              }}
            />
          )}
        />
        {errors.recordingTime && (
          <p className={css.error}>{errors.recordingTime.message}</p>
        )}
      </label>
      <label className={css.waterValueLabel}>
        Enter the value of the water used:
        <Controller
          name="waterValue"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              value={waterAmount || ""}
              onChange={(e) => handleWaterAmountChange(Number(e.target.value))}
              className={css.waterValueInput}
            />
          )}
        />
        {errors.waterValue && (
          <p className={css.error}>{errors.waterValue.message}</p>
        )}
      </label>
      <button
        className={css.btnSave}
        type="submit">
        Save
      </button>
    </form>
  );
};

export default WaterForm;
