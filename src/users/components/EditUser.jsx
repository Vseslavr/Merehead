import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import UserForm from './UserForm';
import { Toast } from 'primereact/toast';
import actions from '../actions/users.actions.types';
import { showSuccessToast } from '../helpers/toastMessage';
import { editUser, seUserActionSuccess } from '../actions/users.actions.creators';

const EditUser = () => {
  const dispatch = useDispatch();
  const { user, editUserSuccess } = useSelector(state => state.users);
  const editUserSuccessRef = useRef(null);

  useEffect(() => {
    editUserSuccess && showSuccessToast(editUserSuccessRef, 'User edited');
  }, [editUserSuccess]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: user,
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
      dispatch(editUser(data, formik.resetForm));
    }
  });

  return (
    <>
      <Toast
        ref={editUserSuccessRef}
        onRemove={() => dispatch(seUserActionSuccess(false, actions.EDIT_USER_SUCCESS))}
      />
      <UserForm formik={formik} isNew={false} />
    </>
  );
}

export default EditUser