import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

import css from "./UserSettingsForm.module.css";

// Валідатор для форми
const validationSchema = Yup.object().shape({
  avatar: Yup.mixed(),
  gender: Yup.string().required("Gender is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  weight: Yup.number()
    .typeError("Weight must be a number")
    .positive("Weight must be positive")
    .required("Weight is required"),
  activeHours: Yup.number()
    .typeError("Active hours must be a number")
    .min(0, "Active hours cannot be negative")
    .max(24, "Active hours cannot exceed 24")
    .required("Active hours are required"),
  waterNorm: Yup.number()
    .typeError("Daily water norm must be a number")
    .positive("Daily water norm must be positive")
    .required("Daily water norm is required"),
});

const UserSettingsForm = ({ onClose, onUpdate }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      gender: "female", // Встановлення "female" як значення за замовчуванням
    },
  });

  const avatar = watch("avatar");
  const gender = watch("gender"); // Отримуємо значення gender з форми

  // Update avatar preview when user selects a file
  useEffect(() => {
    if (avatar && avatar[0]) {
      setAvatarPreview(URL.createObjectURL(avatar[0]));
    }
  }, [avatar]);

  const calculateRecommendedWaterNorm = (weight, activeHours, gender) => {
    let waterNorm = 0;

    if (gender === "female") {
      waterNorm = weight * 0.03 + activeHours * 0.4; // Формула для жінок
    } else if (gender === "male") {
      waterNorm = weight * 0.04 + activeHours * 0.6; // Формула для чоловіків
    }

    return waterNorm.toFixed(1);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("avatar", data.avatar[0]);
      formData.append("gender", data.gender);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("weight", data.weight);
      formData.append("activeHours", data.activeHours);
      formData.append("waterNorm", data.waterNorm);

      const response = await axios.post("/api/user/update", formData);
      if (response.status === 200) {
        onUpdate(response.data);
        onClose();
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modal}>
        <button type="button" onClick={onClose} className={css.closeBtn}>
          &times;
        </button>
        <h3 className={css.settingFormTitle}>Setting</h3>

        {/* Якщо аватар не вибраний, відображається дефолтне зображення */}
        <div className={css.imgContainer}>
          <img
            className={css.avatar}
            src={
              avatarPreview ||
              "src/assets//imgs/user-settings-form/avatar-user-basic.jpg"
            }
            alt="Avatar preview"
            width="75px"
          />

          <label htmlFor="avatar" className={css.customFileUpload}>
            <svg className={css.icon}>
              <use href="src/assets/sprite.svg#icon-upload" />
            </svg>
            <p className={css.uploadBtn}> Upload a photo</p>
          </label>
          <input
            id="avatar"
            type="file"
            {...register("avatar")}
            accept="image/*"
            style={{ display: "none" }}
          />
          {errors.avatar && <p>{errors.avatar.message}</p>}
        </div>

        <div className={css.genderContainer}>
          <label>
            <h3 className={css.genderTitle}>Your gender identity</h3>
          </label>
          <div className={css.radioGender}>
            <label>
              <input type="radio" value="female" {...register("gender")} />
              Woman
            </label>
            <label>
              <input type="radio" value="male" {...register("gender")} />
              Man
            </label>
          </div>
          {errors.gender && <p>{errors.gender.message}</p>}
        </div>

        <div className={css.userDataWrapper}>
          <label className={css.userName}>Your name</label>
          <input className={css.inputName} type="text" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className={css.userEmailWrapper}>
          <label className={css.userName}>Email</label>
          <input
            className={css.inputName}
            type="email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <h3 className={css.dailyTitle}>My daily norma</h3>
          <ul className={css.dailyList}>
            <li className={css.dailyItem}>
              <p className={css.dailyText}>For woman:</p>
              <p className={css.dailyFormula}>V=(M*0,03) + (T*0,4)</p>
            </li>
            <li className={css.dailyItem}>
              <p className={css.dailyText}>For man:</p>
              <p className={css.dailyFormula}>V=(M*0,04) + (T*0,6)</p>
            </li>
          </ul>
          <div className={css.dailyDescribeWrapper}>
            <p className={css.dailyDescribeText}>
              <span className={css.dailyDescribeSpan}>*</span> V is the volume
              of the water norm in liters per day, M is your body weight, T is
              the time of active sports, or another type of activity
              commensurate in terms of loads (in the absence of these, you must
              set 0)
            </p>
          </div>
          <p className={css.dailyAttention}>
            <span className={css.dailyAttentionSpan}>!</span>
            Active time in hours
          </p>
        </div>

        <div className={css.dailyWeightWrapper}>
          <label className={css.dailyWeight}>Your weight in kilograms:</label>
          <input
            className={css.inputName}
            type="number"
            {...register("weight")}
            placeholder="0"
          />
          {errors.weight && <p>{errors.weight.message}</p>}
        </div>

        <div className={css.dailyTimeWrapper}>
          <label className={css.dailyWeight}>
            The time of active participation in sports:
          </label>
          <input
            className={css.inputName}
            type="number"
            {...(register("activeHours") || 0)}
            placeholder="0"
          />
          {errors.activeHours && <p>{errors.activeHours.message}</p>}
        </div>

        <div className={css.dailyRequiredWrapper}>
          <p className={css.dailyRequiredText}>
            The required amount of water in liters per day:
          </p>
          <p className={css.dailyRequiredNorma}>1.8 L</p>
        </div>

        <div className={css.dailyWaterWrapper}>
          <label className={css.dailyWater}>
            Write down how much water you will drink:
          </label>
          <input
            className={css.inputName}
            type="text"
            {...register("waterNorm")}
            value={calculateRecommendedWaterNorm(
              watch("weight") || 0,
              watch("activeHours") || 0,
              gender // передаємо значення статі
            )}
            readOnly
          />
          {errors.waterNorm && <p>{errors.waterNorm.message}</p>}
        </div>

        <button
          className={css.saveButton}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default UserSettingsForm;
