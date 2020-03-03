import { ipcRenderer } from "electron-better-ipc"
import { PureOsDownloadChannels } from "App/main/functions/register-pure-os-download-listener"
import {
  Filename,
  DownloadFinished,
  DownloadStatus,
} from "Renderer/interfaces/file-download.interface"

export const cancelOsDownload = (interrupt = false) => {
  ipcRenderer.send(PureOsDownloadChannels.cancel, interrupt)
}

const downloadOsUpdateRequest = (
  filename: Filename
): Promise<DownloadFinished> => {
  return new Promise(async (resolve, reject) => {
    const data: DownloadFinished = await ipcRenderer.callMain(
      PureOsDownloadChannels.start,
      {
        // TODO: Replace the temporary link with the final one after changing S3 read access to public
        url: `https://mudita-desktop-app.s3-eu-central-1.amazonaws.com/pure-os/${filename}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVLNHCTENZY3X4VS4/20200302/eu-central-1/s3/aws4_request&X-Amz-Date=20200302T114025Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=7cd15f7d55b48474e5c84659d902681b28c23a3147170def3fe2dc5607a96515`,
      }
    )

    data.status === DownloadStatus.Completed ? resolve(data) : reject(data)
  })
}

export default downloadOsUpdateRequest
