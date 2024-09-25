import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expirationInDays: number) {
    super(scope, id);

    new Bucket(this, 'L3Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(expirationInDays)
      }]
    });

  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create an s3 bucket 3 ways:
    // using the L1Bucket construct
    new CfnBucket(this, 'MyL1Bucket', {
       lifecycleConfiguration: {
          rules: [{
            expirationInDays: 1,
            status: 'Enabled'
          }]
        }
    });

    // using the L2Bucket construct
    // L2 constructs include sensible defaults and convenience methods
    new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(2)
      }]
    });

    // using the bucket L3Bucket construct
    new L3Bucket(this, 'MyL3Bucket', 3);

    }
}
