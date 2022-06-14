/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createReducer } from "@reduxjs/toolkit"
import { DataSyncEvent } from "App/data-sync/constants"
import { ReadAllIndexesAction } from "App/data-sync/reducers"
import { TemplatesEvent } from "App/templates/constants"
import {
  TemplateState,
  DeleteTemplateAction,
  CreateTemplateRejectedAction,
  CreateTemplateFulfilledAction,
  UpdateTemplateFulfilledAction,
  DeleteTemplateRejectedAction,
  UpdateTemplateRejectedAction,
} from "App/templates/reducers/template.interface"
import {
  pendingAction,
  rejectedAction,
  fulfilledAction,
} from "App/__deprecated__/renderer/store/helpers"

export const initialState: TemplateState = {
  data: [],
  loaded: false,
  loading: false,
  error: null,
}

export const templateReducer = createReducer<TemplateState>(
  initialState,
  (builder) => {
    builder.addCase(pendingAction(TemplatesEvent.CreateTemplate), (state) => {
      return {
        ...state,
        loaded: false,
        loading: true,
      }
    })

    builder.addCase(
      fulfilledAction(TemplatesEvent.CreateTemplate),
      (state, action: CreateTemplateFulfilledAction) => {
        return {
          ...state,
          data: [...state.data, action.payload],
          error: null,
          loaded: true,
          loading: false,
        }
      }
    )

    builder.addCase(
      rejectedAction(TemplatesEvent.CreateTemplate),
      (state, action: CreateTemplateRejectedAction) => {
        return {
          ...state,
          error: action.payload.message,
          loaded: false,
          loading: false,
        }
      }
    )

    builder.addCase(pendingAction(TemplatesEvent.UpdateTemplate), (state) => {
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      }
    })

    builder.addCase(
      fulfilledAction(TemplatesEvent.UpdateTemplate),
      (state, action: UpdateTemplateFulfilledAction) => {
        const updatedList = state.data.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload
          }

          return item
        })

        return {
          ...state,
          error: null,
          data: updatedList,
          loaded: true,
          loading: false,
        }
      }
    )

    builder.addCase(
      rejectedAction(TemplatesEvent.UpdateTemplate),
      (state, action: UpdateTemplateRejectedAction) => {
        return {
          ...state,
          error: action.payload.message,
          loaded: false,
          loading: false,
        }
      }
    )

    builder
      .addCase(
        fulfilledAction(DataSyncEvent.ReadAllIndexes),
        (state, action: ReadAllIndexesAction) => {
          return {
            ...state,
            data: Object.values(action.payload.templates),
          }
        }
      )
      .addCase(
        fulfilledAction(TemplatesEvent.DeleteTemplates),
        (state, action: DeleteTemplateAction) => {
          const ids = action.payload
          const templates = [...state.data]

          const updatedTemplates = templates.filter(
            (template) => !ids.some((id) => id === template.id)
          )

          return {
            ...state,
            deleting: true,
            data: updatedTemplates,
            loaded: true,
            loading: false,
          }
        }
      )
      .addCase(pendingAction(TemplatesEvent.DeleteTemplates), (state) => {
        return {
          ...state,
          deleting: true,
          loaded: false,
          loading: true,
          error: null,
        }
      })
      .addCase(
        rejectedAction(TemplatesEvent.DeleteTemplates),
        (state, action: DeleteTemplateRejectedAction) => {
          return {
            ...state,
            deleting: true,
            loaded: false,
            loading: false,
            error: action.payload.message,
          }
        }
      )
  }
)
