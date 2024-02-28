# raptor-analytics
## Project setup
In a directory of your choice, open a terminal and run: 
```
git clone https://github.com/AdrianaZhelyazkova/raptor-analytics.git
```

Enter the main app directory and create environment file to store env variables needed by the application:
### .env.dev 
```
DEBUG=1
SECRET_KEY=your-db-key
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
SQL_ENGINE=django.db.backends.postgresql
SQL_HOST=postgres
SQL_PORT=5432
POSTGRES_DB=your-db-name
POSTGRES_USER=your-db-user
POSTGRES_PASSWORD=your-db-password
```
**Don't forget to fill in the fields specific to your environment with your data!**
## Start Docker
If you don't have Docker installed, you will need to do so. 

For Windwos and MacOS users, you can download Docker Desktop from the official docker website:

https://www.docker.com/products/docker-desktop/

After that run the installer and follow the installation steps.

For Linux the installation steps depend on the distribution. If you are a Linux user you can check them in the official Docker documentation page: 

https://docs.docker.com/desktop/install/linux-install/
 

**Before running the project, start your Docker Desktop first!** 

Once you have Docker Desktop setup, in the main directory of the project (where the .env.dev file was just created), open a terminal and run: 
```
docker-compose up --build
```

Once the containers are up and running, you can access the app at 

http://localhost:8080/#/

