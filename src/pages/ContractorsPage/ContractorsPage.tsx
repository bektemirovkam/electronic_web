import React from "react";

import { BackTop, Layout } from "antd";
import { AppAlert, AppPreloader, ContractorItem } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getContractorsActionStatusState,
  getContractorsErrorMessage,
  getContractorsListState,
  getContractorsLoadingState,
} from "../../store/selectors/contractors";
import { useHistory, useLocation } from "react-router-dom";
import {
  contractorActions,
  deleteContractor,
  getContractors,
} from "../../store/actions/contractors";
import {
  ActionStatusEnum,
  ContractorsQueryFilterType,
  ContractorType,
  DirectionType,
  SortByOrdersFieldsType,
} from "../../types";
const { Content } = Layout;

const ContractorsPage = () => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [showFilter, setShowFilter] = React.useState<boolean>(false);

  const [direction, setDirection] = React.useState<DirectionType>("asc");
  const [sortBy, setSortBy] = React.useState<SortByOrdersFieldsType>("title");

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const contractorsError = useSelector(getContractorsErrorMessage);
  const contractorsActionStatus = useSelector(getContractorsActionStatusState);
  const contractorsLoading = useSelector(getContractorsLoadingState);
  const contractors = useSelector(
    getContractorsListState(
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
      <div className="contractors">
        {contractors &&
          contractors.map((contractor) => {
            return (
              <ContractorItem
                key={contractor.id}
                onDelete={handleDeleteContractor}
                onView={handleViewContractor}
                contractor={contractor}
              />
            );
          })}
      </div>
      <BackTop />
    </Content>
  );
};

export default ContractorsPage;
