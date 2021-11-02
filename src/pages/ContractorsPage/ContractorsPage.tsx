import React, { ChangeEvent } from "react";
import { ReloadOutlined } from "@ant-design/icons";

import { Layout, Table, Tag, Button, Space, Typography } from "antd";
import { AppAlert, AppPreloader, AppSearchField } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getContractorsActionStatusState,
  getContractorsErrorMessage,
  getFilteredContractorsListState,
  getContractorsLoadingState,
} from "../../store/selectors/contractors";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import {
  contractorActions,
  deleteContractor,
  getContractors,
} from "../../store/actions/contractors";
import { ActionStatusEnum } from "../../models/types";
import {
  ContractorNumberSortFieldsType,
  ContractorsQueryFilterType,
  ContractorStringSortFieldsType,
  ContractorType,
  ContractorTypesEnum,
} from "../../models/Contractors";
import { formatDate, truncateString } from "../../utils/formatter";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const { Content } = Layout;
const { Column } = Table;
const { Text } = Typography;

const getNumberSorter = (fieldName: ContractorNumberSortFieldsType) => ({
  compare: (a: ContractorType, b: ContractorType) =>
    a[fieldName] - b[fieldName],
});

const getStringSorter = (fieldName: ContractorStringSortFieldsType) => ({
  compare: (a: ContractorType, b: ContractorType) =>
    a[fieldName].localeCompare(b[fieldName]),
});

const ContractorsPage = () => {
  const [searchText, setSearchText] = React.useState<string>("");

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const contractorsError = useSelector(getContractorsErrorMessage);
  const contractorsActionStatus = useSelector(getContractorsActionStatusState);
  const contractorsLoading = useSelector(getContractorsLoadingState);
  const contractors = useSelector(
    getFilteredContractorsListState(
      searchText,
      query.get("filter") as ContractorsQueryFilterType,
      query.get("category")
    )
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const { xxl } = useBreakpoint();

  const clearState = React.useCallback(() => {
    dispatch(
      contractorActions.setContractorsActionstatus(ActionStatusEnum.NEVER)
    );
    dispatch(contractorActions.setContractorsErrorMessage(null));
  }, [dispatch]);

  const handleDeleteContractor = (id: number) => {
    const answer = window.confirm("Вы уверены что хотите удалить контрагента?");
    if (answer) {
      dispatch(deleteContractor(id));
    }
  };

  const handleViewContractor = (contractor: ContractorType) => {
    history.push(`contractors/${contractor.id}`);
  };

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  const fetchData = React.useCallback(() => {
    dispatch(getContractors());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getContractors());
    return () => {
      clearState();
    };
  }, [dispatch, clearState]);

  const addCategory = (categoryId: number) => {
    history.replace(`?category=${categoryId}`);
  };

  if (contractorsLoading) {
    return <AppPreloader size="large" />;
  }

  return (
    <Content className="content">
      <AppAlert
        onClose={clearState}
        errorMessage={contractorsError}
        successMessage="Контрагент успешно удален"
        status={contractorsActionStatus}
      />
      <div className="contractors__header">
        <AppSearchField
          value={searchText}
          onChange={handleChangeSearchText}
          placeholder="Найти по названию организации"
        />
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
        dataSource={contractors}
        rowKey={"id"}
        size={xxl ? "middle" : "small"}
        expandable={{
          expandedRowRender: (order) => (
            <div className="contractor__expanded">
              <p className="contractor__tab-descr table-value">
                {order.description}
              </p>
              <div className="contractor__expanded-action">
                <Button
                  className="contractor__expanded-btn table-value"
                  onClick={() => handleViewContractor(order)}
                >
                  Посмотреть
                </Button>
                <Button
                  className="contractor__expanded-btn table-value"
                  onClick={() => handleDeleteContractor(order.id)}
                  danger
                >
                  Удалить
                </Button>
              </div>
            </div>
          ),
        }}
      >
        <Column<ContractorType>
          title="Тип контрагента"
          dataIndex="contractorType"
          key="contractorType"
          render={(_, contractor) => {
            const colors = {
              [ContractorTypesEnum.CUSTOMER]: "green",
              [ContractorTypesEnum.SUPPLIER]: "geekblue",
              [ContractorTypesEnum.UNKNOWN]: "gray",
            };

            return (
              <Tag
                color={colors[contractor.contractorType]}
                key={contractor.contractorType}
                className="table-tag"
              >
                {contractor.contractorType === ContractorTypesEnum.CUSTOMER
                  ? "Заказчик"
                  : "Поставщик"}
              </Tag>
            );
          }}
          sorter={getStringSorter("contractorType")}
        />
        <Column<ContractorType>
          title="Название организации"
          key="name"
          render={(_, contractor) => (
            <Space size="middle">
              <NavLink
                to={`contractors/${contractor.id}`}
                className="table-value"
              >
                {truncateString(contractor.name, 50)}
              </NavLink>
            </Space>
          )}
          sorter={getStringSorter("name")}
        />
        <Column<ContractorType>
          title="Номер телефона"
          dataIndex="phoneNumber"
          key="phoneNumber"
          className="table-value"
        />
        <Column<ContractorType>
          title="Город"
          dataIndex="location"
          key="location"
          sorter={getStringSorter("location")}
          className="table-value"
        />
        <Column<ContractorType>
          title="Категории"
          dataIndex="categories"
          key="categories"
          render={(_, data) => {
            return (
              <>
                {data.categories
                  .filter((category) => category.parentId === 0)
                  .map((category) => (
                    <Button
                      onClick={() => addCategory(category.categoryId)}
                      type="link"
                      key={category.categoryId}
                    >
                      <Tag color="blue" className="order__tag table-tag">
                        {category.categoryName}
                      </Tag>
                    </Button>
                  ))}
              </>
            );
          }}
        />
        <Column<ContractorType>
          title="Контактное лицо"
          dataIndex="contactName"
          key="contactName"
          className="table-value"
        />
        <Column<ContractorType>
          title="Дата регистрации"
          dataIndex="creationDate"
          key="creationDate"
          render={(_, data) => formatDate(data.creationDate)}
          defaultSortOrder="descend"
          sorter={getNumberSorter("creationDate")}
          className="table-value"
        />
        <Column<ContractorType>
          title="Рейтинг"
          dataIndex="rating"
          key="rating"
          render={(_, data) => {
            return (
              <Text className="table-value">
                {Math.ceil(data.rating * 100) / 100}
              </Text>
            );
          }}
          sorter={getNumberSorter("rating")}
        />
      </Table>
    </Content>
  );
};

export default ContractorsPage;
