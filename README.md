# Sheep Cage Monitoring System (IoT)

Cross-platform Flutter dashboard for monitoring sheep-cage IoT data. The repository contains the Flutter client and the Node.js/Prisma REST API.

## Tech stack

- Front-End: Flutter, Dart, GetX, fl_chart
- Back-End: Node.js, Express, Prisma, REST API

## Repository structure

```text
Front-End/   Flutter application
Back_end/    Express API, Prisma schema, migrations, and tests
```

The Flutter UI is organized by feature under `Front-End/lib/app/modules`, with reusable widgets in `global_component` and routes in `routes`.

## Run the frontend demo

The demo mode is enabled by default and contains five sheep plus sample sensor charts and tables. It does not require the backend or a database.

```bash
cd Front-End
flutter pub get
flutter run --dart-define=USE_DUMMY_DATA=true
```

For a browser build:

```bash
flutter build web --dart-define=USE_DUMMY_DATA=true
```

## Run against the backend

Copy `Front-End/.env.example` to `Front-End/.env`, update `BASE_URL` and endpoint values when needed, then explicitly disable demo mode:

```bash
cd Front-End
flutter run --dart-define=USE_DUMMY_DATA=false
```

The backend request logic is kept inside the existing controllers; the compile-time flag only selects whether controllers load local demo data or call the API.

Certificate validation stays enabled by default. Only for a local development endpoint with an invalid certificate, explicitly add `--dart-define=ALLOW_INSECURE_CERTIFICATES=true`.

## Backend setup

Install dependencies in `Back_end`, configure `DATABASE_URL` in its environment, run Prisma migrations/seeding as required, and start the Node.js service using the scripts in `Back_end/package.json`.