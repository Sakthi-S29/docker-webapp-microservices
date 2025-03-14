```markdown
# Docker Webapp Microservices

This project consists of two Docker containers that communicate to perform calculations based on input JSON and CSV files.

## Project Overview

- **Container 1**: Acts as an orchestrator, validates input JSON, checks if the file exists, and forwards the file and product details to **Container 2**.
- **Container 2**: Processes the CSV file, calculates the sum of values for the specified product, and returns the result in JSON format.

## Features

- Container 1 listens on port `6000` for JSON input via an HTTP POST request to `/calculate`.
- Input JSON format:
    ```json
    {
      "file": "file.dat",
      "product": "wheat"
    }
    ```
- If the file is found and contains a valid CSV, **Container 2** calculates the sum of the values matching the specified product and returns the sum in JSON format:
    ```json
    {
      "file": "file.dat",
      "sum": 30
    }
    ```
- If the file is not found or is not a valid CSV, an appropriate error message is returned.

## Requirements

- Docker
- Docker Compose
- DockerHub account (for pushing the containers)

## Setup and Installation

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/your-username/docker-webapp-microservices.git
   cd docker-webapp-microservices
   ```

2. Build and run the Docker containers using Docker Compose.
   ```bash
   docker-compose up --build
   ```

3. The containers will be deployed and accessible at the following ports:
   - **Container 1**: `localhost:6000`

## Testing the API

You can test the functionality of the service by sending a POST request to `http://localhost:6000/calculate` with the following JSON payload:

```json
{
  "file": "file.dat",
  "product": "wheat"
}
```

If the file exists and contains valid CSV data, the response will be:
```json
{
  "file": "file.dat",
  "sum": 30
}
```

Otherwise, an appropriate error message will be returned.

## DockerHub Deployment

Both containers have been pushed to DockerHub. You can deploy them using Docker Compose or run them separately using Docker commands. https://hub.docker.com/u/sakthisharan
