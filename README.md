# FanStatusCard

This project is a real-time dashboard built with Angular 21 and Tailwind CSS, featuring reusable **Status Cards** for monitoring system metrics such as temperature, humidity, pressure, CO₂, ventilation, water, energy, and animal activity.

The dashboard demonstrates:

- Reusable Angular `StatusCardComponent`  
- Dynamic data streams via **RxJS Observables**  
- Static demo data with delayed loading to show **skeletons**  
- Separation of UI and business logic via `IStatusEvaluator`  
- Clickable cards showing **alarms per metric**  
- Responsive layout with **collapsible sidebar** for mobile  
- Customizable styling with **Tailwind CSS**  
- Dynamic Status Cards that can be created, edited, and persisted through a wizard
- Configurable OK, Warning, and Error labels per card  

---

## Installation

Clone the project.  
In the folder where `package.json` resides, run:

```bash
npm install
```

Start the server by running:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

---

## Usage

- Live data streams:
  - Temperature (temperature$)
  - Humidity (humidity$)
  - Pressure (pressure$)
  - CO₂ (co2$)
  - Ventilation (ventilation$)
  - Water (water$)
  - Energy (energy$)
  - Animal Activity (animalActivity$)

- Static demo cards (Ventilation, Water, Energy, Animal Activity)
    - Cards load after a short delay to display skeletons first
    - Demonstrates combining multiple streams (e.g., CO₂ values + alarms)

- Alarms:
    - Each card can display its own alarms
    - Clicking a card toggles an alarm detail list
    - Alarms are categorized as Info, Warning, or Critical

- Thresholds & Labels
    - Each evaluator uses IThresholdConfig or dynamic card config to define warning and error ranges
    - Thresholds and labels (OK, Warning, Error) are configurable per metric
    - Dynamic status cards can be created/edited via the Settings Wizard

- Dynamic Status Cards
    - Create new cards and assign them to a data stream
    - Configure thresholds and custom labels
    - Persisted in local storage and reactive across the dashboard
    - Only editable after selecting the card from the list in the wizard

---

## Running unit tests

To execute unit tests with the Vitest test runner, run:

```bash
npm test
```

---

## Additional Notes

- The project is structured to separate business logic from UI, allowing evaluators to be reused across metrics.
- Static data is used for demo purposes, but the same components work seamlessly with live Observables.
- Tailwind provides a clean and customizable visual style.
- Designed to be responsive, usable on desktop, tablet, and mobile devices.
