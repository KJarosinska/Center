import React from "react"
import { ThemeProvider } from "styled-components"
import { Normalize } from "styled-normalize"
import { configure, addDecorator } from "@storybook/react"
import GlobalStyle from "Renderer/styles/global-style.component"
import theme from "Renderer/styles/theming/theme"
import "Renderer/fonts/fonts.css"
import localeEn from "Renderer/locales/main/en-US.json"
import { IntlProvider } from "react-intl"
import { LANGUAGE } from "Renderer/constants/languages"
import { init } from "@rematch/core"
import devMode from "Renderer/models/dev-mode/dev-mode"
import selectPlugin from "@rematch/select"
import { Provider } from "react-redux"
import StorybookWrapper from "../src/renderer/components/storybook/storybook-wrapper.component"

const store = init({ models: { devMode }, plugins: [selectPlugin()] })

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IntlProvider
          defaultLocale={LANGUAGE.default}
          locale={LANGUAGE.default}
          messages={localeEn}
        >
          <>
            <GlobalStyle />
            <Normalize />
            <StorybookWrapper>
              <Story />
            </StorybookWrapper>
          </>
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  ),
]