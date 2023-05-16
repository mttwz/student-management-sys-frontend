FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY dist/student-mgmnt-frontend/ .

# Install the http-server globally
RUN npm install -g http-server

# Expose the port on which the Angular app will run
EXPOSE 4200

CMD ["http-server", "-p", "4200", "."]
