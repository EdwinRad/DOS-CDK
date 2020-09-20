# RDS SQL Server - Native Backup and Restore in CDK

When migrating your SQL Server database from on-premise to AWS you have lots of different methods to get it done.

This repo contains the popular solution that uses S3 to host your SQL backup file and import this into your new RDS database.

You can find a step-by-step tutorial on how to use this solution here:
[https://edwinradtke.com/rds-ms-sql-native-backup-and-restore-in-cdk]

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
