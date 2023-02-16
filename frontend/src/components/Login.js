import {useForm} from "react-hook-form";

const Login = ({onLogin, textLoad, textOnButton, isLoading}) => {
  const {register, formState: {errors,isValid},handleSubmit,reset } = useForm({mode: "onChange"})

  function onSubmit(data,e) {
    e.preventDefault()
    onLogin(data.email, data.password)
    reset();
  }

  return (
    <div className={"authentication"}>
      <h2 className={"authentication__title"}>Вход</h2>
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
          })}
          placeholder="Пароль"
          className={"authentication__input"}
          type={"password"}
        />
        <span className={errors.password ? "authentication__error authentication__error_active" : "authentication__error"}>{errors?.password?.message || ""}</span>
        <button className={isValid ? "authentication__button" : "authentication__button_disabled" } disabled={!isValid}>{isLoading ? textLoad : textOnButton}</button>
      </form>
    </div>
  );
};

export default Login;
