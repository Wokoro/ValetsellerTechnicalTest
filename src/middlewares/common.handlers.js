/**
 * @author - wokorosamuel@yahoo.com
 */

import compression from "compression";
import cors from "cors";
import parser from "body-parser";
import hpp from "hpp";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import winston from "../config/winston";

dotenv.config();

/**
 * @description - Middleware to compress response.
 *
 * @param {object} router - Express router object
 *
 * @returns {void} - No return value
 */
export const compressionHandler = (router) => {
  router.use(compression());
};

/**
 * @description - Middleware for cors control.
 *
 * @param {Object} router - Express router object
 *
 * @returns {Void} - No return value
 */
export const corsHandler = (router) => {
  let whitelist;
  if (process.env.NODE_ENV !== "production") {
    whitelist = [
      "http://localhost:3000",
      "http://localhost:5056",
      "https://valetsellerfront-test.netlify.app"
    ];
  } else {
    whitelist = ["https://valetsellerfront-test.netlify.app"];
  }

  const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  router.use(cors(corsOptions));
};

/**
 * @description - Middleware to parse request object.
 *
 * @param {object} router - Express router object
 *
 * @returns {void} - No return value
 */
export const bodyParserHandler = (router) => {
  router.use(parser.urlencoded({ extended: true, limit: "10kb" }));
  router.use(parser.json({ limit: "10kb" }));
};

/**
 * @description - Middleware for login HTTP data.
 *
 * @param {object} router - Express router object
 *
 * @returns {void} - No return value
 */
export const morganHandler = (router) => {
  router.use(morgan("combined", { stream: winston.logger.stream }));
};

/**
 * @description - Middleware that prevents parameter pollution.
 *
 * @param {object} router - Express router object
 *
 * @returns {void} - No return value
 */
export const hppHandler = (router) => {
  router.use(hpp());
};

/**
 * @description - Middleware that set security headers.
 *
 * @param {object} router - Express router object
 *
 * @returns {void} - No return value
 */
export const helmetHandler = (router) => {
  router.use(helmet.hidePoweredBy());
  router.use(helmet.ieNoOpen());
  if (process.env.NODE_ENV === "production") router.use(helmet.hsts());
};
