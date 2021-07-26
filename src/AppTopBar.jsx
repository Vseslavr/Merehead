import React from 'react';
import { useHistory } from "react-router-dom";
import { Menubar } from 'primereact/menubar';

const AppTopBar = () => {
  const history = useHistory();

  const items = [
    {
      label: 'Users',
      icon: 'pi pi-fw pi-users',
      command: () => history.push('/users')
    },
    {
      label: 'Create user',
      icon: 'pi pi-fw pi-pencil',
      command: () => history.push('/create_user')
    }
  ];

  return (
    <div className="card">
      <Menubar model={items} />
    </div>
  );
}

export default AppTopBar;