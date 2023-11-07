/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/*
  There can be an issue when a modal will be requested to open just after the closing
  the previous one, without awaiting the closing procedure to end.

  modalService.close()
  modalService.open()

  This will lead to an error, since the closing take some time (it waits for the
  closing animation to finish before reporting the "ok" status.

  In this, rather unlikely, scenario, the service should be refactored.
*/
import React, { createContext, ReactElement, useContext } from "react"
import { IntlProvider } from "react-intl"
import { Provider } from "react-redux"
import { Router } from "react-router"
import {
  ModalBackdrop,
  ModalWrapper,
} from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import localeEn from "App/__deprecated__/renderer/locales/default/en-US.json"
import history from "App/__deprecated__/renderer/routes/history"
import { Store } from "App/__deprecated__/renderer/store"
import { ThemeProvider } from "styled-components"
import theme from "App/__deprecated__/renderer/styles/theming/theme"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { createRoot, Root } from "react-dom/client"

enum ModalError {
  NoModalToClose = "Close modal action cannot be performed. There is no modal opened.",
  ClosingForbidden = "Cannot close current modal. If you really want to close it, use force parameter or call allowClosingModal(true) method.",
  AnotherModalOpened = "Another modal is already opened. Modal added to queue.",
}

const logError = (message: ModalError) => {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`Modal error: ${message}`)
  }
}

interface EventListeners {
  type: string
  element: Node
  event: (e: Event) => void
}

export class ModalService {
  private store?: Store
  private defaultLocale?: string
  private modalElement: HTMLDivElement | null = null
  private backdropElement: HTMLDivElement | null = null
  private modalOpened = false
  private backdropOpened = false
  private modalClosingAllowed = true
  private backdropClosingAllowed = true
  private eventListeners: EventListeners[] = []
  private modalsQueue: ReactElement[] = []
  private backdropRoot: Root | null = null
  private modalRoot: Root | null = null

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public bindStore(value: Store) {
    if (!this.store) {
      this.store = value
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public setDefaultLocale(value: string) {
    if (!this.defaultLocale) {
      this.defaultLocale = value
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public isModalOpen() {
    return this.modalOpened && this.backdropOpened
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async closeModal(force = false) {
    if (!this.isModalOpen()) {
      logError(ModalError.NoModalToClose)
      return
    }
    if (!this.modalClosingAllowed && !force) {
      logError(ModalError.ClosingForbidden)
      return
    }

    if (this.modalsQueue.length) {
      void this.openModal(this.modalsQueue.shift() as ReactElement, true)
      return
    }

    const animationEndPromise = (element: HTMLElement) => {
      return new Promise((resolve) => {
        const child = element.firstChild as HTMLElement
        child.style.animationName = "fadeOut"

        this.registerEventListener(
          "webkitAnimationEnd",
          child,
          () => {
            resolve(undefined)
          },
          true
        )
      })
    }

    const { modalElement, backdropElement, modalOpened } = this

    if (modalElement && backdropElement && modalOpened) {
      const modalPromise = animationEndPromise(modalElement)
      const allPromises = [modalPromise]

      if (this.backdropClosingAllowed) {
        const backdropPromise = animationEndPromise(backdropElement)
        allPromises.push(backdropPromise)
      }

      await Promise.all(allPromises)

      this.unMountModal()
      if (this.backdropClosingAllowed) {
        this.unMountBackdrop()
      }
    }
    this.backdropClosingAllowed = true
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async openModal(modal: ReactElement, force = false) {
    if (this.isModalOpen()) {
      if (force) {
        this.backdropClosingAllowed = false
        await this.closeModal(true)
      } else {
        this.modalsQueue.push(modal)
        logError(ModalError.AnotherModalOpened)
        return
      }
    }
    this.allowClosingModal()
    this.mountBackdrop()
    this.renderBackdrop()
    this.mountModal()
    this.renderModal(modal)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public rerenderModal(modal: ReactElement) {
    if (this.isModalOpen()) {
      this.renderModal(modal)
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public allowClosingModal() {
    this.modalClosingAllowed = true
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public preventClosingModal() {
    this.modalClosingAllowed = false
  }

  private registerEventListener(
    type: EventListeners["type"],
    element: EventListeners["element"],
    event: EventListeners["event"],
    once = false
  ) {
    const eventWrapper = (e: Event) => {
      event(e)
      if (once) {
        element.removeEventListener(type, eventWrapper)
      }
    }
    if (!once) {
      this.eventListeners.push({ type, element, event: eventWrapper })
    }
    element.addEventListener(type, eventWrapper)
  }

  private mountModal = () => {
    this.modalElement = document.createElement("div")
    document.body.appendChild(this.modalElement)
  }

  private mountBackdrop = () => {
    if (!this.backdropOpened) {
      this.backdropElement = document.createElement("div")
      this.backdropRoot = createRoot(this.backdropElement)
      document.body.appendChild(this.backdropElement)
    }
  }

  private unMountModal = () => {
    this.modalOpened = false
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.modalElement!.remove()
  }

  private unMountBackdrop = () => {
    this.backdropOpened = false

    if (this.backdropElement) {
      this.backdropElement.remove()
      this.backdropRoot = null
      this.eventListeners.forEach(({ type, element, event }) => {
        element.removeEventListener(type, event)
      })
    }
  }

  private renderModal = (modal: ReactElement) => {
    if (this.store && this.defaultLocale && this.modalRoot) {
      this.modalRoot.render(
        <Provider store={this.store}>
          <ModalProvider service={this}>
            <ThemeProvider theme={theme}>
              <IntlProvider
                defaultLocale={this.defaultLocale}
                locale={this.defaultLocale}
                messages={localeEn}
              >
                <Router history={history}>
                  <ModalWrapper>{modal}</ModalWrapper>
                </Router>
              </IntlProvider>
            </ThemeProvider>
          </ModalProvider>
        </Provider>
      )
      this.modalOpened = true
    }
  }

  private renderBackdrop = () => {
    if (this.backdropRoot) {
      this.backdropRoot.render(
        <ThemeProvider theme={theme}>
          <ModalBackdrop />
        </ThemeProvider>
      )
      this.backdropOpened = true
    }
  }
}

const modalService = new ModalService()

const ModalContext = createContext(modalService)

interface Props {
  service: ModalService
}

export const ModalProvider: FunctionComponent<Props> = ({
  service,
  children,
}) => {
  return (
    <ModalContext.Provider value={service}>{children}</ModalContext.Provider>
  )
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useModalServiceContext = () => useContext(ModalContext)

export default modalService
