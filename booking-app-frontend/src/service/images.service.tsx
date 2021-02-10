import * as AWS from 'aws-sdk';
import resizeImg from 'resize-img';

const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const uploadToS3 = async (imageUploadURL: string, image: File): Promise<void> => {
  const resizedImage = await resizeImg(Buffer.from(await image.arrayBuffer()), {
    width: 512,
    height: 512,
  });
  await fetch(imageUploadURL, {
    method: 'PUT',
    body: resizedImage,
  });
};

const getURL = (key: string): string => s3.getSignedUrl('getObject', {
  Bucket: process.env.REACT_APP_S3_IMAGES_BUCKET_NAME,
  Key: key,
});

const imagesService = {
  uploadToS3,
  getURL,
};

export default imagesService;
