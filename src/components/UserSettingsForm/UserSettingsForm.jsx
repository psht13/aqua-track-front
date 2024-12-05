import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsExclamationLg } from "react-icons/bs";

import * as Yup from "yup";
import axios from "axios";

import css from "./UserSettingsForm.module.css";

const validationSchema = Yup.object().shape({
  avatarUrl: Yup.mixed(),
  gender: Yup.string().required("Gender is required"),
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  weight: Yup.number()
    .typeError("Weight must be a number")
    .positive("Weight must be positive")
    .required("Weight is required"),
  activeTime: Yup.number()
    .typeError("Active hours must be a number")
    .min(0, "Active hours cannot be negative")
    .max(24, "Active hours cannot exceed 24")
    .required("Active hours are required"),
  dailyNorm: Yup.number()
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
      gender: "Woman",
      dailyNorm: "1.8",
    },
  });

  const avatarUrl = watch("avatarUrl");
  const gender = watch("gender");

  useEffect(() => {
    if (avatarUrl && avatarUrl[0]) {
      setAvatarPreview(URL.createObjectURL(avatarUrl[0]));
    }
  }, [avatarUrl]);

  const calculateRecommendedWaterNorm = (weight, activeTime, gender) => {
    let dailyNorm = 0;

    if (gender === "Woman") {
      dailyNorm = weight * 0.03 + activeTime * 0.4;
    } else if (gender === "Man") {
      dailyNorm = weight * 0.04 + activeTime * 0.6;
    }

    return dailyNorm.toFixed(1);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("avatarUrl", data.avatarUrl[0]);
      formData.append("gender", data.gender);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("weight", data.weight);
      formData.append("activeTime", data.activeTime);
      formData.append("dailyNorm", data.dailyNorm);

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
    <div className={css.wrap}>
      <h3 className={css.settingFormTitle}>Setting</h3>
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

        <label htmlFor="avatarUrl" className={css.customFileUpload}>
          <svg className={css.icon}>
            <use href="src/assets/sprite.svg#icon-upload" />
          </svg>
          <p className={css.uploadBtn}> Upload a photo</p>
        </label>
        <input
          id="avatarUrl"
          type="file"
          {...register("avatarUrl")}
          accept="image/*"
          style={{ display: "none" }}
        />
        {errors.avatarUrl && <p>{errors.avatarUrl.message}</p>}
      </div>

      <div className={css.genderContainer}>
        <h3 className={css.genderTitle}>Your gender identity</h3>
        <div className={css.radioGender}>
          <label className={css.customRadio}>
            <input type="radio" value="Woman" {...register("gender")} />
            <span className={css.checkmark}></span>
            Woman
          </label>
          <label className={css.customRadio}>
            <input type="radio" value="Man" {...register("gender")} />
            <span className={css.checkmark}></span>
            Man
          </label>
        </div>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div className={css.deskWrapper}>
        <div className={css.deskMiniWrapper}>
          <div className={css.userDataWrapper}>
            <label className={css.userName}>Your name</label>
            <input
              className={`${css.inputName} ${
                errors.name ? css.inputError : ""
              }`}
              type="text"
              {...register("name")}
            />
            {errors.name && (
              <p className={css.errorMessage}>{errors.name.message}</p>
            )}
          </div>

          <div className={css.userEmailWrapper}>
            <label className={css.userName}>Email</label>
            <input
              className={`${css.inputName} ${
                errors.email ? css.inputError : ""
              }`}
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className={css.errorMessage}>{errors.email.message}</p>
            )}
          </div>

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
          <div className={css.exclamationWrapper}>
            <BsExclamationLg className={css.exclamation} />
            <p className={css.dailyAttention}>Active time in hours</p>
          </div>
        </div>
        <div className={css.deskMiniWrapper}>
          <div className={css.dailyWeightWrapper}>
            <label className={css.dailyWeight}>Your weight in kilograms:</label>
            <input
              className={`${css.inputName} ${
                errors.weight ? css.inputError : ""
              }`}
              type="number"
              {...register("weight")}
              placeholder="0"
            />
            {errors.weight && (
              <p className={css.errorMessage}>{errors.weight.message}</p>
            )}
          </div>

          <div className={css.dailyTimeWrapper}>
            <label className={css.dailyWeight}>
              The time of active participation in sports:
            </label>
            <input
              className={css.inputName}
              type="number"
              {...(register("activeTime") || 0)}
              placeholder="0"
            />
            {errors.activeTime && <p>{errors.activeTime.message}</p>}
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
              {...register("dailyNorm")}
              value={calculateRecommendedWaterNorm(
                watch("weight") || 0,
                watch("activeTime") || 0,
                gender
              )}
              readOnly
            />
            {errors.dailyNorm && <p>{errors.dailyNorm.message}</p>}
          </div>
        </div>
      </div>

      <button
        className={css.saveButton}
        type="submit"
        onClick={handleSubmit(onSubmit)}
      >
        Save
      </button>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default UserSettingsForm;
