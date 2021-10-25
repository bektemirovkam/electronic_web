import { Content } from "antd/lib/layout/layout";
import { List, Typography, Image } from "antd";
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
import {
  ChatMessageAttachmentTypesEnum,
  ChatMessageOutType,
  ChatTypesMessageEnum,
} from "../../models/Chats";
import { baseURL } from "../../api/axios";

const ChatMessage = (item: ChatMessageOutType) => {
  if (item.type === ChatTypesMessageEnum.TEXT) {
    return (
      <List.Item>
        <Typography.Text>{formatDateWithTime(item.timeStamp)}</Typography.Text>
        <Typography.Text className="message__sender" mark>
          [{item.senderName}]
        </Typography.Text>{" "}
        {item.text}
      </List.Item>
    );
  }

  if (item.type === ChatTypesMessageEnum.ATTACHMENT) {
    return (
      <List.Item className="message">
        <Typography.Text>{formatDateWithTime(item.timeStamp)}</Typography.Text>
        <Typography.Text className="message__sender" mark>
          [{item.senderName}]
        </Typography.Text>{" "}
        {item.attachmentType === ChatMessageAttachmentTypesEnum.PICTURE && (
          <Image src={`${baseURL}${item.text}`} className="message__image" />
        )}
        {item.attachmentType === ChatMessageAttachmentTypesEnum.VIDEO && (
          <video className="message__video" controls>
            <source src={`${baseURL}${item.text}`} />
          </video>
        )}
        {item.attachmentType === ChatMessageAttachmentTypesEnum.DOCUMENT && (
          <a href={`${baseURL}${item.text}`}>Загрузить вложение</a>
        )}
      </List.Item>
    );
  }

  return null;
};

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
        <List bordered dataSource={messages} renderItem={ChatMessage} />
      )}
    </Content>
  );
};

export default ChatPage;
