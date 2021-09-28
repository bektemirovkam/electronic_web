import React, { ChangeEvent } from "react";

import { BackTop, Layout, Table, Tag, Button } from "antd";
import { AppAlert, AppPreloader, AppSearchField } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getContractorsActionStatusState,
  getContractorsErrorMessage,
  getFilteredContractorsListState,
  getContractorsLoadingState,
} from "../../store/selectors/contractors";
import { useHistory, useLocation } from "react-router-dom";
import {
  contractorActions,
  deleteContractor,
  getContractors,
} from "../../store/actions/contractors";
import { ActionStatusEnum } from "../../models/types";
import {
  ContractorsQueryFilterType,
  ContractorType,
  ContractorTypesEnum,
} from "../../models/Contractors";
import { ColumnsType } from "antd/lib/table";
import { CategoryOutType } from "../../models/Categories";
const { Content } = Layout;

const columns: ColumnsType<ContractorType> = [
  {
    title: "Тип контрагента",
    dataIndex: "contractorType",
    render: (status: ContractorTypesEnum) => {
      const colors = {
        [ContractorTypesEnum.CUSTOMER]: "green",
        [ContractorTypesEnum.SUPPLIER]: "geekblue",
        [ContractorTypesEnum.UNKNOWN]: "gray",
      };

      return (
        <Tag color={colors[status]} key={status}>
          {status === ContractorTypesEnum.CUSTOMER ? "Заказчик" : "Поставщик"}
        </Tag>
      );
    },
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
  },
  {
    title: "Название организации",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
  },
  {
    title: "Номер телефона",
    dataIndex: "phoneNumber",
  },
  {
    title: "Город",
    dataIndex: "location",
    sorter: {
      compare: (a, b) => a.location.localeCompare(b.location),
    },
  },
  {
    title: "Категории",
    dataIndex: "categories",
    render: (categories: CategoryOutType[]) => {
      return (
        <>
          {categories
            .filter((category) => category.parentId === 0)
            .map((category) => {
              return (
                <Tag
                  color="blue"
                  key={category.categoryId}
                  className="order__tag"
                >
                  {category.categoryName}
                </Tag>
              );
            })}
        </>
      );
    },
  },

  {
    title: "Контактное лицо",
    dataIndex: "contactName",
  },
  {
    title: "Рейтинг",
    dataIndex: "rating",
    sorter: {
      compare: (a, b) => a.rating - b.rating,
    },
  },
];

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
      query.get("filter") as ContractorsQueryFilterType
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
        columns={columns}
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
      />
      <BackTop />
    </Content>
  );
};

export default ContractorsPage;
