# 🚀 MagicLog - Backend (NestJS)

Este proyecto es el backend del marketplace MagicLog. Implementa autenticación con JWT, roles (admin, buyer, seller), protección de rutas y operaciones CRUD de productos.

🔗 **Backend desplegado en Render:** https://magiclog-back.onrender.com/api

⚠️ **Nota:** Render puede tardar unos segundos en activar el servidor si está inactivo.

---

## 📁 Estructura del proyecto

```bash
src/
├── app.module.ts
├── main.ts
├── auth/           # Módulo de autenticación
├── common/         # DTOs, entidades, tipos, guards, utils
├── products/       # Productos (CRUD + filtros)
└── users/          # Módulo de usuarios y roles
```

---

## 🧰 Tecnologías usadas

- NestJS (v11)
- TypeScript
- PostgreSQL + TypeORM
- JWT para autenticación
- Passport (estrategia jwt)
- Class-validator y class-transformer
- Swagger para documentación
- Jest + Supertest para pruebas unitarias y e2e

---

## 📦 Instalación y ejecución

```bash
npm install
npm run start:dev       # desarrollo
npm run test            # pruebas unitarias
npm run test:e2e        # pruebas end-to-end
```

---

## 📑 Endpoints disponibles

### 🔐 Auth (`/auth`)

| Método | Ruta           | Descripción                    | Acceso        |
| ------ | -------------- | ------------------------------ | ------------- |
| POST   | /auth/login    | Iniciar sesión                 | Público       |
| POST   | /auth/register | Registro de vendedores         | Público       |
| GET    | /auth/profile  | Perfil del usuario autenticado | JWT requerido |

### 📦 Productos (`/products`)

| Método | Ruta             | Descripción                          | Acceso             |
| ------ | ---------------- | ------------------------------------ | ------------------ |
| GET    | /products        | Lista todos los productos            | Público            |
| GET    | /products/search | Lista productos con filtros y página | Público            |
| GET    | /products/own    | Lista productos del usuario logueado | JWT + Seller/Admin |
| POST   | /products        | Crear nuevo producto                 | JWT + Seller/Admin |

### 👥 Usuarios (`/users`)

| Método | Ruta   | Descripción                 | Acceso      |
| ------ | ------ | --------------------------- | ----------- |
| GET    | /users | Listar usuarios con filtros | JWT + Admin |

---

## 🧪 Pruebas

- `*.spec.ts`: pruebas unitarias por servicio
- `test/jest-e2e.json`: configuración para pruebas e2e
- Usa `supertest` para simular peticiones reales

---

## 🔐 Roles y protección de rutas

- `@Roles('admin')` en controladores
- `RolesGuard` que lee metadatos y verifica el rol
- `AuthGuard` basado en estrategia JWT (Passport)

---

## 🧾 Documentación Swagger

Habilitada automáticamente en `/api/docs` si se activa `SwaggerModule` en `main.ts`

---

## 📝 Notas

- Las pruebas e2e simulan login, registro y creación de productos
- El backend está listo para deploy (ej: Render)

---

_Hecho con NestJS por Daniel para la prueba técnica de MagicLog._
