import { ConnectedRouter } from "connected-react-router"
import { History } from "history"
import * as React from "react"
import { IntlProvider } from "react-intl"
import { Provider } from "react-redux"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"

import BaseRoutes from "Renderer/routes/base-routes"
import GlobalStyle from "Renderer/styles/global-style.component"
import theme from "Renderer/styles/theming/theme"
import FunctionComponent from "Renderer/types/function-component.interface"

import { LANGUAGE } from "Renderer/constants/languages"
import localeEn from "Renderer/locales/main/en-US.json"

interface Props {
  store: any
  history: History
}

const RootWrapper: FunctionComponent<Props> = ({ store, history }) => {
  console.log({ localeEn })
  return (
    <ThemeProvider theme={theme}>
      <>
        <Normalize />
        <GlobalStyle />
        <Provider store={store}>
          <IntlProvider
            defaultLocale={LANGUAGE.default}
            locale={LANGUAGE.default}
            messages={localeEn}
          >
            <ConnectedRouter history={history}>
              <BaseRoutes />
            </ConnectedRouter>
          </IntlProvider>
        </Provider>
      </>
    </ThemeProvider>
  )
}

export default RootWrapper
