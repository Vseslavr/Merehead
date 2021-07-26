import React from 'react';
import { useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import cx from "classnames";

const CreateUser = ({ isNew, formik }) => {
  const { isFetching } = useSelector(state => state.users);

  const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
  };

  return (
    <div className="form-demo p-mt-3">
      {isFetching && (
        <div className="p-d-flex p-jc-center p-ai-center spinnerRoot" >
          <ProgressSpinner />
        </div>
      )}

      <div className="p-d-flex p-jc-center">
        <div className="card">
          <h2 className="p-text-center p-mt-0">{isNew ? "Create user" : "Edit user"}</h2>

          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="p-field">
              <span className="p-float-label">
                <InputText
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  autoFocus
                  className={cx({ 'p-invalid': isFormFieldValid('name') })}
                />
                <label htmlFor="name" className={cx({ 'p-error': isFormFieldValid('name') })}>Name*</label>
              </span>
              {getFormErrorMessage('name')}
            </div>

            <div className="p-field">
              <span className="p-float-label">
                <InputText
                  id="surname"
                  name="surname"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  className={cx({ 'p-invalid': isFormFieldValid('surname') })}
                />
                <label htmlFor="surname" className={cx({ 'p-error': isFormFieldValid('surname') })}>Surname*</label>
              </span>
              {getFormErrorMessage('surname')}
            </div>

            <div className="p-field">
              <span className="p-float-label">
                <InputText
                  id="desc"
                  name="desc"
                  value={formik.values.desc}
                  onChange={formik.handleChange}
                  className={cx({ 'p-invalid': isFormFieldValid('name') })}
                />
                <label htmlFor="desc" className={cx({ 'p-error': isFormFieldValid('desc') })}>Description*</label>
              </span>
              {getFormErrorMessage('desc')}
            </div>

            <Button type="submit" label={isNew ? "Create" : "Edit"} className="p-mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser