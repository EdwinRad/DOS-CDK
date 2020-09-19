import * as cdk from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds';
import * as s3 from '@aws-cdk/aws-s3';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam'
import { Action } from '@aws-cdk/aws-ec2';

export class RdsMsSqlS3BackupAndRestoreStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Vpc', {
          natGateways: 0,
    });

    const s3Bucket = new s3.Bucket(this, 's3Bucket',{
      encryption: s3.BucketEncryption.S3_MANAGED
    }); 

    const role = new iam.Role(this, 'role',{
      assumedBy: new iam.ServicePrincipal('rds.amazonaws.com')
    });
    role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:ListBucket', 's3:GetBucketLocation', 's3:GetObject', 's3:PutObject', 's3:ListMultipartUploadsParts', 's3:AbortMultipartUpload','sts:AssumeRole'],
      resources: [s3Bucket.bucketArn+ '/*']
    }))

    const optionGroup = new rds.OptionGroup(this, 'optionGroup', {
      engine: rds.DatabaseInstanceEngine.sqlServerSe({
        version: rds.SqlServerEngineVersion.VER_14
      }),
      configurations: [{
        name: 'SQLSERVER_BACKUP_RESTORE',
        settings: { 'IAM_ROLE_ARN': role.roleArn }
      }]
    });

    const instance = new rds.DatabaseInstance(this, 'mssql', {
      engine: rds.DatabaseInstanceEngine.sqlServerSe({
        version: rds.SqlServerEngineVersion.VER_14
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MEDIUM) ,
      vpc: vpc,
      masterUsername: 'cdkuser',
      databaseName: '',
      optionGroup: optionGroup,
      licenseModel: rds.LicenseModel.LICENSE_INCLUDED,
      storageEncrypted: true,
      allocatedStorage: 50
    });
  }
}
