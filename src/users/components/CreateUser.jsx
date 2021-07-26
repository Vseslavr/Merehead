import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import UserForm from './UserForm';
import { Toast } from 'primereact/toast';
import { showSuccessToast } from '../helpers/toastMessage';
import actions from '../actions/users.actions.types';
import { createUser, seUserActionSuccess } from '../actions/users.actions.creators';

const CreateUser = () => {
  const dispatch = useDispatch();
  const { createUserSuccess } = useSelector(state => state.users);
  const createUserSuccessRef = useRef(null);

  useEffect(() => {
    createUserSuccess && showSuccessToast(createUserSuccessRef, 'User created');
  }, [createUserSuccess]);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      desc: ""
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = 'Name is required.';
      }

      if (!data.surname) {
        errors.surname = 'Surname is required.';
      }

      if (!data.desc) {
        errors.desc = 'Description is required.';
      }

      return errors;
    },

    onSubmit: (data) => {
      dispatch(createUser(data, formik.resetForm));
    }
  });

  return (
    <>
      <Toast
        ref={createUserSuccessRef}
        onRemove={() => dispatch(seUserActionSuccess(false, actions.CREATE_USER_SUCCESS))}
      />
      <UserForm formik={formik} isNew={true} />
    </>
  );
}

export default CreateUser