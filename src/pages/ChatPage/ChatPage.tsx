import { Content } from "antd/lib/layout/layout";
import { List, Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppPreloader } from "../../components";
import { getChatMessages } from "../../store/actions/chats";
import {
  getChatLoadinState,
  getChatMessagesState,
} from "../../store/selectors/chats";
import { formatDateWithTime } from "../../utils/formatter";

const ChatPage = () => {
  const { orderId, chatId }: { orderId: string; chatId: string } = useParams();

  const messages = useSelector(getChatMessagesState);
  const messagesLoading = useSelector(getChatLoadinState);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getChatMessages(Number(orderId), Number(chatId)));
  }, [chatId, dispatch, orderId]);

  if (messagesLoading) {
    return <AppPreloader />;
  }

  return (
    <Content className="content">
      {messages && (
        <List
          bordered
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>
                {formatDateWithTime(item.timeStamp)}
              </Typography.Text>
              <Typography.Text mark>[{item.senderName}]</Typography.Text>{" "}
              {item.text}
            </List.Item>
          )}
        />
      )}
    </Content>
  );
};

export default ChatPage;
