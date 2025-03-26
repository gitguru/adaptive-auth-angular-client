# AngularDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Create and run AngularJS app in development mode
> Note that this environment is configured to use `nvm` so, make sure `nvm` is installed and running previous to create and run sample AngularJS application in ***development mode***.
```
nvm use
npm install -g @angular/cli@17
ng new angular-demo
cd angular-demo
npm start
```

## Docker
### Creating the image
```
docker build --pull --no-cache --platform="linux/amd64" --provenance=false -t angular-demo:latest -f Dockerfile .
```

## Login to AWS ECR
```
aws --profile {PROFILE} ecr get-login-password --regionn {REGION} | docker login --username AWS --password-stdin {ECR_URI}
```

# Build and push (demo-server) docker image to ECR
```
docker build --pull --no-cache --platform="linux/amd64" --provenance=false -t angular-demo:latest -f Dockerfile .
docker tag angular-demo:latest 071215964715.dkr.ecr.us-west-2.amazonaws.com/shs-common-backend:angular_client_demo_007
docker push 071215964715.dkr.ecr.us-west-2.amazonaws.com/shs-common-backend:angular_client_demo_007
```
