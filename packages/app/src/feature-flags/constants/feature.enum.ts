/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum Feature {
  ProductionReleaseOnly = "production-release-only",
  TestProductionReleaseOnly = "test-production-release-only",
  AllReleaseListAvailable = "all-release-list-available",

  LoggerEnabled = "logger-enabled",
  LogsScrubbingEnabled = "logs-scrubbing-enabled",
  DeveloperModeEnabled = "developer-mode-enabled",
  FilesManagerEnabled = "files-manager-enabled",
  MessagesSearchEnabled = "messages-search-enabled",
  MessagesThreadDeleteEnabled = "messages-thread-delete-enabled",
  MessagesThreadAttachContactEnabled = "messages-thread-attach-contact-enabled",
  MessagesThreadAttachTemplateEnabled = "messages-thread-attach-contact-enabled",
  MessagesThreadCallsEnabled = "messages-thread-calls-enabled",
  MessagesThreadDetailsMarkAsReadEnabled = "messages-thread-details-mark-as-read-enabled",
  MessagesCallFromThreadEnabled = "messages-call-from-thread-enabled",
  MessagesTemplatesTabEnabled = "messages-templates-tab-enabled",
  MuditaCenterPrereleaseEnabled = "mudita-center-prerelease-enabled",
  ContactForwardEnabled = "contact-forward-enabled",
  ContactBlockingEnabled = "contact-blocking-enabled",
  ContactPhoneFieldIconsEnabled = "contact-phone-field-icons-enabled",
  ContactExportEnabled = "contact-export-enabled",
  TetheringEnabled = "tethering-enabled",
  SettingsNotificationTabEnabled = "settings-notification-tab-enabled",
  SettingsAudioConversionTabEnabled = "settings-audio-conversion-tab-enabled",
  PhoneTabEnabled = "phone-tab-enabled",
  PhoneDialTabEnabled = "phone-dial-tab-enabled",
  ToolsTabEnabled = "tools-tab-enabled",
  MusicTabEnabled = "music-tab-enabled",
  CalendarTabEnabled = "calendar-tab-enabled",
  MeditationTabEnabled = "meditation-tab-enabled",
  RecoveryModeTabEnabled = "recovery-mode-tab-enabled",
  YourPureIconsEnabled = "your-pure-icons-enabled",
}
