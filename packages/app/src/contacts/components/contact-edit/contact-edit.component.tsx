/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, FocusEvent } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { Contact, NewContact } from "App/contacts/store/contacts.type"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { defineMessages } from "react-intl"
import { intl } from "Renderer/utils/intl"
import ButtonComponent from "Renderer/components/core/button/button.component"
import { Type as IconType } from "Renderer/components/core/icon/icon.config"
import {
  DisplayStyle,
  Type,
} from "Renderer/components/core/button/button.config"
import InputCheckbox, {
  Size,
} from "Renderer/components/core/input-checkbox/input-checkbox.component"
import Icon from "Renderer/components/core/icon/icon.component"
import { useForm } from "react-hook-form"
import {
  emailValidator,
  phoneNumberValidator,
} from "Renderer/utils/form-validators"
import InputSelect, {
  RenderInputSelectListItem,
} from "Renderer/components/core/input-select/input-select.component"
import Loader from "Renderer/components/core/loader/loader.component"
import { LoaderType } from "Renderer/components/core/loader/loader.interface"
import { noop } from "Renderer/utils/noop"
import {
  Buttons,
  ContactDetailsWrapper,
  Content,
  CustomCheckbox,
  Input,
  SpeedDial,
  SpeedDialListItem,
  speedDialListStyles,
  SpeedDialSettings,
} from "App/contacts/components/contact-edit/contact-edit.styled"
import { ContactPanelTestIdsEnum } from "App/contacts/components/contact-panel/contact-panel-test-ids.enum"
import { ContactEditTestIdsEnum } from "App/contacts/components/contact-edit/contact-edit-test-ids.enum"

const messages = defineMessages({
  editTitle: { id: "module.contacts.editTitle" },
  newTitle: { id: "module.contacts.newTitle" },
  firstName: { id: "module.contacts.firstName" },
  secondName: { id: "module.contacts.secondName" },
  primaryNumber: { id: "module.contacts.primaryNumber" },
  secondaryNumber: { id: "module.contacts.secondaryNumber" },
  email: { id: "module.contacts.email" },
  speedDialKeyEmptyOption: {
    id: "module.contacts.speedDialKeyEmptyOption",
  },
  speedDialKeySelect: {
    id: "module.contacts.speedDialKeySelect",
  },
  speedDialKey: { id: "module.contacts.speedDialKey" },
  speedDialSettings: { id: "module.contacts.speedDialSettings" },
  addToFavourites: { id: "module.contacts.addToFavourites" },
  iceContact: { id: "module.contacts.iceContact" },
  firstAddressLine: { id: "module.contacts.firstAddressLine" },
  secondAddressLine: { id: "module.contacts.secondAddressLine" },
  notes: { id: "module.contacts.editNotes" },
  cancel: { id: "module.contacts.cancelEdit" },
  save: { id: "module.contacts.editSave" },
})

export const defaultContact = {
  firstName: "",
  lastName: "",
  primaryPhoneNumber: "",
  secondaryPhoneNumber: "",
  email: "",
  note: "",
  firstAddressLine: "",
  secondAddressLine: "",
  favourite: false,
  blocked: false,
  speedDial: undefined,
  ice: false,
} as NewContact

type NameUpdateProps = Pick<Contact, "firstName" | "lastName">

interface ContactEditProps {
  contact?: Contact
  speedDialChosenList: number[]
  onCancel: (contact?: Contact) => void
  onSpeedDialSettingsOpen: () => void
  onSave: (contact: Contact) => void
  onNameUpdate?: ({ firstName, lastName }: NameUpdateProps) => void
  saving?: boolean
}

