import { ResponseToolkit } from "@hapi/hapi"
import { ERR_HANDLER } from "../constants/errors"

export const handlerError = ( err: any, h: ResponseToolkit ) => {
    return h.response({
        statusCode: 404,
        error: err,
        message: ERR_HANDLER
    })
}
