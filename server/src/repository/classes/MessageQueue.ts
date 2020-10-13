import { Message } from "../../metadata/types";

export default interface MessageQueue {
  pushMessage(m: Message): void;
}
