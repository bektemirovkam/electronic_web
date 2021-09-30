import React, { ChangeEvent } from "react";

import { Layout, Table, Tag, Button, Space } from "antd";
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

const { Content } = Layout;
const { Column } = Table;

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
      <AppSearchField
        value={searchText}
        onChange={handleChangeSearchText}
        placeholder="Найти по названию организации"
      />
      <Table
        showSorterTooltip={false}
        dataSource={contractors}
        rowKey={"id"}
        expandable={{
          expandedRowRender: (order) => (
            <div className="contractor__expanded">
              <p className="contractor__tab-descr">{order.description}</p>
              <div className="contractor__expanded-action">
                <Button
                  className="contractor__expanded-btn"
                  onClick={() => handleViewContractor(order)}
                >
                  Посмотреть
                </Button>
                <Button
                  className="contractor__expanded-btn"
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
              <NavLink to={`contractors/${contractor.id}`}>
                {contractor.name}
              </NavLink>
            </Space>
          )}
          sorter={getStringSorter("name")}
        />
        <Column<ContractorType>
          title="Номер телефона"
          dataIndex="phoneNumber"
          key="phoneNumber"
        />
        <Column<ContractorType>
          title="Город"
          dataIndex="location"
          key="location"
          sorter={getStringSorter("location")}
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
                    >
                      <Tag
                        color="blue"
                        key={category.categoryId}
                        className="order__tag"
                      >
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
        />
        <Column<ContractorType>
          title="Рейтинг"
          dataIndex="rating"
          key="rating"
          sorter={getNumberSorter("rating")}
        />
      </Table>
    </Content>
  );
};

export default ContractorsPage;
