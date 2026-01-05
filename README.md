# FanStatusCard

This project is a real-time dashboard built with Angular 21 and Tailwind CSS, featuring reusable Status Cards for monitoring system metrics such as temperature, humidity, and pressure.

The dashboard demonstrates:

- Reusable Angular StatusCardComponent
- Dynamic data streams via RxJS Observables
- Separation of UI and business logic via IStatusEvaluator
- Responsive layout with collapsible sidebar for mobile
- Customizable styling with Tailwind and FontAwesome icons

## Installation

Clone the project
In the folder where package.json resides run

```bash
npm install
```

Start the server by running:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```
