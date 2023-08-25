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
 
Backend API link: http://ec2-54-89-156-98.compute-1.amazonaws.com:8080

Github source code: https://github.com/yuelin-wen/fragments-backend

## Contact

If you have any questions, please feel free to email weny36@mcmaster.ca

## Installation Scripts

In the project directory, you can run:

### `npm install`

### `npm start`

## Using Instructions

Since my API is running on EC2, I didn't make my backend API support https, so there will be an error when you browse the app. (I only want to make a simple and "free" app for now)

![image](https://github.com/yuelin-wen/fragments-frontend/assets/102840218/7f6bb797-31bb-4a4b-888c-6706965617f3)

To resolve this problem, When you get to the website, please change your browser settings to allow HTTP requests, then reload your browser.

![image](https://github.com/yuelin-wen/fragments-frontend/assets/102840218/72300e8c-609b-4e5b-8336-bc186f901c81)

![image](https://github.com/yuelin-wen/fragments-frontend/assets/102840218/ff2ecb40-4366-4af2-8fd6-10a5d4264cd8)



