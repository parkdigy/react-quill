import React, { useMemo } from 'react';
import * as AdminLayout from '@pdg/react-admin-layout';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import menu from './menu.json';
import { theme } from './DefaultLayout.types';
import MainRouter from '../../router';

const DefaultLayout = () => {
  const navigate = useNavigate();

  //--------------------------------------------------------------------------------------------------------------------

  const finalMenu = useMemo(
    () =>
      menu.map((info) => ({
        ...info,
        uri: !info.uri ? info.uri : isEnvProduction ? `/react-quill${info.uri}` : info.uri,
        // items: info.items?.map((subInfo) => ({
        //   ...subInfo,
        //   uri: !subInfo.uri ? subInfo.uri : isEnvProduction ? `/react-quill{subInfo.uri}` : subInfo.uri,
        // })),
      })),
    []
  );

  //--------------------------------------------------------------------------------------------------------------------

  const handleMenuClick = (menuItem: AdminLayout.MenuItem) => {
    if (menuItem.uri) {
      navigate(menuItem.uri);
    }
  };

  //--------------------------------------------------------------------------------------------------------------------

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminLayout.DefaultLayout logo='react-quill' menu={finalMenu} onMenuClick={handleMenuClick}>
        <MainRouter />
      </AdminLayout.DefaultLayout>
    </ThemeProvider>
  );
};

export default DefaultLayout;
