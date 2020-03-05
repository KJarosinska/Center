import React, { useEffect } from "react"
import { ipcRenderer } from "electron-better-ipc"
import modalService from "Renderer/components/core/modal/modal.service"
import {
  CheckingUpdatesModal,
  DownloadingUpdateCancelledModal,
  DownloadingUpdateFinishedModal,
  DownloadingUpdateInterruptedModal,
  DownloadingUpdateModal,
  UpdateAvailable,
  UpdateNotAvailable,
  UpdateServerError,
} from "Renderer/modules/overview/overview.modals"
import delayResponse from "Renderer/utils/delay-response"
import availableOsUpdateRequest from "Renderer/requests/available-os-update.request"
import downloadOsUpdateRequest, {
  cancelOsDownload,
} from "Renderer/requests/download-os-update.request"
import { PureOsDownloadChannels } from "App/main/functions/register-pure-os-download-listener"
import {
  DownloadProgress,
  DownloadStatus,
  Filename,
  Filesize,
} from "Renderer/interfaces/file-download.interface"
import osUpdateAlreadyDownloadedCheck from "Renderer/requests/os-update-already-downloaded.request"
import { OsUpdateAvailability } from "Renderer/models/basic-info/interfaces"

const onOsDownloadCancel = () => {
  cancelOsDownload()
}

const useSystemUpdateFlow = (
  lastUpdate: string,
  storeUpdater: (updateInfo: OsUpdateAvailability) => void
) => {
  useEffect(() => {
    const downloadListener = (event: Event, progress: DownloadProgress) => {
      const { status, percent, speed, timeLeft } = progress
      if (status === DownloadStatus.Interrupted) {
        cancelOsDownload(true)
      }
      modalService.rerenderModal(
        <DownloadingUpdateModal
          percent={percent}
          speed={speed}
          timeLeft={timeLeft}
          onCancel={onOsDownloadCancel}
        />
      )
    }
    ipcRenderer.on(PureOsDownloadChannels.progress, downloadListener)
    return () => {
      ipcRenderer.removeListener(
        PureOsDownloadChannels.progress,
        downloadListener
      )
    }
  }, [])

  const updatePure = () => {
    // TODO: Continue update process when Pure updates through USB become available
    console.log("Updating Pure OS...")
  }

  const checkForUpdates = (retry?: boolean) => {
    modalService.openModal(<CheckingUpdatesModal />, retry)
    return delayResponse(availableOsUpdateRequest(lastUpdate))
  }

  const checkForUpdatesFailed = (onRetry: () => void) => {
    return modalService.openModal(<UpdateServerError onRetry={onRetry} />, true)
  }

  const alreadyDownloadedCheck = (file: Filename, size: Filesize) => {
    return osUpdateAlreadyDownloadedCheck(file, size)
  }

  const downloadUpdateFile = async (file: Filename) => {
    await modalService.openModal(
      <DownloadingUpdateModal onCancel={onOsDownloadCancel} />,
      true
    )
    modalService.preventClosingModal()
    return delayResponse(downloadOsUpdateRequest(file))
  }

  const downloadSucceeded = (onOsUpdate: () => void) => {
    return modalService.openModal(
      <DownloadingUpdateFinishedModal onOsUpdate={onOsUpdate} />,
      true
    )
  }

  const downloadCanceled = () => {
    return modalService.openModal(<DownloadingUpdateCancelledModal />, true)
  }

  const downloadInterrupted = (onRetry: () => void) => {
    return modalService.openModal(
      <DownloadingUpdateInterruptedModal onRetry={onRetry} />,
      true
    )
  }

  const availableUpdate = (
    onDownload: () => void,
    version: string,
    date: string
  ) => {
    return modalService.openModal(
      <UpdateAvailable onDownload={onDownload} version={version} date={date} />,
      true
    )
  }

  const notAvailableUpdate = (version: string, date: string) => {
    return modalService.openModal(
      <UpdateNotAvailable version={version} date={date} />,
      true
    )
  }

  const install = async () => {
    updatePure()
  }

  const download = async (file: Filename) => {
    try {
      await downloadUpdateFile(file)
      storeUpdater({ downloaded: true })
      await downloadSucceeded(install)
    } catch (error) {
      if (error.status === DownloadStatus.Cancelled) {
        await downloadCanceled()
      } else {
        await downloadInterrupted(async () => await download(file))
      }
    }
  }

  const check = async (retry?: boolean) => {
    try {
      const { available, version, file, date, size } = await checkForUpdates(
        retry
      )
      if (available) {
        storeUpdater({ filename: file, available: true })
        if (await alreadyDownloadedCheck(file, size)) {
          storeUpdater({ downloaded: true })
          await downloadSucceeded(install)
        } else {
          await availableUpdate(async () => await download(file), version, date)
        }
      } else {
        await notAvailableUpdate(version, date)
      }
    } catch (error) {
      await checkForUpdatesFailed(async () => await check(true))
    }
  }

  return {
    check,
    download,
    install,
  }
}

export default useSystemUpdateFlow