const ContactEdit: FunctionComponent<ContactEditProps> = ({
  contact,
  speedDialChosenList,
  onCancel,
  onSave,
  onSpeedDialSettingsOpen,
  onNameUpdate = noop,
  saving,
  ...rest
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: contact,
    mode: "onChange",
  })

  const handleCancel = () => {
    onCancel(contact)
  }

  const handleSave = handleSubmit((data) => {
    const formData = {
      ...contact,
      ...data,
      speedDial:
        data.speedDial?.toString() ===
        intl.formatMessage(messages.speedDialKeySelect)
          ? undefined
          : Number(data.speedDial),
    }
    onSave(formData)
  })

  const fields = watch()

  useEffect(() => {
    handleSpeedDialSelect(contact?.speedDial)
  }, [contact?.speedDial])

  const speedDialAssignPossible =
    (fields.primaryPhoneNumber && !errors.primaryPhoneNumber) ||
    (fields.secondaryPhoneNumber && !errors.secondaryPhoneNumber)

  const savingPossible =
    fields.firstName?.trim() ||
    fields.lastName?.trim() ||
    fields.primaryPhoneNumber ||
    fields.secondaryPhoneNumber ||
    fields.email ||
    fields.firstAddressLine?.trim() ||
    fields.secondAddressLine?.trim() ||
    fields.note?.trim()

  const trimInputValue = (event: FocusEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.trim()
  }

  const handleUsernameBlur = (event: FocusEvent<HTMLInputElement>) => {
    trimInputValue(event)
    onNameUpdate({ firstName: fields.firstName, lastName: fields.lastName })
  }

  const handleSpeedDialSelect = (value: number | undefined) => {
    setValue("speedDial", value)
  }

  const speedDialListItemRenderer: RenderInputSelectListItem<number> = ({
    item,
    props,
  }) => <SpeedDialListItem {...props}>{item}</SpeedDialListItem>

  const headerLeft = (
    <Text
      displayStyle={TextDisplayStyle.LargeBoldText}
      message={contact?.id ? messages.editTitle : messages.newTitle}
    />
  )

  return (
    <ContactDetailsWrapper
      {...rest}
      show
      onClose={handleCancel}
      headerLeft={headerLeft}
    >
      <form onSubmit={handleSave}>
        <Content>
          <div>
            <Input
              type="text"
              label={intl.formatMessage(messages.firstName)}
              {...register("firstName")}
              errorMessage={errors.firstName?.message}
              onBlur={handleUsernameBlur}
              data-testid={ContactEditTestIdsEnum.FirstName}
            />
            <Input
              type="text"
              label={intl.formatMessage(messages.secondName)}
              {...register("lastName")}
              errorMessage={errors.lastName?.message}
              onBlur={handleUsernameBlur}
              data-testid={ContactEditTestIdsEnum.SecondName}
            />
            <Input
              type="tel"
              label={intl.formatMessage(messages.primaryNumber)}
              {...register("primaryPhoneNumber", phoneNumberValidator)}
              errorMessage={errors.primaryPhoneNumber?.message}
              data-testid={ContactEditTestIdsEnum.PrimaryNumber}
            />
            <Input
              type="tel"
              label={intl.formatMessage(messages.secondaryNumber)}
              {...register("secondaryPhoneNumber", phoneNumberValidator)}
              errorMessage={errors.secondaryPhoneNumber?.message}
              data-testid={ContactEditTestIdsEnum.SecondaryNumber}
            />
            <Input
              type="email"
              label={intl.formatMessage(messages.email)}
              defaultValue={contact?.email}
              {...register("email", emailValidator)}
              errorMessage={errors.email?.message}
              data-testid={ContactEditTestIdsEnum.Email}
            />
          </div>
          <div>
            <SpeedDial>
              <InputSelect
                {...register("speedDial")}
                disabled={!speedDialAssignPossible}
                items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                disabledItems={speedDialChosenList}
                label={intl.formatMessage(messages.speedDialKey)}
                emptyItemValue={intl.formatMessage(
                  messages.speedDialKeyEmptyOption
                )}
                onSelect={handleSpeedDialSelect}
                selectedItem={
                  fields.speedDial ||
                  intl.formatMessage(messages.speedDialKeySelect)
                }
                listStyles={speedDialListStyles}
                renderListItem={speedDialListItemRenderer}
              />
              <SpeedDialSettings
                displayStyle={DisplayStyle.Link3}
                labelMessage={messages.speedDialSettings}
                onClick={onSpeedDialSettingsOpen}
              />
            </SpeedDial>
            <CustomCheckbox>
              <InputCheckbox
                size={Size.Medium}
                {...register("favourite")}
                defaultChecked={contact?.favourite}
              />
              <Text displayStyle={TextDisplayStyle.SmallText}>
                {intl.formatMessage(messages.addToFavourites)}
              </Text>
              <Icon type={IconType.Favourites} height={1} />
            </CustomCheckbox>
            <CustomCheckbox>
              <InputCheckbox
                size={Size.Medium}
                {...register("ice")}
                defaultChecked={contact?.ice}
              />
              <Text displayStyle={TextDisplayStyle.SmallText}>
                {intl.formatMessage(messages.iceContact)}
              </Text>
              <Icon type={IconType.Ice} height={1} />
            </CustomCheckbox>
            <Input
              type="text"
              label={intl.formatMessage(messages.firstAddressLine)}
              {...register("firstAddressLine")}
              errorMessage={errors.firstAddressLine?.message}
              maxLength={30}
              onBlur={trimInputValue}
              data-testid={ContactEditTestIdsEnum.FirstAddressLine}
            />
            <Input
              type="text"
              label={intl.formatMessage(messages.secondAddressLine)}
              {...register("secondAddressLine")}
              errorMessage={errors.secondAddressLine?.message}
              maxLength={30}
              onBlur={trimInputValue}
              data-testid={ContactEditTestIdsEnum.SecondAddressLine}
            />
            <Input
              type="text"
              label={"Note"}
              defaultValue={contact?.note}
              {...register("note")}
              errorMessage={errors.note?.message}
              maxLength={30}
              onBlur={trimInputValue}
              data-testid={ContactEditTestIdsEnum.Note}
            />
          </div>
        </Content>
        <Buttons>
          <ButtonComponent
            displayStyle={DisplayStyle.Secondary}
            labelMessage={messages.cancel}
            onClick={handleCancel}
          />
          <ButtonComponent
            type={Type.Submit}
            disabled={
              !savingPossible || Object.keys(errors).length > 0 || saving
            }
            label={
              saving ? (
                <Loader size={2} type={LoaderType.Spinner} />
              ) : (
                intl.formatMessage(messages.save)
              )
            }
            data-testid={ContactPanelTestIdsEnum.SaveButton}
          />
        </Buttons>
      </form>
    </ContactDetailsWrapper>
  )
}

export default ContactEdit