/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent as ReactFunctionComponent } from "react"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/ban-types
export type FunctionComponent<P = {}> = ReactFunctionComponent<
  Readonly<P & { className?: string }>
>
