export default function validateInfo(values) {
  let errors = {}

  if(!values.name.trim()){
    errors.name = "Введите имя"
  }

    if(!values.name.trim()){
    errors.description = "Введите профессию"
  }

    return errors;

}