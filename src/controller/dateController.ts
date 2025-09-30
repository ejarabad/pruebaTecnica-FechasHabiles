import { Calculation } from "../interface/Calculation.js";
import { Request, Response } from "express";
import { ErrorResponse } from "../interface/Error.js";
import { SuccessResponse } from "../interface/SuccesResponse.js";
import dateCalculator from "../services/dateCalculator.js";

const handleDateCalculator = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { days: daysStr, hours: hoursStr, date: dateStr } = req.query;

    if (!daysStr && !hoursStr) {
      const error: ErrorResponse = {
        error: "InvalidParameters",
        message: "Se requiere al menos el parámetro 'days' o 'hours'.",
      };
      res.status(400).json(error);
      return;
    }

    const days = daysStr ? parseInt(daysStr as string, 10) : 0;
    const hours = hoursStr ? parseInt(hoursStr as string, 10) : 0;

    if (isNaN(days) || isNaN(hours) || days < 0 || hours < 0) {
      const error: ErrorResponse = {
        error: "InvalidParameters",
        message:
          "Los parámetros 'days' y 'hours' deben ser números enteros no negativos.",
      };
      res.status(400).json(error);
      return;
    }

    const params: Calculation = {
      days,
      hours,
      startDate: dateStr ? new Date(dateStr as string) : new Date(),
    };

    const targetDate = await dateCalculator(params);

    const response: SuccessResponse = {
      date: targetDate.toISOString(),
    };
    res.status(200).json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      error: "InternalServerError",
      message:
        (error as Error).message || "Ocurrió un error interno del servidor.",
    };
    res.status(500).json(errorResponse);
  }
};

export default handleDateCalculator;
