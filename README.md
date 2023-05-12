# ChatUp-Project-Server

This project is the backend of a chat project which content a chat module, a tasklist module and a users module where the user can add more users as friends and could tell with others users for middle of the chat.

# About

The technologies that I will use in the backend side is Express as main framework, and I will use others library as JWT for the authenticate module, socket.io for chat module.

# Technologies

## - Express

## - jsonwebtoken

## - socket.io

## - express session

# Architecture

### Clean Architecture

This project has the clean architecture, this architecture is my first time in implements it then I will try to implement to 100%

# API documentation

## Tasks

- Create
  - Input
    ##### Path
    ```
      POST
      /api/v1/tasks/create
    ```
    ##### Body
    You can set the id field in case where you dont want to create a dependency with
    the api and you have to control of the id generator, in case where you generate the id
    in the client side, etc.
    ```
    {
      "id"?: 1, // string | number | (optional)
      "title": "Lorem ipsum", // string
      "description": "This is lorem ipsum", // string
      "isReady" : false // boolean
    }
    ```
  - Output
    ```
    {
        "message": "The task was created correctly" // string
    }
    ```
- Find all

  ##### Path structure

  ```
    GET
    /api/v1/tasks?[query]
  ```

  ##### Query Structure

  The query is dive in two parts:

  ###### constanst

  The API has the constanst which the is data that is differents to a filter, this constanst has values that you can't set a range beetween values, you only can set one value, but you can choose between use pagination or search engine, in short this constanst is optional. This constanst is:

  ```
    limit: number
    skip: number
    search: string
  ```

  - Example

    - Input
      ```
        GET
        /api/v1/tasks?limit=5&skip=0&search=restaurant
      ```
    - Output
      ```
        [
            {
                id: 5,
                title: "Go to the restaurant",
                description: "Get the food for my wife",
                isReady: true,
                createdDate: '22/11/2020'
            },
            {
                id: 7,
                title: "Do reservation",
                description: "I need to do the reservation for our anniversary",
                isReady: true,
                createdDate: '22/12/2020'
            },
            {
                id: 10,
                title: "Go to the market",
                description: "I need to go to the market for buy the somethings for the restaurant",
                isReady: true,
                reatedDate: '22/03/2021'
            },
            {
                id: 12
                title: "setting up my first restaurant",
                description: "Is my first business. Yeahhh!",
                isReady: true,
                createdDate: '1/01/2022'
            },
            {
                id: 12
                title: "setting up my second restaurant",
                description: "Is my second business. Yeahhh!",
                isReady: true,
                createdDate: '24/03/2023'
            },
        ]
      ```
      In this example, I set the query with limit and skip constants which is for get the data with
      pagination, and also I set the search constant for do one search

    ###### filters

    You can set the filters such as normaly a api query, the unique difference is that can structure
    the filters with logical structure, you can use `< > <= >=` and for equals to you simplely
    use the '=' symbol; and also you can use or operator ( | ) and "and" operator ( & ). You can use
    the filters with any field of a task or another entity that add in a feature.

    - Example

      - Input

      ```
        GET
        /api/v1/tasks/createdDate>=22/11/2020&createdDate<=31/12/2020&isReady=true
      ```

      - Output

      ```
      [
        {
            id: 5,
            title: "Go to the restaurant",
            description: "Get the food for my wife",
            isReady: true,
            createdDate: '22/11/2020'
        },
        {
            id: 6,
            title: "Buy a TV",
            description: "Go to the wallmark and buy a TV",
            isReady: true,
            createdDate: '22/11/2020'
        },
        {
            id: 7,
            title: "Do reservation",
            description: "I need to do the reservation for our anniversary",
            isReady: true,
            createdDate: '22/12/2020'
        },
      ]
      ```

- Find one

  - Input
    ##### Path structure
    ```
      GET
      /api/v1/tasks/:id
    ```
  - Output

    ##### Status code

    ```
      200
    ```

    ##### Body responde

    ```
    {
        id: 5,
        title: "Go to the restaurant",
        description: "Get the food for my wife",
        isReady: true,
        createdDate: '22/11/2020'
    }
    ```

- Update

  - Input

    ##### Path structure

    ```
      PUT
      /api/v1/tasks/update/:id
    ```

    ##### Body Request

    Only you can change the body task for example the title, description, and isReady data.

    Structure:

    ```
      {
        title: string,
        description: string,
        isReady: boolean
      }
    ```

    For example:

    ```
      {
        title: 'Ahora esto va a ser un hola mundo'
      }
    ```

  - Output

    ##### Status code

    ```
      202
    ```

    ##### Body

    ```
      {
        message: string
      }
    ```
