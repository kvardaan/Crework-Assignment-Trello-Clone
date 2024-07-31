# Crework Assignment: Trello-Style Task Management Application

## Job Description
For the detailed job description, please refer to the following [link](https://crework.notion.site/Job-Description-Full-Stack-Developer-c8c2ea3cf32340f1b46d4c3c5111293f).

## Notion Documentation
For a comprehensive guide on the assignment, visit the Notion document [here](https://crework.notion.site/Assignment-Trello-Style-Task-Management-Application-0bcb3b4db4504d6199b803704e561e87).

### Tech Stack
- **Frontend:** Next.js with TypeScript
- **Backend:** Node.js with Express
- **Database:** Prisma ORM + MongoDB
- **State Management:** React Context API
- **Styling:** Tailwind CSS

### Setup Instructions
1. Open your terminal and clone the repository.
    ```bash
    git clone https://github.com/kvardaan/Crework-Assignment-Trello-Clone.git
    ```
2. Open the `Crework-Assignment-Trello-Clone` directory in your preferred code editor or IDE.

3. Within the main directory, you will find two subdirectories.
    ```
    /Crework-Assignment-Trello-Clone
    ├─ backend
    └─ frontend
    ```
4. Open separate terminals for both the `backend` and `frontend` subdirectories, then run the following command in each terminal to install all dependencies.
    ```bash
    npm install
    ```

Please ensure all dependencies are installed correctly before proceeding with further development or testing.

5. In both the `backend` and `frontend` directories, create a `.env` file by copying the `.env.example` file.
    ```bash
    cp .env.example .env
    ```

6. Obtain a MongoDB instance by either -

   - Using a cloud service such as MongoDB Atlas.
   - Running a local instance using Docker. To start a local MongoDB instance with Docker, use the following command.
     ```bash
     docker run -d -p 27017:27017 --name trello-clone-mongo mongo
     ```

7. Ensure your MongoDB connection details are correctly set in the `/backend/.env` file. The connection URL should be in the following format.
    ```
    DATABASE_URL=mongodb://<username>:<password>@<host>:<port>/<database>
    ```
   - For a local instance, it might look like -
     ```
     DATABASE_URL=mongodb://localhost:27017/trello-clone
     ```
   - For a MongoDB Atlas instance, replace `<username>`, `<password>`, `<host>`, and `<database>` with your specific details.

8. In the `backend` directory, set up the port number and JWT secret in the `.env` file.
    ```
    PORT=your_port_number
    JWT_SECRET=your_jwt_secret
    ```
Replace `your_jwt_secret` with a secure secret key and `your_port_number` with the desired port number for the backend server.

9. In the `backend` directory, run the following command to generate the Prisma client -
    ```bash
    npx prisma generate
    ```

10. In the `frontend` directory, set the backend endpoint URL in the `.env` file.
    ```
    BACKEND_ENDPOINT=http://localhost:<port_number>/
    ```
Replace `port_number` with the desired port number for the backend server.

11. In the `frontend` directory, run the following command to start the frontend application -
    ```bash
    npm start
    ```
    Note the port number on which the frontend is running (usually `3000` by default).

12. In the `backend` directory, set the `NEXT_ORIGIN` in the `.env` file with the frontend URL.
    ```
    NEXT_ORIGIN=http://localhost:<port_number>
    ```
    Replace `<port_number>` with the actual port number on which your frontend is running (e.g., `3000`).

13. In the `backend` directory, run the following command to start the backend in development mode -
    ```bash
    npm run start:dev
    ```

14. Your application is now ready to be used.

15. Visit the frontend application at the following URL -
    ```
    http://localhost:<port_number>
    ```
    Replace `<port_number>` with the port number on which your frontend is running (e.g., `3000`).
