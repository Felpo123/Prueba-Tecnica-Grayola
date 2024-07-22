## Project Management Web Application

This repository contains the code for a technical test for Crayola. The task was to develop a web application for managing design projects using Next.js for the frontend, Tailwind CSS for styling, and Supabase for the backend. The application allows different types of users (Clients, Project Managers, and Designers) to interact according to their defined roles

## Usage

```bash
Roles and Credentials

Project Manager
Email: projectm@gmail.com
Password: projectm

Client
Email: client@gmail.com
Password: client

Designer
Email: designer@gmail.com
Password: designer
```

```bash
Features

Client: Create new projects.
Project Manager: View all projects, Assign projects to designers, Edit and delete projects.
Designer: View assigned projects.
```

## Running the Application

To run the application, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Felpo123/Prueba-Tecnica-Grayola.git
   cd YourRepository
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://ebepanogydrpyanzmpfx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViZXBhbm9neWRycHlhbnptcGZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MTE0MzQsImV4cCI6MjAzNzE4NzQzNH0.pd07de3AHR-0WLCwhTtsphmuBcHPYvNdbMWffqazsoQ
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   The application should now be running on http://localhost:3000.

   Make sure to have these environment variables set correctly to connect to your Supabase backend. If you encounter any issues, check the environment variable values and ensure that your Supabase project is correctly configured.
