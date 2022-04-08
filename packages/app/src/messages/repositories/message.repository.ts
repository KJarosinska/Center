/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Repository } from "App/core/types"
import { MessageModel } from "App/messages/models"
import { Message } from "App/messages"

export class MessageRepository implements Repository {
  constructor(private messageModel: MessageModel) {}

  public create(message: Message, skipCallbacks = false): void {
    this.messageModel.create(message, skipCallbacks)
  }
}
