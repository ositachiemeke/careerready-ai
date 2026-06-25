import { ConfigModule } from "@nestjs/config";
import appConfig from "./app.config";
import { validationSchema } from './env.validation';

ConfigModule.forRoot({
    isGlobal: true,
    validationSchema,
    load: [appConfig],
  });