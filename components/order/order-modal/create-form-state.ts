import { IOrder } from './initial-order';


export const createFormState = (order: IOrder & { hasAgreedTOS: boolean}) => {
  const { email, confirmationEmail, price, hasAgreedTOS } = order;

  if (!price || Number(price) <= 0) {
    return {
      isDisabled: true, message: 'Price is not valid'
    }
} else if (confirmationEmail.length === 0 || email.length === 0) {
    return {
  isDisabled: true, message: ''
}
  } else if (confirmationEmail !== email) {
    return {
      isDisabled: true, message: 'Emails are not matching'
    }
  
  } else if (!hasAgreedTOS) {
    return {
      isDisabled: true, message: 'You need to agree with terms of service in order to submit the form'
    }
  }

    return {
    isDisabled: false, message: ''
  }


}

