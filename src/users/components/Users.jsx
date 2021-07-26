import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { showSuccessToast } from '../helpers/toastMessage';
import actions from '../actions/users.actions.types';
import { getUsers, deleteUser, seUserActionSuccess, setUser } from '../actions/users.actions.creators';
import classes from './Users.module.css';

const Users = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { usersList, isFetching, pageSize, totalRecords, deleteUserSuccess } = useSelector(state => state.users);

  const [showConfirm, setShowConfirm] = useState(false);
  const [first, setFirst] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentUserList, setCurrentUserList] = useState([]);
  const [deleteCurrentUser, setDeleteCurrentUser] = useState({});
  const deleteUserSuccessRef = useRef(null);

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (usersList.length) {
      const firstRecord = currentPage * pageSize;
      const lastRecord = firstRecord + pageSize;
      setCurrentUserList(usersList.slice(firstRecord, lastRecord));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, usersList]);

  useEffect(() => {
    deleteUserSuccess && showSuccessToast(deleteUserSuccessRef, "User deleted");
  }, [deleteUserSuccess]);

  const onPageChange = (e) => {
    setCurrentPage(e.page);
    setFirst(e.first);
  };

  const onEdit = (user) => {
    history.push(`edit_user/${user.id}`);
    dispatch(setUser(user));
  };

  const onDelete = (user) => {
    setShowConfirm(true);
    setDeleteCurrentUser(user);
  };

  return (
    <div className="p-d-flex p-ai-center p-flex-column">
      {isFetching && (
        <div className="p-d-flex p-jc-center p-ai-center spinnerRoot" >
          <ProgressSpinner />
        </div>
      )}

      <Toast ref={deleteUserSuccessRef} onRemove={() => dispatch(seUserActionSuccess(false, actions.DELETE_USER_SUCCESS))} />

      <h2>Users</h2>

      <div className={classes.userListRoot}>
        {currentUserList.map(user => {
          return (
            <div className="p-d-flex p-col-12 p-shadow-1 p-mt-3" key={user.id}>
              <div className="p-d-flex p-col-10 p-p-0">
                <div className="p-mr-4">
                  {user.avatar ? (
                    <Avatar image={user.avatar} size="xlarge" shape="circle" />
                  ) : (
                    <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
                  )}
                </div>

                <div className="p-d-flex p-flex-column">
                  <span>{`Name: ${user.name}`}</span>
                  <span>{`Surname: ${user.surname}`}</span>
                  <span>{`About: ${user.desc}`}</span>
                </div>
              </div>

              <div className="p-d-flex p-jc-end p-ai-center p-col-2 p-p-0">
                <Button
                  className="p-button-text p-button-rounded p-mr-2"
                  icon="pi pi-pencil"
                  onClick={() => onEdit(user)}
                />
                <Button
                  className="p-button-text p-button-rounded"
                  icon="pi pi-trash"
                  onClick={() => onDelete(user)}
                />
              </div>
            </div>
          )
        })}
      </div>

      <Paginator
        className={classes.paginator}
        first={first}
        rows={pageSize}
        pageLinkSize={3}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
      />

      <ConfirmDialog
        visible={showConfirm}
        onHide={() => setShowConfirm(false)}
        acceptClassName="p-button-danger"
        message={`Are you sure you want to delete ${deleteCurrentUser.name} ${deleteCurrentUser.name}?`}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => dispatch(deleteUser(deleteCurrentUser.id))}
      />
    </div>
  )
}

export default Users
