# Node.js base image with development tools
FROM node:latest AS development

# Job Directory
WORKDIR /app

RUN yarn add global @nestjs/cli

# Installing the development and production dependencies of the application
RUN yarn install --only=development
RUN yarn install --only=production

# Copy all application files to the container
COPY . .

# Compile the application
RUN yarn build

# Node.js production base image
FROM node:latest AS production

# Job Directory
WORKDIR /app

# Install @nestjs/cli in production image
RUN yarn add global @nestjs/cli

# Copy the application's configuration file and dependency file
COPY package.json yarn.lock ./

# Copy the files of the compiled application from the development image to the production image.
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/dist ./dist

# Expose port 4000 used by the application
EXPOSE 4000

# Iniciar la aplicación al ejecutar el contenedor
CMD [ "yarn", "run", "start:prod" ]

# Configure the connection to the MongoDB database from the environment variable
ENV MONGODB_HOST=$MONGODB_HOST

# Optionally, if the MongoDB connection string is in a ‘.env’ file
# the following line could be used instead of the previous line:
# ENV MONGODB_HOST=$$(cat .env | grep MONGODB_HOST | cut -d ‘=’ -f2)
