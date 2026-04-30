import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Little Steps API',
      version: '1.0.0',
      description: 'API документація (ES Modules) для Render',
    },
    servers: [
      {
        url: process.env.APP_URL || 'https://little-steps-final-project.onrender.com',
        description: 'Production server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        WeekInfoResponse: {
  type: 'object',
  properties: {
    week: { type: 'integer', example: 12 },
    title: { type: 'string', example: 'Другий триместр почався!' },
    description: { type: 'string', example: 'Ваш малюк вже розміром з лимон...' }
  }
},
        UserResponse: {
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      example: '662f9a2b8e3a1c2d4e5f6g7h',
      description: 'Унікальний ідентифікатор користувача (MongoDB ObjectId)'
    },
    username: {
      type: 'string',
      maxLength: 32,
      example: 'Ivan_Ivanov'
    },
    email: {
      type: 'string',
      format: 'email',
      maxLength: 64,
      example: 'ivan@example.com'
    },
    gender: {
      type: 'string',
      enum: ['boy', 'girl', 'null'],
      default: 'null',
      example: 'girl'
    },
    dueDate: {
      type: 'string',
      format: 'date',
      description: 'Очікувана дата пологів',
      example: '2026-10-15'
    },
    avatar: {
      type: 'string',
      format: 'uri',
      description: 'Посилання на аватар користувача',
      example: 'https://ac.goit.global/fullstack/react/default-avatar.jpg'
    },
    theme: {
      type: 'string',
      enum: ['boy', 'girl', 'neutral'],
      default: 'neutral',
      example: 'neutral'
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      example: '2026-04-30T12:00:00Z'
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      example: '2026-04-30T13:30:00Z'
    }
  }
},
        RegisterRequest: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: { type: 'string', maxLength: 32, example: 'Ivan_Ivanov' },
            email: { type: 'string', format: 'email', maxLength: 64, example: 'ivan@example.com' },
            password: { type: 'string', format: 'password', minLength: 8, maxLength: 128, example: 'securePass123' },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'ivan@example.com' },
            password: { type: 'string', format: 'password', example: 'securePass123' },
          },
        },
        CreateDiaryRequest: {
          type: 'object',
          required: ['title', 'description', 'emotions'],
          properties: {
            title: { type: 'string', minLength: 1, maxLength: 64, example: 'Мій щасливий ранок' },
            description: { type: 'string', minLength: 1, maxLength: 1000, example: 'Сьогодні я відчула перший рух малюка...' },
            emotions: {
              type: 'array',
              minItems: 1,
              maxItems: 12,
              items: { type: 'string', pattern: '^[0-9a-fA-F]{24}$', example: '662f9a2b8e3a1c2d4e5f6g7h' },
              description: 'Масив від 1 до 12 ID емоцій',
            },
          },
        },
        UpdateDiaryRequest: {
          type: 'object',
          minProperties: 1,
          properties: {
            title: { type: 'string', minLength: 1, maxLength: 64 },
            description: { type: 'string', minLength: 1, maxLength: 1000 },
            emotions: {
              type: 'array',
              minItems: 1,
              maxItems: 12,
              items: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
            },
          },
        },
        CreateTaskRequest: {
          type: 'object',
          required: ['name', 'date'],
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 96, example: 'Купити вітаміни' },
            date: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$', example: '2026-05-20' },
            isDone: { type: 'boolean', default: false },
          },
        },
        UpdateTaskStatusRequest: {
          type: 'object',
          required: ['isDone'],
          properties: {
            isDone: { type: 'boolean', example: true },
          },
        },
        UpdateUserRequest: {
          type: 'object',
          properties: {
            username: { type: 'string', minLength: 1, maxLength: 30 },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password', minLength: 8 },
            gender: { type: 'string', enum: ['boy', 'girl', 'null'] },
            dueDate: { type: 'string', format: 'date' },
          },
        },
        UpdateThemeRequest: {
          type: 'object',
          required: ['theme'],
          properties: {
            theme: { type: 'string', enum: ['boy', 'girl', 'neutral'] },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            status: { type: 'number', example: 400 },
            message: { type: 'string', example: 'Validation failed' },
            details: { type: 'object' },
          },
        },
      }
    },
  },
  apis: [
    path.join(__dirname, '../routes/*.js'),
    path.join(__dirname, '../models/*.js'),
    path.join(__dirname, '../validations/*.js'),
  ],
};

export default options;

export const swaggerSpec = swaggerJsdoc(options);
