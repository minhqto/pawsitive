# Welcome to Pawsitive

<!-- ABOUT THE PROJECT -->
## About The Project

A web application that helps pet owners find dog training services in surrounding area.

### Built With

* **Front-end** - React, Redux, Bootstrap
* **Back-end** - ASP.NET Core
* **Database** - SQL Server

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
- Node.js (v14.17.0LTS): https://nodejs.org/en/
- .NET 5.0 SDK: https://dotnet.microsoft.com/download
- Visual Studio 2019: https://visualstudio.microsoft.com/downloads/
- VSCode: https://code.visualstudio.com/
### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/minhqto/pawsitive.git
    ```

2. Build and run the front-end application
    ```sh
    cd pawsitive/ClientApp # go to front-end app folder
    npm install # install all the npm packages
    npm run start # start the application
    ```
    
3. Build and run the back-end
    - Method 1 (Recommended): Using Visual Studio
      - Step 1: Install all the following workloads in Visual Studio Installer:
      ![image](https://user-images.githubusercontent.com/25848067/119286019-6e8afb00-bc11-11eb-987e-04b0bf757212.png)

      - Step 2: Open `pawsitive.csproj` via Visual Studio, build and run the project.
  
    - Method 2: Using dotnet commands
      - Step 1: Open a terminal, navigate to the root folder of the project `./pawsitive` and run `dotnet build`. This will build the project and all of its dependencies.
      - Step 2: After the build, run `dotnet run` to run the back-end server.

    **IMPORTANT**: We have to run the front-end application first, then run the back-end application.


## How to containerize the app
Prerequisites: Docker (latest version prefered)

Step 1: Build the image
```
docker build -t qvnguyen/pawsitive:1.0 .
```

Step 2: Run the container
```bash
# Run the container in detached mode, with the name called "pawsitive_app" and map the port 80 of the container to the port 80 of the host machine.
docker run -d --name pawsitive_app -p 80:80 qvnguyen/pawsitive:1.0 
```

Project Schedule
[WBS Implementation Schedule.pdf](https://github.com/minhqto/pawsitive/files/6581437/WBS.Implementation.Schedule.pdf)
