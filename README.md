# Mama Recipe Native API

👋 Hello this is Yulius from Pijar Camp Batch 10

Here's API For Mama Recipe (see what Mama Recipe Native from mama-recipe-native repo in this account)
You can access with this link :
https://mama-recipe-native-express.vercel.app/

## Technologies

![AGPL License](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

![AGPL License](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![AGPL License](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

If you clone this repo don't forget to install node modules / packages inside the project :

```
  npm install
```

And to run this project use

```bash
  npm run start
```


## API Reference

#### Get all users 📄

```
  GET  /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| | `string` | You can check all users from ur DB |

Execution : https://vercel.com/pemulungemperor/mama-recipe-express/users

#### Get specific user

```
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Have Id of spesific user |

#### Login

```
  POST /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| | `string` |try login with valid credentials |

#### Register

```
  POST /users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| | `string` |try register to have an account |

#### Update user image

```
  POST /image/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| id | `string` |Update your user image <= 2Mb sizes |

#### Update user

```
  POST /update/profile/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| id | `string` |Use for update user info |

You can check the rest in repo folder ...


## Author
[@PemulungEmperor](https://github.com/PemulungEmperor) 
