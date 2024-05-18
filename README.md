
# AllMed

## Overview
Welcome to the Doctor-Patient Reservation System AllMed repository. This project is designed to streamline the process of scheduling medical appointments by allowing both doctors and patients to register, manage, and interact through a user-friendly platform. Patients can choose their favorite doctors, browse available healthcare professionals across the country, and book appointments with ease. Doctors can manage their schedules and view upcoming reservations in a consolidated interface.

## Features
- **User Registration**: Both doctors and patients can create and manage their accounts.
- **Doctor Browsing**: Patients can search and filter doctors based on various criteria, including location and specialization.
- **Appointment Booking**: Patients can book appointments with available doctors.
- **Reservation Management**: Users can view and manage their appointments.

## Getting Started

### Prerequisites
- [Python](https://www.python.org/) (version 3.11 or later)
- [Django](https://www.djangoproject.com/) (version 5.0 or later)
- [Node.js](https://nodejs.org/) (version 20.0.0 or later)
- [React](https://reactjs.org/) (version 18.0.0 or later)


### Cloning the Repository

### Git Clone
To download a copy of the repository, you can use the `git clone` command. Navigate to your desired directory and run:

```bash
git clone https://github.com/AllMedDev/AllMed.git
```

### ZIP Download
Alternatively, you can download the ZIP archive of the repository and then extract it.

### Initializing the Django Server

1. **Creating a Python Virtual Environment**: Navigate to the `AllMed` directory and create a virtual environment using the following commands:

    ```bash
    python -m venv ./allmedVenv
    source ./allmedVenv/bin/activate
    ```

2. **Installing Required Libraries**: Install the required libraries listed in the `requirements.txt` file:

    ```bash
    pip install -r requirements.txt
    ```

### Initializing the Frontend Server

1. **Installing Frontend Dependencies**: In the `frontend` directory, run the following command to install frontend dependencies:

    ```bash
    npm install allmed-frontend
    ```

2. **Server Configuration**: Server configuration details can be found on the official [npmjs.com/package/config](https://www.npmjs.com/package/config) page.

### Running the Servers

- **Starting the Django Server**: The Django server will be managed by WSGI, so simply run NPM. In the `frontend` directory, enter:

    ```bash
    npm start
    ```

The server will be accessible at the domain configured in NPM.

Please follow these steps as needed and ensure that you have all the required dependencies installed. If you have any further questions, feel free to ask!


### Usage

- **Register as a Doctor or Patient**: Visit the registration page and sign up as either a doctor or a patient.
- **Browse and Select Doctors**: Patients can browse available doctors, filter by criteria, and select their preferred doctors.
- **Book Appointments**: Patients can view doctor availability and book appointments.
- **Manage Reservations**: Doctors can log in to view and manage their upcoming reservations.

## Acknowledgements
 Developed by [Radoslav Banik](https://github.com/xflicky) and [Adam Haluška](https://github.com/adamhaluska3).

For any inquiries or issues, please contact us:
- Radoslav Baník: contact at mail@radobanik.com and check [personal page](https://radobanik.com/)
- Adam Haluška: contact at adam.haluska3@gmail.com

