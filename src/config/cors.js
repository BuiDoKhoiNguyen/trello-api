import { WHITELIST_DOMAINS } from '~/utils/constants'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

// Configure CORS options for the project (Video number 62 in the MERN Stack Pro series)
export const corsOptions = {
  origin: function (origin, callback) {
    // console.log('cors origin', origin)
    // Allow calling the API using POSTMAN in the dev environment,
    // Usually, when using postman, the origin value will be undefined
    // Update: In video number 75 of the MERN Stack PRO series, when deploying the project to a production server, we will adjust this section a bit more to fit each production or dev environment. Trust me, when learning with me, you can be confident in the thoroughness and accuracy of the instructions :D
    if (env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }

    

    // Check if the origin is an accepted domain
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // Finally, if the domain is not accepted, return an error
    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy.`))
  },

  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,

  // CORS will allow receiving cookies from requests (Teaser :D | In the advanced MERN Stack course, I will directly teach you how to attach jwt access token and refresh token to httpOnly Cookies)
  credentials: true
}
