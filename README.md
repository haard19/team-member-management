# Team Member Management

The main aim is to manage members of a team. A user can list, add, edit or delete members from the team. This web application consists of 3 pages: List Members, Add Members and Edit Members. The application is built using Django (a python framework) for API handling in the backend and React Javascript on the frontend side.

## Installation

### Backend

To setup Django, [Python](https://www.python.org/downloads/) and [pip](https://phoenixnap.com/kb/install-pip-windows) needs to be installed in the system.

Installing python dependencies
```bash
pip install -r requirements.txt
```

### Frontend

React javascript requires [Node.js](https://nodejs.org/) to run.

```bash
cd frontend
npm install
```

## Launch Application

There needs to be 2 terminals/command prompts that needs to be run simultaneously i.e. one for Django backend and the other that serves frontend using React.js. 

### Backend

The commands to start the Django application for the first time:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

After running it for the first time, next time run only the following command:

```bash
python manage.py runserver
```

### Frontend

The commands to start React.js frontend application:

```bash
cd frontend
npm run dev
```
