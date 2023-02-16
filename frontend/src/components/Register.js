import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

const Register = ({onRegister, isLoading, textLoad, textOnButton}) => {
  const {register, formState: {errors,isValid},handleSubmit,reset,getValues } = useForm({mode: "onChange"})

  function onSubmit(data,e) {
    e.preventDefault()
    onRegister(data.email, data.password)
    reset()
  }

  return (
    <div className={"authentication"}>
      <h2 className={"authentication__title"}>Регистрация</h2>
      <form className={"authentication__form"} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email',{required: 'Обязательное поле', pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некорректная электронная почта"
            }})}
          placeholder="Email"
          className={"authentication__input"}
        />
        <span className={ errors.email ? "authentication__error authentication__error_active" : "authentication__error"}>{errors?.email?.message || ""}</span>
        <input
          {...register('password',{required: 'Обязательное поле',
            validate:{
              isUpper: (value) => /[A-Z,А-Я]/.test(value) || 'Пароль должен содержать хотя бы одну заглавную букву',
              specialSymbol: (value) => /[!@#$%^&*)(+=.<>{}[\]:;'"|~`_-]/g.test(value) || 'Пароль должен содержать хотя бы 1 специальный символ'
            },
          })}
          placeholder="Пароль"
          type={"password"}
          className={"authentication__input"}
        />
        <span className={errors.password ? "authentication__error authentication__error_active" : "authentication__error"}>{errors?.password?.message || ""}</span>
        <input
          {...register('confirmPassword',{required: 'Обязательное поле',
            validate:{
            confirm: (value) => {  const { password } = getValues()
              return password === value || "Пароли не совпадают!"; }
            }
          })}
          placeholder="Повторите пароль"
          type={"password"}
          className={"authentication__input"}
        />
        <span className={errors.confirmPassword ? "authentication__error authentication__error_active" : "authentication__error"}>{errors?.confirmPassword?.message || ""}</span>
        <button className={isValid ? "authentication__button" : "authentication__button_disabled" } disabled={!isValid}>{isLoading ? textLoad : textOnButton}</button>
      </form>
      <p className={"authentication__text"}> Уже зарегистрированы?
        <Link to="sign-in" className={"authentication__link"}>
          ㅤВойти
        </Link>
      </p>
    </div>
  );
};

export default Register;
