import * as path from "path";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const logGroup = new LogGroup(this, "FechasHabilesLogGroup", {
      retention: RetentionDays.ONE_WEEK,
    });

    const fn = new lambda.Function(this, "FechasHabilesFunction", {
      functionName: "FechasHabilesFunction",
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "dist/index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../../lambda"), {
        exclude: ["src", "tsconfig.json", "package-lock.json"],
      }),
      logGroup,
    });

    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ["*"],
        allowedMethods: [
          lambda.HttpMethod.GET,
          lambda.HttpMethod.POST,
          lambda.HttpMethod.HEAD,
        ],
      },
    });

    new cdk.CfnOutput(this, "FechasHabilesFnUrl", {
      value: fnUrl.url,
    });
  }
}
