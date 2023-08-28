# My Fragments Microservice

My Fragment front-end app

## Authors

- [@Yuelin Wen](https://www.github.com/yuelin-wen)

## Project Description

Introducing a cutting-edge cloud-based microservice meticulously designed to cater to the needs of both companies and users seeking a robust system for efficient fragment data management. This sophisticated service empowers users with the essential functionalities of creating, reading, updating, and deleting fragments, thereby facilitating a comprehensive approach to handling fragmented data.

All of the data are stored and secured by AWS S3. The user pool is protected by AWS Cognito. The service is deployed in the AWS cloud.

## Fragment supported type

A fragment is defined as the following formats:

| Name          | Type                | Extension |
| ------------- | ------------------- | --------- |
| Text Plain    | `text/plain`        | `.txt`    |
| Text Markdown | `text/markdown`     | `.md`     |
| Text HTML     | `text/html`         | `.html`   |
| JSON data     | `application/json`  | `.json`   |
| PNG Image     | `image/png`         | `.png`    |
| JPEG Image    | `image/jpeg`        | `.jpg`    |
| WebP Image    | `image/webp`        | `.webp`   |
| GIF Image     | `image/gif`         | `.gif`    |

## App Demo

App Url: http://ec2-18-234-47-152.compute-1.amazonaws.com:3000

Youtube Link: https://youtu.be/gQXxX0mSVQc

(Hint: User has to follow the AWS Cognito user authentication process, please sign up with a real email to receive a verification code. You are also welcome to watch my demo presentation on YouTube)

## API URL
 
Backend API link: http://ec2-18-234-47-152.compute-1.amazonaws.com:8080

Backend source code: https://github.com/yuelin-wen/fragments-backend

## Contact

If you have any questions, please feel free to email weny36@mcmaster.ca

## Installation Scripts

In the project directory, you can run:

### Need to add `env`

### `npm install`

### `npm start`




