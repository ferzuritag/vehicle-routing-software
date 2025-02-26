# VEHICLE ROUTING SYSTEM

The vehicle routing system is an application that is being developed for the Thesis "Desarrollo de un Sistema para el Cálculo y Visualización de Rutas de Vehículos Terrestres Mediante OpenStreetMap", the purpose of this application is to allow the user to solve routing problems through a web application. Beyond mere route calculation and visualization, this project is also has the purpose of crafting an architecture that embodies scalability and maintainability. By implementing a modular and extensible design, the system will be capable of accommodating future growth and evolving requirements without sacrificing performance or stability.

## SYSTEM ARCHITECTURE

The system architecture can be seen on the next image.

![aa](/assets/vrs-architecture.png)

### **Auth**
The purpose of this microservice it to handle all authentication of the project.

### **Users**
The purpose of this microservice it to manage the collection of users.

### **Routing Problems**
The purpose of this microservice it to manage the routing problems of the users.

### **VRP**
The purpose of this microservice it to solve the vrp problems.

### **CVRP**
The purpose of this microservice it to solve the cvrp problems.

### **MDVRP**
The purpose of this microservice it to solve the mdvrp problems.

Each component of the system will be in a docker container, as shown in the diagram, this repository has a docker-compose.yaml file, that will allow you to run the project easily.

## HOW TO RUN?

1.- Download all the required repositories in the folder of this repository, here is a list of they.

- [Users Microservice] (https://github.com/ferzuritag/vrs-users-service)
- [Auth Microservice] (https://github.com/ferzuritag/vrs-auth-service)
- [Routing Problems Microservice] (https://github.com/ferzuritag/vrs-routing-problems-service)
- [VRP Microservice] (https://github.com/ferzuritag/vrs-vrp-solver)
- [CRP Microservice] (https://github.com/ferzuritag/vrs-cvrp-solver)
- [VRPTW Microservice] (https://github.com/ferzuritag/vrs-vrp-solver)

2.- Then create a .env file from the .env.example template, setup your api keys, secrets and databases string connections.

3.- Run ```bash docker-compose up```

To see all the posible request of the services, check the /docs path, for example **http:localhost:8000/docs**.
