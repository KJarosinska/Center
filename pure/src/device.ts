import SerialPort from "serialport"
import { EventEmitter } from "events"
import path from "path"
import * as fs from "fs"
import {
  BodyCommand,
  CreateDevice,
  DeviceEventName,
  Endpoint,
  FileResponseStatus,
  Method,
  PureDevice,
  RequestConfig,
  Response,
  ResponseStatus,
  UpdateResponseStatus,
} from "./device.types"
import { createValidRequest, getNewUUID, parseData } from "./parser"
import { Formatter } from "./formatter"

class Device implements PureDevice {
  #port: SerialPort | undefined
  #eventEmitter = new EventEmitter()
  #portBlocked = true

  constructor(private formatter: Formatter, private path: string) {}

  public connect(): Promise<Response> {
    return new Promise((resolve) => {
      this.#port = new SerialPort(this.path, (error) => {
        if (error) {
          resolve({ status: ResponseStatus.ConnectionError })
        } else {
          resolve({ status: ResponseStatus.Ok })
        }
      })

      this.#port.on("data", (event) => {
        this.#eventEmitter.emit(DeviceEventName.DataReceived, event)
      })

      this.#port.on("close", () => {
        this.#eventEmitter.emit(DeviceEventName.Disconnected)
      })
    })
  }

  public disconnect(): Promise<Response> {
    return new Promise((resolve) => {
      if (this.#port === undefined) {
        resolve({ status: ResponseStatus.Ok })
      } else {
        this.#port.close((error) => {
          if (error) {
            resolve({ status: ResponseStatus.ConnectionError })
          } else {
            resolve({ status: ResponseStatus.Ok })
          }
        })
      }
    })
  }

  public request(config: RequestConfig): Promise<Response<any>> {
    if (config.endpoint === Endpoint.FileUpload) {
      return this.fileUploadRequest(config)
    } else if (config.endpoint === Endpoint.DeviceUpdate) {
      return this.deviceUpdateRequest(config)
    } else {
      return new Promise((resolve) => {
        if (!this.#port || !this.#portBlocked) {
          resolve({ status: ResponseStatus.ConnectionError })
        } else {
          const uuid = getNewUUID()

          const listener = async (event: any) => {
            const response = await parseData(event)
            const formattedResponse = this.formatter.formatResponse(
              config.method,
              response
            )
            if (response.uuid === String(uuid)) {
              this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
              resolve(formattedResponse)
            }
          }

          this.#eventEmitter.on(DeviceEventName.DataReceived, listener)
          const formattedConfig = this.formatter.formatRequestConfig(config)
          const request = createValidRequest({ ...formattedConfig, uuid })
          this.#port.write(request)
        }
      })
    }
  }

  public on(eventName: DeviceEventName, listener: () => void): void {
    this.#eventEmitter.on(eventName, listener)
  }

  public off(eventName: DeviceEventName, listener: () => void): void {
    this.#eventEmitter.off(eventName, listener)
  }

  private fileUploadRequest({ file }: RequestConfig): Promise<Response<any>> {
    return new Promise((resolve) => {
      if (!this.#port || !this.#portBlocked || !file) {
        resolve({ status: ResponseStatus.ConnectionError })
      } else {
        this.#portBlocked = false
        const uuid = getNewUUID()

        const listener = async (event: any) => {
          const response = await parseData(event)

          if (response.uuid === String(uuid)) {
            if (response.body.status === FileResponseStatus.Ok) {
              const readStream = fs.createReadStream(file, {
                highWaterMark: 16384,
              })

              readStream.on("data", (data) => {
                if (this.#port) {
                  this.#port.write(data)
                  this.#port.drain()
                }
              })

              readStream.on("end", () => {
                this.#portBlocked = true
              })
            } else {
              this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
              this.#portBlocked = true
              resolve(response)
            }
          } else if (
            response.endpoint === Endpoint.FileSystemUpload &&
            response.status === ResponseStatus.Accepted
          ) {
            this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
            resolve(response)
          }
        }

        this.#eventEmitter.on(DeviceEventName.DataReceived, listener)

        const fileName = path.basename(file)
        const fileSize = fs.lstatSync(file).size

        const config = {
          uuid,
          endpoint: Endpoint.FileSystemUpload,
          method: Method.Post,
          body: {
            fileName,
            fileSize,
            command: BodyCommand.Download,
          },
        }

        const request = createValidRequest(config)
        this.#port.write(request)
      }
    })
  }

  private deviceUpdateRequest({ file }: RequestConfig): Promise<Response<any>> {
    return new Promise((resolve) => {
      if (!this.#port || !this.#portBlocked || !file) {
        resolve({ status: ResponseStatus.ConnectionError })
      } else {
        this.#portBlocked = false
        const uuid = getNewUUID()

        const listener = async (event: any) => {
          const response = await parseData(event)

          if (response.endpoint === Endpoint.Update) {
            if (response.body.status === UpdateResponseStatus.Ok) {
              this.#eventEmitter.off(DeviceEventName.DataReceived, listener)
              resolve({ status: ResponseStatus.Ok })
            }
          }
        }

        this.#eventEmitter.on(DeviceEventName.DataReceived, listener)

        const fileName = path.basename(file)
        const config = {
          uuid,
          endpoint: Endpoint.Update,
          method: Method.Post,
          body: {
            fileName,
          },
        }

        const request = createValidRequest(config)
        this.#port.write(request)
      }
    })
  }
}

export const createDevice: CreateDevice = (
  formatter: Formatter,
  path: string
) => new Device(formatter, path)
