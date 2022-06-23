/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Template as PureTemplate,
  PutTemplateBody,
  MessagesCategory as PureMessagesCategory,
  PostTemplateBody,
  UpdateTemplateOrder,
} from "@mudita/pure"
import { NewTemplate, Template } from "App/templates/dto"

export class TemplatePresenter {
  static mapToPureNewTemplateBody(template: NewTemplate): PostTemplateBody {
    return {
      templateBody: template.text,
      category: PureMessagesCategory.template,
      order: template.order,
    }
  }

  static mapToPureTemplateBody(template: Template): PutTemplateBody {
    return {
      templateID: Number(template.id),
      templateBody: template.text,
      category: PureMessagesCategory.template,
    }
  }

  static mapToTemplate(pureTemplate: PureTemplate): Template {
    return {
      id: String(pureTemplate.templateID),
      text: pureTemplate.templateBody,
      lastUsedAt: String(pureTemplate.lastUsedAt),
      order: pureTemplate.order,
    }
  }

  static mapToPureTemplate(template: Template): PureTemplate {
    return {
      templateID: Number(template.id),
      templateBody: template.text,
      lastUsedAt: Number(template.lastUsedAt),
      order: template.order,
    }
  }

  static mapToPureTemplateOrder(template: Template): UpdateTemplateOrder {
    return {
      templateID: Number(template.id),
      category: PureMessagesCategory.template,
      order: template.order,
    }
  }
}
