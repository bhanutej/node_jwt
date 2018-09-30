import { EMAIL_REGEX } from '../config/keys';

const emailValidation = (email) => {
  const invalidEmail = EMAIL_REGEX.test(email.trim()) === false;

  if(invalidEmail){
    return "Please provide valid Email";
  }

  return;
}

export default emailValidation;
