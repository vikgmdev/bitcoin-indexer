import express, { Application } from 'express';

export default function routes(
  app: Application,
  bitcoinController: { getOpReturnData: any },
): void {
  app.use(
    express
      .Router()
      .get('/opreturn/:opReturnData', bitcoinController.getOpReturnData),
  );
}
