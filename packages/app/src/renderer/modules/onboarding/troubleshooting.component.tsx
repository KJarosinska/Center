/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { useHistory } from "react-router"
import { URL_ONBOARDING } from "Renderer/constants/urls"
import OnboardingTroubleshooting from "Renderer/components/rest/onboarding/onboarding-troubleshooting.component"
import { useContactSupport } from "Renderer/utils/contact-support/use-contact-support"
import ContactSupportModalFlow from "App/contacts/components/contact-modal/contact-support-modal-flow.component"

const Troubleshooting = () => {
  const history = useHistory()
  const {
    openModal,
    openContactSupportModal,
    sendForm,
    sending,
    log,
    closeSuccessModal,
    closeFailModal,
  } = useContactSupport()

  const onRetry = () => {
    // TODO: do some logic to retry connection
    history.push(URL_ONBOARDING.connecting)
  }

  return (
    <>
      <ContactSupportModalFlow
        config={openModal}
        sendForm={sendForm}
        sending={sending}
        log={log}
        closeSuccessModal={closeSuccessModal}
        closeFailModal={closeFailModal}
      />
      <OnboardingTroubleshooting
        onRetry={onRetry}
        onContact={openContactSupportModal}
      />
    </>
  )
}

export default Troubleshooting
