import { Request, Response } from "express";
import { models, sequelize } from "../../models";
import { response, consoleError, serverErrorResponse } from "../../utils";
import moment from "moment";

const excludes = [
  "createdAt",
  "createdBy",
  "updatedAt",
  "updatedBy",
  "deletedAt",
  "deleteByt",
  "isActive",
  "isDeleted",
];

class UserController {
  public async getData(req: Request, res: Response): Promise<void> {
    try {
      const result = await models.User.findAll({
        where: { isDeleted: false, isActive: true },
        include: [
          {
            model: models.Role,
            required: true,
            attributes: { exclude: excludes },
          },
        ],
        attributes: { exclude: excludes },
        order: [["createdAt", "DESC"]],
      });

      if (result.length > 0) {
        response("User data", 200, res, result);
      } else {
        response("User data not found", 404, res);
      }
    } catch (error) {
      consoleError("Internal Server Error", error);
      serverErrorResponse(error, res);
    }
  }

  public async createData(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const dateNow = moment().toDate();

    const payload = (roleId: number) => ({
      name: body.name,
      email: body.email,
      roleId,
      createdAt: dateNow,
      createdBy: "System",
      updatedAt: dateNow,
      updatedBy: "System",
    });

    const transaction = await sequelize.transaction();

    try {
      const roleData = await models.Role.findOne({
        where: { isDeleted: false, isActive: true, code: "RU" },
        transaction,
      });

      const result = await models.User.create(
        payload(roleData?.dataValues.id || 0),
        {
          transaction,
        }
      );

      transaction.afterCommit(() => {
        response("Create User success", 201, res, result);
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      consoleError("Internal Server Error", error);
      serverErrorResponse(error, res);
    }
  }

  public async updateData(req: Request, res: Response): Promise<void> {
    const { id } = req.query;
    const { body } = req;
    const dateNow = moment().toDate();

    const payload = {
      name: body.name,
      email: body.email,
      roleId: body.roleId,
      updatedAt: dateNow,
      updatedBy: "System",
    };

    try {
      const result = await models.User.update(payload, {
        where: { isDeleted: false, isActive: true, id: parseInt(id as string) },
      });

      if (result[0] > 0) {
        response("Update User success", 200, res, result[0]);
      } else {
        response("Failed to update User", 400, res);
      }
    } catch (error) {
      consoleError("Internal Server Error", error);
      serverErrorResponse(error, res);
    }
  }

  public async deleteData(req: Request, res: Response): Promise<void> {
    const { id } = req.query;
    const dateNow = moment().toDate();

    const payload = {
      deletedAt: dateNow,
      deletedBy: "System",
      isActive: false,
      isDeleted: true,
    };

    try {
      const result = await models.User.update(payload, {
        where: { isDeleted: false, isActive: true, id: parseInt(id as string) },
      });

      if (result[0] > 0) {
        response("Delete User success", 200, res, result[0]);
      } else {
        response("Failed to delete User", 400, res);
      }
    } catch (error) {
      consoleError("Internal Server Error", error);
      serverErrorResponse(error, res);
    }
  }
}

export const userController = new UserController();
