import * as yup from 'yup';

export const registerValidation = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
      'Not a valid email address'
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password length should be at least 6 characters') // TODO confirm by business use text constant
    .max(25, 'Password cannot exceed more than 25 characters'), // TODO confirm by business

  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .min(6, 'Password length should be at least 6 characters') // TODO confirm by business
    .max(25, 'Password cannot exceed more than 25 characters') // TODO confirm by business
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export const loginValidation = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
      'Not a valid email address'
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password length should be at least 6 characters') // TODO confirm by business use text constant
    .max(25, 'Password cannot exceed more than 25 characters'), // TODO confirm by business
});
