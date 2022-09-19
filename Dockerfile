# Start from the base node image (version 16)
FROM node:16 

# Set the working directory to be the /app directory in our docker image
WORKDIR /app

# Copy any npm package files into our working directory
COPY package*.json ./

# Run 'npm install' on our docker image to install the packages listed in the npm package files
RUN ["npm", "install"]

# Copy the rest of our app into our working directory (anything defined in .dockerignore will be ignored, for example the node_modules folder will be ignored because we already installed our third-party modules when we ran 'npm install')
COPY . .

# Set the environment variable 'PORT' to 8080, and expose 8080.  This will make our app available over port 8080 of our docker container.
ENV PORT=8081
EXPOSE 8081

# Start our node app
CMD ["npm", "start"]
