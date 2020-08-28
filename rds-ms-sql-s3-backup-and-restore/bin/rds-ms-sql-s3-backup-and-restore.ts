#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RdsMsSqlS3BackupAndRestoreStack } from '../lib/rds-ms-sql-s3-backup-and-restore-stack';

const app = new cdk.App();
new RdsMsSqlS3BackupAndRestoreStack(app, 'RdsMsSqlS3BackupAndRestoreStack');
