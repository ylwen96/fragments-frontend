# My Fragments App

My Fragment front-end app

## Authors

- [@Yuelin Wen](https://www.github.com/yuelin-wen)

## Project Description

Introducing a cutting-edge cloud-based microservice meticulously designed to cater to the needs of both companies and users seeking a robust system for efficient fragment data management. This sophisticated service empowers users with the essential functionalities of creating, reading, updating, and deleting fragments, thereby facilitating a comprehensive approach to handling fragmented data.

All of the data are stored and secured by AWS s3. The user pool are protected by AWS Cognito. And the service is deployed in AWS cloud.

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

## API URL
 
Backend API link:http://ec2-34-207-176-17.compute-1.amazonaws.com:8080

Github source code: https://github.com/yuelin-wen/fragments-backend

## Contact

If you have any questions, please feel free to email weny36@mcmaster.ca

## Installation Scripts

In the project directory, you can run:

### `npm install`

### `npm start`
