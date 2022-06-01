/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Controller, IpcEvent } from "App/core/decorators"
import { TemplateService } from "App/templates/services"
import { RequestResponse } from "App/core/types/request-response.interface"
import { ControllerPrefix, IpcTemplateEvent } from "App/templates/constants"
import { NewTemplate, Template } from "App/templates/dto"

@Controller(ControllerPrefix)
export class TemplateController {
  constructor(private templateService: TemplateService) {}

  @IpcEvent(IpcTemplateEvent.CreateTemplate)
  public async createTemplate(
    template: NewTemplate
  ): Promise<RequestResponse<Template>> {
    return this.templateService.createTemplate(template)
  }
}
