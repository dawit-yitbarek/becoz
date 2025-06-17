import React from 'react';
import AdminAuthWrapper from './AdminAuthWrapper';
import AdminPanel from '../pages/AdminPage';

export default function ProtectedAdminRoute() {
  return (
    <AdminAuthWrapper>
      <AdminPanel />
    </AdminAuthWrapper>
  );
}
