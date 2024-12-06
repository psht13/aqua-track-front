import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsExclamationLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getUser, patchUser } from "../../redux/user/operations";
import { selectUser } from "../../redux/user/selectors";
import * as Yup from "yup";
import sprite from "../../assets/sprite.svg";
import avatar from "../../assets/imgs/user-settings-form/avatar-user-basic.jpg";
// import axios from "axios";
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

const UserSettingsForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      gender: user?.gender || "woman",
      dailyNorm: "1.8",
      weight: user?.weight || "",
      activeTime: user?.activeTime || "",
    },
  });

  const avatarUrl = watch("avatarUrl");
  const gender = watch("gender");

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    console.log(user);
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("weight", user.weight || "");
      setValue("activeTime", user.activeTime || "");
      setValue("dailyNorm", user.dailyNorm || "1.8");
      setValue("gender", user.gender || "woman");
      if (user.avatarUrl) {
        setAvatarPreview(user.avatarUrl);
      }
    }
  }, [user, setValue]);

  const calculateRecommendedWaterNorm = (weight, activeTime, gender) => {
    let dailyNorm = 0;

    if (gender === "woman") {
      dailyNorm = weight * 0.03 + activeTime * 0.4;
    } else if (gender === "man") {
      dailyNorm = weight * 0.04 + activeTime * 0.6;
    }

    return dailyNorm.toFixed(1);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name || "");
      formData.append("email", data.email);
      formData.append("gender", data.gender);
      formData.append("weight", data.weight || null);
      formData.append("activeTime", data.activeTime || null);
      formData.append("dailyNorm", data.dailyNorm || 1500);

      if (data.avatarUrl && data.avatarUrl[0]) {
        formData.append("avatarUrl", data.avatarUrl[0]);
      }
      const response = await dispatch(patchUser(formData)).unwrap();
      console.log(response);

      onClose();
    } catch (error) {
      console.error("Error updating user:", error.message);
      setErrorMessage(error.message || "Failed to update user.");
    }
  };

  useEffect(() => {
    if (avatarUrl && avatarUrl.length > 0) {
      const file = avatarUrl[0];
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [avatarUrl]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className={css.wrap}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className={css.settingFormTitle}>Setting</h3>
        <div className={css.imgContainer}>
          <img
            className={css.avatar}
            src={avatarPreview || avatar}
            alt="Avatar preview"
            width="75px"
          />

          <label htmlFor="avatarUrl" className={css.customFileUpload}>
            <svg className={css.icon}>
              <use href={`${sprite}#icon-upload`} />
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
              <input
                type="radio"
                value="woman"
                {...register("gender")}
                checked={gender === "woman"}
              />
              <span className={css.checkmark}></span>
              Woman
            </label>
            <label className={css.customRadio}>
              <input
                type="radio"
                value="man"
                {...register("gender")}
                checked={gender === "man"}
              />
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
                commensurate in terms of loads (in the absence of these, you
                must set 0)
              </p>
            </div>
            <div className={css.exclamationWrapper}>
              <BsExclamationLg className={css.exclamation} />
              <p className={css.dailyAttention}>Active time in hours</p>
            </div>
          </div>
          <div className={css.deskMiniWrapper}>
            <div className={css.dailyWeightWrapper}>
              <label className={css.dailyWeight}>
                Your weight in kilograms:
              </label>
              <input
                className={`${css.inputName} ${
                  errors.weight ? css.inputError : ""
                }`}
                type="number"
                {...register("weight")}
                placeholder="0"
                onWheel={(e) => e.target.blur()}
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
                className={`${css.inputName} ${
                  errors.activeTime ? css.inputError : ""
                }`}
                type="number"
                {...register("activeTime")}
                placeholder="0"
                onWheel={(e) => e.target.blur()}
              />
              {errors.activeTime && (
                <p className={css.errorMessage}>{errors.activeTime.message}</p>
              )}
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
                type="number"
                placeholder="1.8"
                {...register("dailyNorm")}
                value={
                  errors.dailyNorm
                    ? watch("dailyNorm")
                    : calculateRecommendedWaterNorm(
                        watch("weight"),
                        watch("activeTime"),
                        watch("gender")
                      )
                }
                onChange={(e) => setValue("dailyNorm", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={css.btnWrapper}>
          <button className={css.saveButton} type="submit">
            Save
          </button>

          {errorMessage && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserSettingsForm;
