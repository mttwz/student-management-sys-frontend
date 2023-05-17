# Angular App Readme

This Readme document provides instructions on how to run your Angular app using two different methods. Before proceeding, please ensure you have the necessary dependencies installed, which include `npm` and `Docker`.



## Method 1: Running with `ng serve`

1. Install Node.js and `npm` if you haven't already. You can download and install Node.js from the official website: [https://nodejs.org](https://nodejs.org)

2. Open a terminal or command prompt and navigate to the root directory of your Angular app.

3. Install the project dependencies by running the following command:
   ```
   npm ci
   ```

   This command will install all the required packages based on the `package-lock.json` file to ensure consistent installations.

4. Once the dependencies are installed, you can start the Angular development server by running the following command:
   ```
   ng serve
   ```

   The server will compile the app and host it on `localhost:4200`. You can access the app by opening a web browser and navigating to [http://localhost:4200](http://localhost:4200).

5. You should now be able to view and interact with your Angular app in the browser.

## Method 2: Running with Docker


1. Ensure that Docker is installed on your machine. You can download and install Docker Desktop from the official website: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

2. Open a terminal or command prompt and navigate to the root directory of your Angular app, where the `Dockerfile` is located.

3. Build the Docker image using the following command:
   ```
   docker build --no-cache -t app .
   ```

   This command will build a Docker image named `frontend-app` based on the instructions defined in the `Dockerfile`.

4. Once the Docker image is built successfully, you can run a container based on this image using the following command:
   ```
   docker run -p 4200:4200 app
   ```

   This command will start a Docker container and map the container's port `4200` to the host's port `4200`.

5. After the container is running, you can access your Angular app by opening a web browser and navigating to [http://localhost:4200](http://localhost:4200).

6. Your Angular app should now be running inside the Docker container and accessible through the provided URL.

