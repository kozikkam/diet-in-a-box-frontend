import { NextFunction, Request, Response } from "express";
import { Container } from "inversify";
import {
  controller,
  httpPost,
  interfaces
} from "inversify-express-utils";
import { IDatabase } from "../../core/database/IDatabase";
import { TYPES } from "../../ioc/types";
import getContainer from "./ioc/inversify.config";
import { ApiPath } from "swagger-express-ts";
import { Config } from "../../config/Config";
import { ILoginController } from "./controller/loginController/ILoginController";
import { AUTH_TYPES } from "./ioc/AuthTypes";

const config: Config = new Config();
const ENDPOINT: string = "auth";

@ApiPath({
  path: `${config.API_PATH}${ENDPOINT}`,
  name: ENDPOINT
})
@controller(`${config.API_PATH}${ENDPOINT}`)
export class AuthController implements interfaces.Controller {
  private readonly _container: Container = getContainer();
  private readonly _database: IDatabase = this._container.get<IDatabase>(
    TYPES.IDatabase
  );

  private readonly loginController: ILoginController = this._container.get(
    AUTH_TYPES.ILoginController
  );

  constructor() {
    this._database.getConnection();
  }

  @httpPost("/login")
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    return this.loginController.process.bind(this.loginController)(req, res, next);
  }
}
