import React from "react";
import { ReloadOutlined } from "@ant-design/icons";

import { Layout, Table, Button } from "antd";
import { AppAlert, AppPreloader } from "../../components";
import { useDispatch, useSelector } from "react-redux";

import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {
  clearAdminState,
  banAdmin,
  getAllAdmins,
  unBan,
} from "../../store/actions/admin";
import {
  getAdminActionStatusState,
  getAdminErrorMessageState,
  getAdminLoadingState,
  getAdminsState,
} from "../../store/selectors/admin";
import { AdministratorOutType } from "../../models/Administrator";

const { Content } = Layout;
const { Column } = Table;

const AdminsPage = () => {
  const admins = useSelector(getAdminsState);
  const adminsLoading = useSelector(getAdminLoadingState);
  const adminActionStatus = useSelector(getAdminActionStatusState);
  const adminErrorMessage = useSelector(getAdminErrorMessageState);

  const dispatch = useDispatch();

  const { xxl } = useBreakpoint();

  const clearState = React.useCallback(() => {
    dispatch(clearAdminState());
  }, [dispatch]);

  const handleChangeBanStatus = (administrator: AdministratorOutType) => {
    if (administrator.isBlocked) {
      const confirm = window.confirm(
        "Вы действительно хотите разбанить администратора?"
      );
      if (confirm) {
        const newPassword = window.prompt("Придумайте новый пароль");
        if (newPassword) {
          dispatch(
            unBan(administrator.id, {
              phoneNumber: administrator.phoneNumber,
              password: newPassword,
              isBlocked: false,
            })
          );
        }
      }
    } else {
      const confirm = window.confirm(
        "Вы действительно хотите забанить администратора?"
      );
      if (confirm) {
        dispatch(banAdmin(administrator.id));
      }
    }
  };

  const fetchData = React.useCallback(() => {
    dispatch(getAllAdmins());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getAllAdmins());
    return () => {
      clearState();
    };
  }, [dispatch, clearState]);

  if (adminsLoading) {
    return <AppPreloader size="large" />;
  }

  return (
    <Content className="content">
      <AppAlert
        onClose={clearState}
        errorMessage={adminErrorMessage}
        successMessage="Операция прошла успешно"
        status={adminActionStatus}
      />
      <div className="contractors__header">
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          size="large"
          onClick={fetchData}
        />
      </div>
      <Table
        pagination={{ position: ["topRight"] }}
        showSorterTooltip={false}
        dataSource={admins}
        rowKey={"id"}
        size={xxl ? "middle" : "small"}
      >
        <Column<AdministratorOutType>
          title="Номер телефона"
          dataIndex="phoneNumber"
          key="phoneNumber"
          className="table-value"
        />
        <Column<AdministratorOutType>
          title="Статус"
          dataIndex="id"
          key="id"
          className="table-value"
          render={(_, administrator) =>
            administrator.isBlocked ? "Забанен" : "Активный"
          }
        />
        <Column<AdministratorOutType>
          title="Действия"
          dataIndex="id"
          key="id"
          className="table-value"
          render={(_, administrator) => (
            <Button
              onClick={() => handleChangeBanStatus(administrator)}
              danger={!administrator.isBlocked}
            >
              {administrator.isBlocked ? "Разбанить" : "Забанить"}
            </Button>
          )}
        />
      </Table>
    </Content>
  );
};

export default AdminsPage;
