# template-server

## Architecture

Extension of "ports and adapters architecture", also known as "hexagonal architecture".

With this architecture, code is organized into several layers: logic, controllers, adapters, and ports.


### logic

Deals with pure business logic and shouldn't have side-effects or throw exceptions.

### controllers

The "glue" between all the other layers, orchestrating calls between pure business logic, adapters, and ports.

### adapters

The layer that converts external data representations into internal ones, and vice-versa. Acts as buffer to protect the service from changes in the outside world; when a data representation changes, you only need to change how the adapters deal with it.

### ports

The layer that communicates with the outside world, such as http, kafka, and the database.

### components

We use the components abstraction to organize our ports (e.g. HTTP client, database client, redis client) and any other logic that needs to track mutable state or encode dependencies between stateful components. For every environment (e.g. test, e2e, prod, staging...) we have a different version of our component systems, enabling us to easily inject mocks or different implementations for different contexts.

We make components available to incoming http and kafka handlers. For instance, the http-server handlers have access to things like the database or HTTP components, and pass them down to the controller level for general use.
